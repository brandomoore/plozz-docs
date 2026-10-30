import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import {
  ROOT, APP_REPO, SITE, readJson, validatePages, validateSeo, validateCoverage, validateState,
  validSourcePath, contentHash, coverageHash, baselineHash, pageMaterialHash, sha256, classifyChanges, readCoverage, readBaseline,
} from './lib.mjs';
import { downloadSnapshot } from './source-discovery.mjs';

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
  if (values.commit && !/^[0-9a-f]{40}$/.test(values.commit)) throw new Error('Source commit must be an immutable SHA.');
  const commit = api(`repos/${APP_REPO}/commits/${values.commit ?? 'main'}`);
  if (!/^[0-9a-f]{40}$/.test(commit.sha)) throw new Error('Invalid app commit response.');
  const force = values.force || process.env.DOCS_FORCE_REVIEW === 'true';
  const contentDrift = previous && previous.contentHash !== contentHash(pages);
  const baselineDrift = !previous?.discovery || previous.policyHash !== baselineHash() || !readCoverage();
  const checkedAt = previous ? Date.parse(previous.verifiedAt) : null;
  if (previous && !Number.isFinite(checkedAt)) throw new Error('Invalid source verification time.');
  const auditDays = readBaseline().fullAuditIntervalDays;
  if (!Number.isInteger(auditDays) || auditDays < 1 || auditDays > 90) throw new Error('Invalid full coverage audit interval.');
  const reviewedAt = previous?.baselineReviewedAt ? Date.parse(previous.baselineReviewedAt) : null;
  if (reviewedAt !== null && !Number.isFinite(reviewedAt)) throw new Error('Invalid full coverage review time.');
  const baselineDue = reviewedAt === null || Date.now() - reviewedAt >= auditDays * 24 * 60 * 60 * 1000;
  let mode = previous?.commit === commit.sha && !force && !contentDrift && !baselineDrift && !baselineDue ? 'none' : 'content';
  let changedFiles = [], affected = pages.map(page => page.slug);
  if (previous && !contentDrift && !baselineDrift && reviewedAt !== null) validateState(previous, pages);
  if (previous && mode !== 'none' && !force && !contentDrift && !baselineDrift && !baselineDue) {
    ({ mode, affected, changedFiles } = classifyChanges(pages, api(`repos/${APP_REPO}/compare/${previous.commit}...${commit.sha}`)));
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
    schemaVersion: 2, repository: APP_REPO, ref: 'main', commit: commit.sha,
    plannedAt: new Date().toISOString(), mode, affected, changedFiles, missingSources: [],
    baselineRequired: baselineDrift || baselineDue || force, policyHash: baselineHash(),
    baseDocsHead: docsHead, baseStateHash: stateHash(), baseContentHash: contentHash(pages),
    sourceDirectory: '.docs-work/source', discoveryFile: '.docs-work/discovery.json', labelsFile: '.docs-work/source-labels.json',
  };
  if (mode === 'content' || mode === 'metadata') {
    const tree = api(`repos/${APP_REPO}/git/trees/${commit.commit.tree.sha}?recursive=1`);
    if (tree.truncated) throw new Error('App source tree was truncated; cannot verify complete discovery.');
    const files = Object.fromEntries(tree.tree.filter(item => item.type === 'blob').map(item => [item.path, item.sha]));
    save(resolve(work, 'tree.json'), files);
    const discovery = await downloadSnapshot(commit.sha, tree.tree, pages, work);
    plan.snapshotHash = discovery.snapshotHash;
    plan.structureHash = discovery.structureHash;
    plan.inputFileCount = discovery.fileCount;
    plan.missingSources = [...new Set(pages.flatMap(page => page.sources))].filter(path => !files[path]);
    if (plan.missingSources.length || previous?.discovery?.structureHash !== discovery.structureHash
      || (plan.mode === 'metadata' && previous?.discovery?.snapshotHash !== discovery.snapshotHash)) {
      plan.mode = 'content'; plan.baselineRequired = true; plan.affected = pages.map(page => page.slug);
    }
    try { validateSeo(pages); validateCoverage(pages, discovery); }
    catch (error) {
      plan.mode = 'content'; plan.baselineRequired = true; plan.affected = pages.map(page => page.slug); plan.coverageIssue = error.message;
      console.warn(`Coverage requires a full editorial pass: ${error.message}`);
    }
  }
  save(resolve(work, 'plan.json'), plan);
  console.log(JSON.stringify({ mode: plan.mode, commit: plan.commit, affected: plan.affected, baselineRequired: plan.baselineRequired, inputFileCount: plan.inputFileCount, missingSources: plan.missingSources }, null, 2));
} else if (positionals[0] === 'finalize') {
  const plan = readJson('.docs-work/plan.json');
  if (!['content', 'metadata'].includes(plan.mode)) throw new Error('Nothing to finalize.');
  if (stateHash() !== plan.baseStateHash) throw new Error('Docs state changed while reviewing.');
  if (plan.policyHash !== baselineHash()) throw new Error('Editorial baseline changed while reviewing.');
  const previous = existsSync(stateFile) ? readJson('source-state.json') : null;
  const pages = validatePages(readJson('content/pages.json'));
  validateSeo(pages);
  const discovery = readJson('.docs-work/discovery.json');
  if (discovery.commit !== plan.commit || discovery.snapshotHash !== plan.snapshotHash) throw new Error('Source snapshot changed while reviewing.');
  const coverage = validateCoverage(pages, discovery);
  let review;
  if (plan.mode === 'metadata') {
    if (plan.baselineRequired) throw new Error('A full coverage audit requires independent content review.');
    if (contentHash(pages) !== plan.baseContentHash) throw new Error('Metadata-only update cannot change guides.');
    if (previous?.discovery?.snapshotHash !== discovery.snapshotHash) throw new Error('Metadata-only updates require identical product inputs.');
    review = { kind: 'unchanged-sources', coverageReviewed: true };
  } else {
    const report = readJson('.docs-work/review.json');
    if (report.approved !== true || report.independent !== true || report.coverageReviewed !== true
      || report.sourceCommit !== plan.commit || report.snapshotHash !== plan.snapshotHash
      || report.policyHash !== baselineHash() || report.coverageHash !== coverageHash()
      || report.contentHash !== contentHash(pages) || report.model !== 'gpt-6-astra'
      || report.reasoningEffort !== 'high' || report.uiReviewed !== true
      || report.readerExperienceReviewed !== true) throw new Error('Missing matching independent Astra/high UI, readability and coverage review.');
    review = { kind: 'independent-review', model: report.model, reasoningEffort: report.reasoningEffort, coverageReviewed: true,
      uiReviewed: true, readerExperienceReviewed: true };
  }
  const references = new Set([
    ...pages.flatMap(page => page.sources),
    ...[...Object.values(coverage.areas), ...Object.values(coverage.modules), ...Object.values(coverage.settingsCategories),
      ...Object.values(coverage.capabilities), ...Object.values(coverage.systemIntegrations),
      ...Object.values(coverage.screens ?? {})].flatMap(record => record.sources),
  ]);
  const sourceFiles = {};
  for (const path of references) {
    if (!validSourcePath(path) || !/^[0-9a-f]{40}$/.test(discovery.files[path] ?? '')) throw new Error(`Invalid citation in reviewed output: ${path}`);
    sourceFiles[path] = discovery.files[path];
  }
  const now = new Date().toISOString();
  const pageHistory = Object.fromEntries(pages.map(page => {
    const hash = pageMaterialHash(page);
    const old = previous?.pages?.[page.slug];
    return [page.slug, { contentHash: hash, updatedAt: old?.contentHash === hash ? old.updatedAt : now }];
  }));
  save(stateFile, {
    schemaVersion: 2, repository: APP_REPO, ref: 'main', commit: plan.commit, verifiedAt: now,
    baselineReviewedAt: plan.baselineRequired ? now : previous?.baselineReviewedAt,
    contentHash: contentHash(pages), coverageHash: coverageHash(), policyHash: baselineHash(),
    sourceFiles, review, pages: pageHistory,
    discovery: { snapshotHash: discovery.snapshotHash, structureHash: discovery.structureHash, fileCount: discovery.fileCount,
      modules: discovery.modules, settingsCategories: discovery.settingsCategories, systemSurfaces: discovery.systemSurfaces,
      screenSurfaces: discovery.screenSurfaces,
      uiLabels: Object.fromEntries([...references].filter(path => discovery.uiLabels?.[path])
        .map(path => [path, discovery.uiLabels[path]])) },
  });
  console.log(`Recorded content and coverage review against live app revision ${plan.commit}.`);
} else throw new Error('Usage: node tools/source.mjs plan [--commit SHA] [--force] | finalize');
