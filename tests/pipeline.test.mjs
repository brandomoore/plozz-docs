import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { ROOT, contentHash, coverageHash, baselineHash, pageMaterialHash, sha256 } from '../tools/lib.mjs';
import { discoverSurfaces } from '../tools/source-discovery.mjs';

const revision = 'a'.repeat(40);
const nextRevision = 'b'.repeat(40);
const docsRevision = 'd'.repeat(40);
const page = { slug: 'getting-started', title: 'Get started', seoTitle: 'Get started with Plozz', description: 'Connect your own media sources and start watching in Plozz.', section: 'Connect', kind: 'guide', file: 'getting-started.md', sources: ['README.md'], watch: ['Sources/FeatureAuth/'] };
const source = '# Plozz\n';
const blob = createHash('sha1').update(`blob ${Buffer.byteLength(source)}\0${source}`).digest('hex');
const categoryPath = 'Sources/CoreUI/ProfileSettingsCategory.swift';
const settingsPath = 'Sources/FeatureSettings/SettingsView.swift';
const sourceMap = { 'README.md': source, [categoryPath]: 'public enum ProfileSettingsCategory: String {\n case playback\n}\n', [settingsPath]: 'struct SettingsView {}\n' };
const sourceFiles = Object.fromEntries(Object.entries(sourceMap).sort(([a], [b]) => a.localeCompare(b)).map(([path, text]) =>
  [path, createHash('sha1').update(`blob ${Buffer.byteLength(text)}\0${text}`).digest('hex')]));
const discovery = { schemaVersion: 1, repository: 'brandomoore/Plozz', commit: revision, fileCount: 3, files: sourceFiles, snapshotHash: sha256(JSON.stringify(sourceFiles)), ...discoverSurfaces(Object.keys(sourceMap), sourceMap[categoryPath], null) };

