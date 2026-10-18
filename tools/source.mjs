import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { parseArgs } from 'node:util';
import { ROOT, APP_REPO, SITE, readJson, validatePages, validSourcePath, contentHash, sha256, classifyChanges } from './lib.mjs';

const { positionals, values } = parseArgs({ allowPositionals: true, options: { commit: { type: 'string' }, force: { type: 'boolean', default: false } } });
const work = resolve(ROOT, '.docs-work');
const stateFile = resolve(ROOT, 'source-state.json');
const api = path => JSON.parse(execFileSync('gh', ['api', path], { cwd: ROOT, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }));
const save = (path, data) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, JSON.stringify(data, null, 2) + '\n'); };
const stateHash = () => existsSync(stateFile) ? sha256(readFileSync(stateFile)) : null;

if (positionals[0] === 'plan') {
  mkdirSync(work, { recursive: true });
  const pages = validatePages(readJson('content/pages.json'));
  const previous = existsSync(stateFile) ? readJson('source-state.json') : null;
  const ref = values.commit ?? 'main';
  if (values.commit && !/^[0-9a-f]{40}$/.test(values.commit)) throw new Error('Source commit must be an immutable SHA.');
  const commit = api(`repos/${APP_REPO}/commits/${ref}`);
  if (!/^[0-9a-f]{40}$/.test(commit.sha)) throw new Error('Invalid app commit response.');
  const force = values.force || process.env.DOCS_FORCE_REVIEW === 'true';
  const contentDrift = previous && previous.contentHash !== contentHash(pages);
  const checkedAt = previous ? Date.parse(previous.verifiedAt) : null;
  if (previous && !Number.isFinite(checkedAt)) throw new Error('Invalid source verification time.');
  const recheckDue = previous && Date.now() - checkedAt >= 30 * 24 * 60 * 60 * 1000;
  let mode = previous?.commit === commit.sha && !force && !contentDrift && !recheckDue ? 'none' : 'content';
  let changedFiles = [];
  let affected = pages.map(page => page.slug);
  if (previous && mode !== 'none' && !force && !contentDrift) {
    const comparison = api(`repos/${APP_REPO}/compare/${previous.commit}...${commit.sha}`);
    ({ mode, affected, changedFiles } = classifyChanges(pages, comparison));
  }
  if (mode === 'none') {
    const response = await fetch(`${SITE}/_source.json`, { headers: { 'Cache-Control': 'no-cache' }, signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`Cannot verify deployed docs (HTTP ${response.status}).`);
    const deployed = await response.json();
    if (deployed.commit !== previous.commit || deployed.contentHash !== previous.contentHash || deployed.verifiedAt !== previous.verifiedAt) mode = 'deploy';
  }
  let docsHead = null;
  try { docsHead = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch (error) { if (existsSync(stateFile)) throw error; }
  const plan = {
    schemaVersion: 1, repository: APP_REPO, ref: 'main', commit: commit.sha,
    plannedAt: new Date().toISOString(), mode, affected, changedFiles,
    missingSources: [],
    baseDocsHead: docsHead, baseStateHash: stateHash(), baseContentHash: contentHash(pages),
  };
  if (mode === 'content' || mode === 'metadata') {
    const tree = api(`repos/${APP_REPO}/git/trees/${commit.commit.tree.sha}?recursive=1`);
    if (tree.truncated) throw new Error('App source tree was truncated; cannot validate citations.');
    const files = Object.fromEntries(tree.tree.filter(item => item.type === 'blob').map(item => [item.path, item.sha]));
    save(resolve(work, 'tree.json'), files);
    rmSync(resolve(work, 'source'), { recursive: true, force: true });
    for (const path of new Set(pages.flatMap(page => page.sources))) {
      if (!validSourcePath(path)) throw new Error(`Invalid source reference: ${path}`);
      if (!files[path]) {
        plan.missingSources.push(path);
        plan.mode = 'content';
        plan.affected = [...new Set([...plan.affected, ...pages.filter(page => page.sources.includes(path)).map(page => page.slug)])];
        console.warn(`Removed cited source requires review and replacement: ${path}`);
        continue;
      }
      const response = await fetch(`https://raw.githubusercontent.com/${APP_REPO}/${commit.sha}/${path.split('/').map(encodeURIComponent).join('/')}`, { signal: AbortSignal.timeout(30_000) });
      if (!response.ok) throw new Error(`Source download failed (${response.status}): ${path}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length > 1_000_000) throw new Error(`Source file too large for bounded review: ${path}`);
      const gitHash = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
      if (gitHash !== files[path]) throw new Error(`Source fingerprint mismatch: ${path}`);
      const destination = resolve(work, 'source', path);
      mkdirSync(dirname(destination), { recursive: true });
      writeFileSync(destination, bytes);
    }
  }
  save(resolve(work, 'plan.json'), plan);
  console.log(JSON.stringify({ mode: plan.mode, commit: plan.commit, affected: plan.affected, changedFiles, missingSources: plan.missingSources }, null, 2));
} else if (positionals[0] === 'finalize') {
  const plan = readJson('.docs-work/plan.json');
  if (!['content', 'metadata'].includes(plan.mode)) throw new Error('Nothing to finalize.');
  if (stateHash() !== plan.baseStateHash) throw new Error('Docs state changed while reviewing.');
  const pages = validatePages(readJson('content/pages.json'));
  const tree = readJson('.docs-work/tree.json');
  let review;
  if (plan.mode === 'metadata') {
    if (contentHash(pages) !== plan.baseContentHash) throw new Error('Metadata-only update cannot change guides.');
    review = { kind: 'unchanged-sources' };
  } else {
    const report = readJson('.docs-work/review.json');
    if (report.approved !== true || report.independent !== true || report.sourceCommit !== plan.commit
      || report.contentHash !== contentHash(pages) || !/^gpt-\d+(?:\.\d+)?-sol$/.test(report.model)
      || report.reasoningEffort !== 'high') throw new Error('Missing matching independent Sol/high review.');
    review = { kind: 'independent-review', model: report.model, reasoningEffort: report.reasoningEffort };
  }
  const sourceFiles = {};
  for (const path of new Set(pages.flatMap(page => page.sources))) {
    if (!validSourcePath(path) || !/^[0-9a-f]{40}$/.test(tree[path] ?? '')) throw new Error(`Invalid citation in reviewed output: ${path}`);
    sourceFiles[path] = tree[path];
  }
  save(stateFile, {
    schemaVersion: 1, repository: APP_REPO, ref: 'main', commit: plan.commit,
    verifiedAt: new Date().toISOString(), contentHash: contentHash(pages), sourceFiles, review,
  });
  console.log(`Recorded reviewed app revision ${plan.commit}.`);
} else {
  throw new Error('Usage: node tools/source.mjs plan [--commit SHA] [--force] | finalize');
}
