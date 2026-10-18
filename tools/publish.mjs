import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { setTimeout as delay } from 'node:timers/promises';
import { ROOT, SITE, readJson, validatePages, validateState } from './lib.mjs';

const plan = readJson('.docs-work/plan.json');
const pages = validatePages(readJson('content/pages.json'));
const state = validateState(readJson('source-state.json'), pages);
if (!/^[0-9a-f]{40}$/.test(plan.baseDocsHead ?? '')) throw new Error('Missing immutable docs base revision.');
if (!process.env.CLOUDFLARE_API_TOKEN) throw new Error('Configure the CLOUDFLARE_API_TOKEN repository secret for the docs Worker.');
if (!process.env.GH_TOKEN) throw new Error('Missing docs-repository publication token.');
const run = (command, args) => execFileSync(command, args, { cwd: ROOT, encoding: 'utf8', timeout: 120_000, maxBuffer: 4 * 1024 * 1024 }).trim();
const changed = execFileSync('git', ['status', '--porcelain', '--untracked-files=all'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean).map(line => line.slice(3));
if (changed.some(path => !/^(content\/(?:[a-z0-9-]+\.md|pages\.json)|source-state\.json)$/.test(path))) throw new Error('Publication contains non-documentation changes.');
const base = 'https://api.cloudflare.com/client/v4/accounts/471672cb7947a45f5e43023a1f02d2f5/workers/scripts/plozz-docs';
async function cloud(path) {
  const response = await fetch(base + path, { headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}` }, signal: AbortSignal.timeout(30_000) });
  const body = await response.json();
  if (!body.success) throw new Error(`Docs Worker read failed (HTTP ${response.status}).`);
  return body.result;
}
function checkBase() {
  run('git', ['fetch', 'origin', 'main']);
  if (run('git', ['rev-parse', 'origin/main']) !== plan.baseDocsHead) throw new Error('Docs main moved; retry against the new base instead of overwriting it.');
}
checkBase();
const current = (await cloud('/deployments')).deployments[0];
if (current.versions.length !== 1 || current.versions[0].percentage !== 100) throw new Error('Unexpected docs rollout in progress.');
const previousVersion = current.versions[0].version_id;
const previous = await cloud(`/versions/${previousVersion}`);
const output = run(resolve(ROOT, 'node_modules/.bin/wrangler'), ['versions', 'upload', '--config', 'wrangler.toml', '--keep-vars', '--message', `Docs for Plozz ${state.commit}`]);
const version = output.match(/Worker Version ID:\s*([0-9a-f-]{36})/)?.[1];
if (!version) throw new Error('Could not identify staged docs version.');
const staged = await cloud(`/versions/${version}`);
const bindings = data => data.resources.bindings.toSorted((a, b) => a.name.localeCompare(b.name));
if (!isDeepStrictEqual(bindings(previous), bindings(staged))) throw new Error('Unexpected Worker binding change; staged version not activated.');
if ((await cloud('/deployments')).deployments[0].id !== current.id) throw new Error('Concurrent docs deployment; staged version not activated.');
checkBase();
const record = (phase, verified = false) => writeFileSync(resolve(ROOT, '.docs-work/publication.json'), JSON.stringify({
  version, previousVersion, sourceCommit: state.commit, docsCommit: run('git', ['rev-parse', 'HEAD']), phase, verified,
}, null, 2));
record('staged');
if (changed.length) {
  run('git', ['add', '--', 'content', 'source-state.json']);
  run('git', ['-c', 'user.name=github-actions[bot]', '-c', 'user.email=41898282+github-actions[bot]@users.noreply.github.com', 'commit',
    '-m', `Refresh docs for Plozz ${state.commit.slice(0, 7)}`,
    '-m', 'Source-verified documentation update with independent review when content changes.\n\nCo-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>']);
  run('git', ['-c', 'credential.helper=', '-c', 'credential.helper=!gh auth git-credential', 'push', 'origin', 'HEAD:main']);
}
record('committed');
run('git', ['fetch', 'origin', 'main']);
if (run('git', ['rev-parse', 'origin/main']) !== run('git', ['rev-parse', 'HEAD'])) throw new Error('Docs main changed before activation; retry from its latest revision.');
if ((await cloud('/deployments')).deployments[0].id !== current.id) throw new Error('Concurrent docs deployment before activation.');
run(resolve(ROOT, 'node_modules/.bin/wrangler'), ['versions', 'deploy', '--config', 'wrangler.toml', `${version}@100`, '--yes', '--message', `Publish docs for ${state.commit.slice(0, 7)}`]);
record('activated');
let verified = false;
for (let attempt = 0; attempt < 6; attempt++) {
  try {
    const response = await fetch(`${SITE}/_source.json?v=${version}`, { signal: AbortSignal.timeout(20_000) });
    if (response.ok) {
      const live = await response.json();
      if (live.commit === state.commit && live.contentHash === state.contentHash) { verified = true; break; }
    }
    console.warn(`Docs verification attempt ${attempt + 1}: HTTP ${response.status} or source mismatch.`);
  } catch (error) {
    console.warn(`Docs verification attempt ${attempt + 1} failed: ${error.name}: ${error.message}`);
  }
  await delay(5_000);
}
record('activated', verified);
if (!verified) throw new Error('Docs version activated, but public content verification failed; next daily run can retry publication.');
console.log(`Published ${SITE}; Worker ${version}; rollback ${previousVersion}.`);