function fixture(t) {
  mkdirSync(resolve(ROOT, '.docs-work'), { recursive: true });
  const root = mkdtempSync(resolve(ROOT, '.docs-work/pipeline-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const path of ['tools', 'content', 'public', 'bin', 'config', '.docs-work', 'node_modules/.bin']) mkdirSync(resolve(root, path), { recursive: true });
  for (const name of ['lib.mjs', 'visuals.mjs', 'source.mjs', 'source-discovery.mjs', 'apply-proposal.mjs', 'run-agent.mjs', 'publish.mjs', 'build.mjs', 'check.mjs']) copyFileSync(resolve(ROOT, 'tools', name), resolve(root, 'tools', name));
  for (const name of ['docs.css', 'docs.js', 'logo.svg', 'manrope.woff2', 'font-license.txt']) copyFileSync(resolve(ROOT, 'public', name), resolve(root, 'public', name));
  const save = (path, value) => writeFileSync(resolve(root, path), typeof value === 'string' ? value : JSON.stringify(value));
  save('package.json', { type: 'module' });
  save('AGENTS.md', 'Only change concise guides.');
  save('EDITORIAL.md', 'Write useful, source-verified guides without padding.');
  save('content/pages.json', [page]);
  save('content/getting-started.md', '# Get started\n\nInstall Plozz.\n');
  save('config/documentation-baseline.json', { schemaVersion: 1, fullAuditIntervalDays: 30, sections: ['Connect'], capabilities: [], areas: [{ id: 'setup', title: 'Get started' }] });
  save('content/coverage.json', { schemaVersion: 1,
    capabilities: {}, systemIntegrations: {},
    areas: { setup: { documents: [{ slug: page.slug }], sources: ['README.md'] } },
    modules: { FeatureSettings: { areas: ['setup'], sources: [settingsPath] } },
    settingsCategories: { playback: { areas: ['setup'], sources: [categoryPath] } },
  });
  save('.docs-work/discovery.json', discovery);
  save('fixture.json', {
    revision, docsRevision, source, blob, sourceMap, files: [], removed: false,
    liveCommit: revision, status: '', agentResponse: 'DOCS_REVIEW_APPROVED',
  });
  const update = value => save('fixture.json', { ...JSON.parse(readFileSync(resolve(root, 'fixture.json'))), ...value });
  const stub = `#!/usr/bin/env node
import fs from 'node:fs';
import {createHash} from 'node:crypto';
const f=JSON.parse(fs.readFileSync('fixture.json'));
const args=process.argv.slice(2);
const name=process.argv[1].split('/').at(-1);
fs.appendFileSync('calls.jsonl', JSON.stringify({name,args})+'\\n');
if(name==='gh') {
  const path=args[1];
  if(path.includes('/commits/')) console.log(JSON.stringify({sha:f.revision,commit:{tree:{sha:'c'.repeat(40)}}}));
  else if(path.includes('/compare/')) console.log(JSON.stringify({status:'ahead',files:f.files}));
  else if(path.includes('/git/trees/')) console.log(JSON.stringify({truncated:false,tree:Object.entries(f.sourceMap).filter(([p])=>!f.removed||p!=='README.md').map(([p,text])=>({path:p,mode:'100644',type:'blob',size:Buffer.byteLength(text),sha:createHash('sha1').update('blob '+Buffer.byteLength(text)+'\\0'+text).digest('hex')}))}));
  else throw Error('Unexpected gh command');
} else if(name==='git') {
  if(args[0]==='rev-parse') console.log(f.docsRevision);
  else if(args[0]==='status') process.stdout.write(f.status);
  else if(args[0]==='ls-files') process.stdout.write('AGENTS.md\\0package.json\\0');
  else if(!['fetch','add','-c'].includes(args[0])) throw Error('Unexpected git command');
} else if(name==='copilot') {
  if(process.env.GH_TOKEN||process.env.GITHUB_TOKEN||process.env.CLOUDFLARE_API_TOKEN) throw Error('Credential leaked to model process');
  if(f.mutateProtected) fs.writeFileSync('AGENTS.md','changed');
  console.log(f.agentResponse);
} else if(name==='wrangler') {
  if(args.includes('upload')) console.log('Worker Version ID: 11111111-1111-4111-8111-111111111111');
} else throw Error('Unexpected executable');
`;
  for (const name of ['gh', 'git', 'copilot']) writeFileSync(resolve(root, 'bin', name), stub, { mode: 0o755 });
  writeFileSync(resolve(root, 'node_modules/.bin/wrangler'), stub, { mode: 0o755 });
  save('preload.mjs', `import fs from 'node:fs';
import tar from 'tar-stream';import {gzipSync} from 'node:zlib';
globalThis.fetch=async input=>{
  const url=String(input), f=JSON.parse(fs.readFileSync('fixture.json'));
  if(url.startsWith('https://codeload.github.com/')) {
    const pack=tar.pack(), chunks=[];
    const done=new Promise((resolve,reject)=>{pack.on('data',c=>chunks.push(c));pack.on('end',resolve);pack.on('error',reject)});
    for(const [path,text] of Object.entries(f.sourceMap)) if(!f.removed||path!=='README.md') pack.entry({name:'Plozz-'+f.revision+'/'+path},f.corruptSource&&path==='README.md'?text.replace('Plozz','Wrong'):text);
    if(f.hostileArchive) pack.entry({name:'Plozz-'+f.revision+'/../../escape'},'must not be written');
    pack.finalize();await done;return new Response(gzipSync(Buffer.concat(chunks)));
  }
  if(url.startsWith('https://docs.plozz.app/_source.json')) return Response.json({commit:f.liveCommit,contentHash:f.liveHash,verifiedAt:f.liveVerifiedAt});
  throw Error('Unexpected network request: '+url);
};`);
  const run = (name, args = [], extra = {}) => spawnSync(process.execPath, ['--import', resolve(root, 'preload.mjs'), resolve(root, 'tools', name), ...args], {
    cwd: root, encoding: 'utf8', timeout: 10_000,
    env: { PATH: `${resolve(root, 'bin')}:${process.env.PATH}`, HOME: root, DOCS_MODEL: 'gpt-6.1-sol', ...extra },
  });
  const state = () => {
    const value = {
      schemaVersion: 2, repository: 'brandomoore/Plozz', ref: 'main', commit: revision,
      verifiedAt: new Date().toISOString(), contentHash: contentHash([page], root),
      baselineReviewedAt: new Date(Date.now() - 1000).toISOString(),
      coverageHash: coverageHash(root), policyHash: baselineHash(root), discovery,
      sourceFiles, review: { kind: 'independent-review', model: 'gpt-6.1-sol', reasoningEffort: 'high', coverageReviewed: true },
      pages: { [page.slug]: { contentHash: pageMaterialHash(page, root), updatedAt: new Date().toISOString() } },
    };
    save('source-state.json', value);
    update({ liveHash: value.contentHash, liveVerifiedAt: value.verifiedAt });
    return value;
  };
  const plan = () => save('.docs-work/plan.json', { repository: 'brandomoore/Plozz', commit: revision, mode: 'content', affected: ['getting-started'], changedFiles: [], baseDocsHead: docsRevision, sourceDirectory: '.docs-work/source', discoveryFile: '.docs-work/discovery.json', snapshotHash: discovery.snapshotHash, policyHash: baselineHash(root) });
  const read = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
  const review = (extra = {}) => save('.docs-work/review.json', { approved: true, independent: true, coverageReviewed: true, sourceCommit: read('.docs-work/plan.json').commit,
    contentHash: contentHash([page], root), coverageHash: coverageHash(root), policyHash: baselineHash(root),
    snapshotHash: read('.docs-work/discovery.json').snapshotHash, model: 'gpt-6.1-sol', reasoningEffort: 'high', ...extra });
  return { root, save, update, run, state, plan, read, review };
}

test('planner no-op, deployment recovery, metadata, changed source and removed citations', t => {
  const f = fixture(t);
  const state = f.state();
  let result = f.run('source.mjs', ['plan']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/plan.json').mode, 'none');
  f.update({ liveVerifiedAt: '2026-10-17T00:00:00Z' });
  result = f.run('source.mjs', ['plan']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/plan.json').mode, 'deploy');
  f.update({ liveVerifiedAt: state.verifiedAt });
  f.update({ liveCommit: nextRevision });
  result = f.run('source.mjs', ['plan']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/plan.json').mode, 'deploy');
  f.update({ revision: nextRevision, files: [{ filename: 'Tests/Test.swift' }] });
  result = f.run('source.mjs', ['plan']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/plan.json').mode, 'metadata');
  f.update({ files: [{ filename: 'README.md' }] });
  result = f.run('source.mjs', ['plan']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/plan.json').mode, 'content');
  f.update({ removed: true });
  result = f.run('source.mjs', ['plan']);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(f.read('.docs-work/plan.json').missingSources, ['README.md']);
  assert(!existsSync(resolve(f.root, '.docs-work/source/README.md')));
});

test('proposal application preserves deletion and rejects infrastructure files', t => {
  const f = fixture(t);
  mkdirSync(resolve(f.root, 'proposal'));
  f.save('proposal/pages.json', [page]);
  f.save('proposal/coverage.json', f.read('content/coverage.json'));
  f.save('proposal/getting-started.md', '# Get started\n\nNew instructions.\n');
  f.save('content/obsolete.md', '# Obsolete\n');
  let result = f.run('apply-proposal.mjs', ['proposal']);
  assert.equal(result.status, 0, result.stderr);
  assert(!existsSync(resolve(f.root, 'content/obsolete.md')));
  f.save('proposal/publish.mjs', 'throw Error("must not run");');
  result = f.run('apply-proposal.mjs', ['proposal']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unexpected proposal file/);
});

test('draft checks reject invalid coverage before independent review can approve it', t => {
  const f = fixture(t);
  let result = f.run('check.mjs', ['--content-only']);
  assert.equal(result.status, 0, result.stderr);
  const coverage = f.read('content/coverage.json');
  const invalid = structuredClone(coverage);
  invalid.areas.setup.sources = Array(21).fill('README.md');
  f.save('content/coverage.json', invalid);
  result = f.run('check.mjs', ['--content-only']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Coverage decisions need existing immutable source evidence/);
  invalid.areas.setup.sources = ['Sources/MissingImplementation.swift'];
  f.save('content/coverage.json', invalid);
  result = f.run('check.mjs', ['--content-only']);
  assert.notEqual(result.status, 0);
  f.save('content/coverage.json', coverage);
  rmSync(resolve(f.root, '.docs-work/discovery.json'));
  result = f.run('check.mjs', ['--content-only']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Run source:plan before validating draft source coverage/);
});

test('unchanged source receives an independent full coverage audit at 30 days', t => {
  const f = fixture(t);
  const state = f.state();
  const age = days => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const recent = { ...state, baselineReviewedAt: age(29), verifiedAt: age(29) };
  f.save('source-state.json', recent);
  f.update({ liveVerifiedAt: recent.verifiedAt });
  let result = f.run('source.mjs', ['plan']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/plan.json').mode, 'none');
  const due = { ...state, baselineReviewedAt: age(30), verifiedAt: age(30) };
  f.save('source-state.json', due);
  f.update({ liveVerifiedAt: due.verifiedAt });
  result = f.run('source.mjs', ['plan']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/plan.json').mode, 'content');
  assert.equal(f.read('.docs-work/plan.json').baselineRequired, true);
  result = f.run('source.mjs', ['finalize']);
  assert.notEqual(result.status, 0, 'A quiet month cannot waive independent coverage review.');
  const auditPlan = f.read('.docs-work/plan.json');
  f.save('.docs-work/plan.json', { ...auditPlan, mode: 'metadata' });
  result = f.run('source.mjs', ['finalize']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /full coverage audit requires independent content review/);
  f.save('.docs-work/plan.json', auditPlan);
  f.review();
  result = f.run('source.mjs', ['finalize']);
  assert.equal(result.status, 0, result.stderr);
  const refreshed = f.read('source-state.json');
  assert.equal(refreshed.contentHash, state.contentHash);
  assert.equal(refreshed.review.kind, 'independent-review');
  assert.equal(refreshed.pages[page.slug].updatedAt, state.pages[page.slug].updatedAt);
  assert(Date.parse(refreshed.verifiedAt) > Date.now() - 60_000);
  assert.equal(refreshed.baselineReviewedAt, refreshed.verifiedAt);
  f.save('source-state.json', { ...refreshed, baselineReviewedAt: age(31) });
  result = f.run('source.mjs', ['plan']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/plan.json').baselineRequired, true, 'Recent incremental verification must not postpone the full audit.');
});

test('topic coverage cannot substitute for an explicit capability answer', t => {
  const f = fixture(t);
  f.state();
  const policy = f.read('config/documentation-baseline.json');
  f.save('config/documentation-baseline.json', { ...policy, capabilities: [
    { id: 'system-user-sign-in', question: 'How does system-user sign-in work?', sources: ['README.md'] },
  ] });
  let result = f.run('source.mjs', ['plan']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/plan.json').baselineRequired, true);
  f.review();
  result = f.run('source.mjs', ['finalize']);
  assert.notEqual(result.status, 0, 'Mapped modules and a Profiles topic alone must not pass.');
  const coverage = f.read('content/coverage.json');
  const record = {
    documents: [{ slug: page.slug }], sources: ['README.md'],
    answer: 'Each system user must choose a profile and enable trusted startup separately.',
  };
  f.save('content/coverage.json', { ...coverage, capabilities: { 'system-user-sign-in': record } });
  f.review();
  result = f.run('source.mjs', ['finalize']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /specific answer section/);
  f.save('content/getting-started.md', '# Get started\n\n## System users\n\nChoose a profile and enable sign-in for this system user.\n');
  record.documents[0].anchor = 'system-users';
  f.save('content/coverage.json', { ...coverage, capabilities: { 'system-user-sign-in': {
    ...record, sources: ['Sources/CoreUI/ProfileSettingsCategory.swift'],
  } } });
  f.review();
  result = f.run('source.mjs', ['finalize']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing capability implementation evidence/);
  f.save('content/coverage.json', { ...coverage, capabilities: { 'system-user-sign-in': record } });
  f.review();
  result = f.run('source.mjs', ['finalize']);
  assert.equal(result.status, 0, result.stderr);
});

test('new system integrations require classification and immutable evidence', t => {
  const f = fixture(t);
  f.state();
  const path = 'App/Resources/Plozz.entitlements';
  f.update({ revision: nextRevision, files: [{ filename: path }], sourceMap: {
    ...sourceMap, [path]: '<plist><dict><key>com.apple.developer.user-management</key></dict></plist>',
  } });
  let result = f.run('source.mjs', ['plan']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/plan.json').baselineRequired, true);
  assert(existsSync(resolve(f.root, '.docs-work/source', path)));
  f.review();
  result = f.run('source.mjs', ['finalize']);
  assert.notEqual(result.status, 0);
  const coverage = f.read('content/coverage.json');
  f.save('content/coverage.json', { ...coverage, systemIntegrations: { [path]: {
    areas: ['setup'], sources: [path],
  } } });
  f.review();
  result = f.run('source.mjs', ['finalize']);
  assert.equal(result.status, 0, result.stderr);
  assert(f.read('source-state.json').sourceFiles[path]);
  assert.deepEqual(f.read('source-state.json').discovery.systemSurfaces, [path]);
});

test('complete discovery includes uncited code and rejects changed archive bytes', t => {
  const f = fixture(t);
  f.state();
  f.update({ hostileArchive: true });
  let result = f.run('source.mjs', ['plan', '--force']);
  assert.equal(result.status, 0, result.stderr);
  assert(existsSync(resolve(f.root, '.docs-work/source', settingsPath)));
  assert(!existsSync(resolve(f.root, 'escape')));
  assert.equal(f.read('.docs-work/discovery.json').fileCount, 3);
  f.update({ corruptSource: true });
  result = f.run('source.mjs', ['plan', '--force']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /fingerprint mismatch/);
});

test('existing gaps and newly discovered product modules require coverage review', t => {
  const f = fixture(t);
  f.state();
  const original = f.read('content/coverage.json');
  f.save('content/coverage.json', { ...original, areas: {} });
  let result = f.run('source.mjs', ['plan']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/plan.json').mode, 'content');
  assert.equal(f.read('.docs-work/plan.json').baselineRequired, true);
  f.save('content/coverage.json', original);
  f.update({ revision: nextRevision, files: [{ filename: 'Sources/FeatureNew/NewView.swift' }], sourceMap: { ...sourceMap, 'Sources/FeatureNew/NewView.swift': 'struct NewView {}\n' } });
  result = f.run('source.mjs', ['plan']);
  assert.equal(result.status, 0, result.stderr);
  assert(f.read('.docs-work/discovery.json').modules.includes('FeatureNew'));
  f.review();
  result = f.run('source.mjs', ['finalize']);
  assert.notEqual(result.status, 0, 'An approval marker cannot waive an unclassified product module.');
});

test('built search metadata and sitemap dates describe article changes, not source rechecks', t => {
  const f = fixture(t);
  const state = f.state();
  state.verifiedAt = '2026-11-20T00:00:00Z';
  state.pages[page.slug].updatedAt = '2026-10-01T00:00:00Z';
  f.save('source-state.json', state);
  const result = f.run('build.mjs');
  assert.equal(result.status, 0, result.stderr);
  const html = readFileSync(resolve(f.root, 'dist/index.html'), 'utf8');
  assert(html.includes(`<title>${page.seoTitle}</title>`));
  assert(html.includes(`name="description" content="${page.description}"`));
  assert(html.includes('property="og:title"'));
  assert(html.includes('application/ld+json'));
  assert(html.includes('data-slug="getting-started"'));
  assert(html.includes(`/docs.css?v=${sha256(readFileSync(resolve(f.root, 'public/docs.css')))}`));
  assert(html.includes(`/docs.js?v=${sha256(readFileSync(resolve(f.root, 'public/docs.js')))}`));
  assert(html.includes(`<body data-content-hash="${state.contentHash}">`));
  const footer = html.slice(html.indexOf('<footer>'));
  assert(footer.includes('Last updated <time datetime="2026-10-01T00:00:00Z">October 1, 2026</time>.'));
  assert(!html.slice(0, html.indexOf('<footer>')).includes('Last updated'));
  assert(!html.includes('source-status') && !html.includes('id="freshness"'));
  assert(!html.includes('app source') && !html.includes('installed beta'));
  assert(!readFileSync(resolve(f.root, 'dist/404.html'), 'utf8').includes('Last updated'));
  assert.equal(f.read('dist/_source.json').verifiedAt, state.verifiedAt);
  assert.equal(f.read('dist/_source.json').commit, state.commit);
  const sitemap = readFileSync(resolve(f.root, 'dist/sitemap.xml'), 'utf8');
  assert(sitemap.includes('<lastmod>2026-10-01</lastmod>'));
  assert(!sitemap.includes('2026-11-20'));
  const search = f.read('dist/search-index.json');
  assert.equal(search.entries[0].path, '/');
  assert(search.entries[0].text.includes('Install Plozz'));
  assert.equal(search.contentHash, state.contentHash);
});

test('finalization requires a real matching review receipt or unchanged-content proof', t => {
  const f = fixture(t);
  const state = f.state();
  let result = f.run('source.mjs', ['plan', '--force']);
  assert.equal(result.status, 0, result.stderr);
  result = f.run('source.mjs', ['finalize']);
  assert.notEqual(result.status, 0);
  f.review({ sourceCommit: nextRevision });
  result = f.run('source.mjs', ['finalize']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /matching independent Sol/);
  f.review();
  f.save('content/getting-started.md', '# Get started\n\nAn unreviewed change.\n');
  result = f.run('source.mjs', ['finalize']);
  assert.notEqual(result.status, 0);
  f.save('content/getting-started.md', '# Get started\n\nInstall Plozz.\n');
  result = f.run('source.mjs', ['finalize']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('source-state.json').review.kind, 'independent-review');
  f.update({ revision: nextRevision, files: [{ filename: 'Tests/Test.swift' }] });
  result = f.run('source.mjs', ['plan']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/plan.json').mode, 'metadata');
  const auditTime = f.read('source-state.json').baselineReviewedAt;
  result = f.run('source.mjs', ['finalize']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('source-state.json').baselineReviewedAt, auditTime);
  result = f.run('source.mjs', ['plan', '--force']);
  assert.equal(result.status, 0, result.stderr);
  const metadataPlan = f.read('.docs-work/plan.json');
  f.save('.docs-work/plan.json', { ...metadataPlan, mode: 'metadata', baselineRequired: false });
  f.save('content/getting-started.md', '# Get started\n\nA changed draft.\n');
  result = f.run('source.mjs', ['finalize']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Metadata-only update cannot change guides/);
});

test('model jobs require credentials, explicit Sol, standalone approval and unchanged infrastructure', t => {
  const f = fixture(t);
  f.plan();
  let result = f.run('run-agent.mjs', ['review']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /COPILOT_GITHUB_TOKEN/);
  result = f.run('run-agent.mjs', ['review'], { DOCS_MODEL: 'auto', COPILOT_GITHUB_TOKEN: 'fixture' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /explicit available GPT Sol/);
  f.update({ agentResponse: '## Visual quality\nApproved marks.\nNOTDOCS_REVIEW_APPROVED' });
  result = f.run('run-agent.mjs', ['review'], { COPILOT_GITHUB_TOKEN: 'fixture' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /did not approve publication/);
  assert(!existsSync(resolve(f.root, '.docs-work/review.json')));
  for (const agentResponse of ['DOCS_REVIEW_APPROVED', '## Visual quality\n\nDOCS_REVIEW_APPROVED']) {
    f.update({ agentResponse });
    result = f.run('run-agent.mjs', ['review'], { COPILOT_GITHUB_TOKEN: 'fixture' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /required Visual quality assessment/);
    assert(!existsSync(resolve(f.root, '.docs-work/review.json')));
  }
  f.update({ agentResponse: '## Visual quality\n\nApproved marks; no <img> needed.\nDOCS_REVIEW_APPROVED' });
  const summaryPath = resolve(f.root, '.docs-work/summary.md');
  result = f.run('run-agent.mjs', ['review'], { COPILOT_GITHUB_TOKEN: 'fixture', GH_TOKEN: 'fixture', CLOUDFLARE_API_TOKEN: 'fixture', GITHUB_STEP_SUMMARY: summaryPath });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/review.json').model, 'gpt-6.1-sol');
  const calls = readFileSync(resolve(f.root, 'calls.jsonl'), 'utf8').trim().split('\n').map(JSON.parse);
  const modelCall = calls.find(call => call.name === 'copilot');
  assert(modelCall.args.includes('--no-auto-update'));
  assert.equal(modelCall.args[modelCall.args.indexOf('--excluded-tools') + 1], 'task');
  assert.equal(modelCall.args[modelCall.args.indexOf('--reasoning-effort') + 1], 'high');
  assert.match(modelCall.args[modelCall.args.indexOf('--prompt') + 1], /Visual quality checklist/);
  assert.match(readFileSync(summaryPath, 'utf8'), /Approved marks; no &lt;img&gt; needed/);
  assert.doesNotMatch(readFileSync(summaryPath, 'utf8'), /<img>/);
  f.update({ agentResponse: '## Visual quality\nApproved service options; no further imagery needed.' });
  result = f.run('run-agent.mjs', ['write'], { COPILOT_GITHUB_TOKEN: 'fixture' });
  assert.equal(result.status, 0, result.stderr);
  assert.match(readFileSync(resolve(f.root, '.docs-work/write-response.txt'), 'utf8'), /Approved service options/);
  f.update({ mutateProtected: true });
  result = f.run('run-agent.mjs', ['review'], { COPILOT_GITHUB_TOKEN: 'fixture' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /modified protected infrastructure/);
  assert.match(readFileSync(resolve(f.root, '.docs-work/review-response.txt'), 'utf8'), /Visual quality/);
});

test('publisher preserves porcelain paths and main races without Cloudflare credentials', t => {
  const f = fixture(t);
  f.state();
  f.plan();
  let result = f.run('publish.mjs');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /publication token/);
  f.update({ status: ' M content/getting-started.md\n' });
  const env = { GH_TOKEN: 'fixture' };
  result = f.run('publish.mjs', [], env);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/publication.json').phase, 'committed');
  assert.equal(f.read('.docs-work/publication.json').deployed, false);
  const calls = readFileSync(resolve(f.root, 'calls.jsonl'), 'utf8').trim().split('\n').map(JSON.parse);
  assert(!calls.some(call => call.name === 'wrangler'));
  f.update({ docsRevision: nextRevision });
  result = f.run('publish.mjs', [], env);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Docs main moved/);
  f.update({ status: ' M tools/publish.mjs\n' });
  result = f.run('publish.mjs', [], env);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /non-documentation changes/);
});
