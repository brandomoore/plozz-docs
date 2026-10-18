import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { ROOT, contentHash } from '../tools/lib.mjs';

const revision = 'a'.repeat(40);
const nextRevision = 'b'.repeat(40);
const docsRevision = 'd'.repeat(40);
const page = { slug: 'getting-started', title: 'Get started', section: 'Start here', file: 'getting-started.md', sources: ['README.md'], watch: ['Sources/FeatureAuth/'] };
const source = '# Plozz\n';
const blob = createHash('sha1').update(`blob ${Buffer.byteLength(source)}\0${source}`).digest('hex');

function fixture(t) {
  mkdirSync(resolve(ROOT, '.docs-work'), { recursive: true });
  const root = mkdtempSync(resolve(ROOT, '.docs-work/pipeline-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const path of ['tools', 'content', 'bin', '.docs-work', 'node_modules/.bin']) mkdirSync(resolve(root, path), { recursive: true });
  for (const name of ['lib.mjs', 'source.mjs', 'apply-proposal.mjs', 'run-agent.mjs', 'publish.mjs']) copyFileSync(resolve(ROOT, 'tools', name), resolve(root, 'tools', name));
  const save = (path, value) => writeFileSync(resolve(root, path), typeof value === 'string' ? value : JSON.stringify(value));
  save('package.json', { type: 'module' });
  save('AGENTS.md', 'Only change concise guides.');
  save('content/pages.json', [page]);
  save('content/getting-started.md', '# Get started\n\nInstall Plozz.\n');
  save('fixture.json', {
    revision, docsRevision, source, blob, files: [], removed: false,
    liveCommit: revision, status: '', agentResponse: 'DOCS_REVIEW_APPROVED',
  });
  const update = value => save('fixture.json', { ...JSON.parse(readFileSync(resolve(root, 'fixture.json'))), ...value });
  const stub = `#!/usr/bin/env node
import fs from 'node:fs';
const f=JSON.parse(fs.readFileSync('fixture.json'));
const args=process.argv.slice(2);
const name=process.argv[1].split('/').at(-1);
fs.appendFileSync('calls.jsonl', JSON.stringify({name,args})+'\\n');
if(name==='gh') {
  const path=args[1];
  if(path.includes('/commits/')) console.log(JSON.stringify({sha:f.revision,commit:{tree:{sha:'c'.repeat(40)}}}));
  else if(path.includes('/compare/')) console.log(JSON.stringify({status:'ahead',files:f.files}));
  else if(path.includes('/git/trees/')) console.log(JSON.stringify({truncated:false,tree:f.removed?[]:[{path:'README.md',sha:f.blob,type:'blob'}]}));
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
globalThis.fetch=async input=>{
  const url=String(input), f=JSON.parse(fs.readFileSync('fixture.json'));
  if(url.startsWith('https://raw.githubusercontent.com/')) return new Response(f.source);
  if(url.startsWith('https://docs.plozz.app/_source.json')) return Response.json({commit:f.liveCommit,contentHash:f.liveHash});
  if(url.includes('api.cloudflare.com')) {
    if(url.endsWith('/deployments')) return Response.json({success:true,result:{deployments:[{id:'deployment',versions:[{version_id:'old-version',percentage:100}]}]}});
    if(url.includes('/versions/')) return Response.json({success:true,result:{resources:{bindings:[]}}});
  }
  throw Error('Unexpected network request: '+url);
};`);
  const run = (name, args = [], extra = {}) => spawnSync(process.execPath, ['--import', resolve(root, 'preload.mjs'), resolve(root, 'tools', name), ...args], {
    cwd: root, encoding: 'utf8', timeout: 10_000,
    env: { PATH: `${resolve(root, 'bin')}:${process.env.PATH}`, HOME: root, DOCS_MODEL: 'gpt-6.1-sol', ...extra },
  });
  const state = () => {
    const value = {
      schemaVersion: 1, repository: 'brandomoore/Plozz', ref: 'main', commit: revision,
      verifiedAt: '2026-10-18T00:00:00Z', contentHash: contentHash([page], root),
      sourceFiles: { 'README.md': blob }, review: { kind: 'independent-review', model: 'gpt-6.1-sol', reasoningEffort: 'high' },
    };
    save('source-state.json', value);
    update({ liveHash: value.contentHash });
    return value;
  };
  const plan = () => save('.docs-work/plan.json', { repository: 'brandomoore/Plozz', commit: revision, mode: 'content', affected: ['getting-started'], changedFiles: [], baseDocsHead: docsRevision });
  const read = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
  return { root, save, update, run, state, plan, read };
}

test('planner no-op, deployment recovery, metadata, changed source and removed citations', t => {
  const f = fixture(t);
  f.state();
  let result = f.run('source.mjs', ['plan']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/plan.json').mode, 'none');
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

test('finalization requires a real matching review receipt or unchanged-content proof', t => {
  const f = fixture(t);
  const state = f.state();
  let result = f.run('source.mjs', ['plan', '--force']);
  assert.equal(result.status, 0, result.stderr);
  result = f.run('source.mjs', ['finalize']);
  assert.notEqual(result.status, 0);
  f.save('.docs-work/review.json', { approved: true, independent: true, sourceCommit: nextRevision, contentHash: state.contentHash, model: 'gpt-6.1-sol', reasoningEffort: 'high' });
  result = f.run('source.mjs', ['finalize']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /matching independent Sol/);
  f.save('.docs-work/review.json', { approved: true, independent: true, sourceCommit: revision, contentHash: state.contentHash, model: 'gpt-6.1-sol', reasoningEffort: 'high' });
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
  f.update({ agentResponse: 'NOTDOCS_REVIEW_APPROVED' });
  result = f.run('run-agent.mjs', ['review'], { COPILOT_GITHUB_TOKEN: 'fixture' });
  assert.notEqual(result.status, 0);
  assert(!existsSync(resolve(f.root, '.docs-work/review.json')));
  f.update({ agentResponse: 'Checked all guides.\nDOCS_REVIEW_APPROVED' });
  result = f.run('run-agent.mjs', ['review'], { COPILOT_GITHUB_TOKEN: 'fixture', GH_TOKEN: 'fixture', CLOUDFLARE_API_TOKEN: 'fixture' });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/review.json').model, 'gpt-6.1-sol');
  const calls = readFileSync(resolve(f.root, 'calls.jsonl'), 'utf8').trim().split('\n').map(JSON.parse);
  const modelCall = calls.find(call => call.name === 'copilot');
  assert(modelCall.args.includes('--no-auto-update'));
  assert.equal(modelCall.args[modelCall.args.indexOf('--reasoning-effort') + 1], 'high');
  f.update({ mutateProtected: true });
  result = f.run('run-agent.mjs', ['review'], { COPILOT_GITHUB_TOKEN: 'fixture' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /modified protected infrastructure/);
});

test('publisher preserves porcelain paths, refuses main races and requires cloud authentication', t => {
  const f = fixture(t);
  f.state();
  f.plan();
  let result = f.run('publish.mjs');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /CLOUDFLARE_API_TOKEN/);
  f.update({ status: ' M content/getting-started.md\n' });
  const env = { CLOUDFLARE_API_TOKEN: 'fixture', GH_TOKEN: 'fixture' };
  result = f.run('publish.mjs', [], env);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.read('.docs-work/publication.json').verified, true);
  f.update({ docsRevision: nextRevision });
  result = f.run('publish.mjs', [], env);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Docs main moved/);
  f.update({ status: ' M tools/publish.mjs\n' });
  result = f.run('publish.mjs', [], env);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /non-documentation changes/);
});
