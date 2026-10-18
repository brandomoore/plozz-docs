import { execFileSync } from 'node:child_process';
import { writeFileSync, appendFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT, readJson, validatePages, validateState, isContentPath } from './lib.mjs';

const plan = readJson('.docs-work/plan.json');
const pages = validatePages(readJson('content/pages.json'));
const state = validateState(readJson('source-state.json'), pages);
if (!/^[0-9a-f]{40}$/.test(plan.baseDocsHead ?? '')) throw new Error('Missing immutable docs base revision.');
if (!process.env.GH_TOKEN) throw new Error('Missing docs-repository publication token.');
const run = (command, args) => execFileSync(command, args, { cwd: ROOT, encoding: 'utf8', timeout: 120_000 }).trim();
const changed = execFileSync('git', ['status', '--porcelain', '--untracked-files=all'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean).map(line => line.slice(3));
if (changed.some(path => !isContentPath(path) && path !== 'source-state.json')) throw new Error('Publication contains non-documentation changes.');
run('git', ['fetch', 'origin', 'main']);
if (run('git', ['rev-parse', 'origin/main']) !== plan.baseDocsHead) throw new Error('Docs main moved; retry against the new base instead of overwriting it.');
if (changed.length) {
  run('git', ['add', '--', 'content', 'source-state.json']);
  run('git', ['-c', 'user.name=github-actions[bot]', '-c', 'user.email=41898282+github-actions[bot]@users.noreply.github.com', 'commit',
    '-m', `Refresh docs for Plozz ${state.commit.slice(0, 7)}`,
    '-m', 'Source-verified documentation update with independent review when content changes.\n\nCo-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>']);
  run('git', ['-c', 'credential.helper=', '-c', 'credential.helper=!gh auth git-credential', 'push', 'origin', 'HEAD:main']);
}
const docsCommit = run('git', ['rev-parse', 'HEAD']);
run('git', ['fetch', 'origin', 'main']);
if (run('git', ['rev-parse', 'origin/main']) !== docsCommit) throw new Error('Docs main moved after publication; deploy its newer revision instead.');
writeFileSync(resolve(ROOT, '.docs-work/publication.json'), JSON.stringify({
  sourceCommit: state.commit, contentHash: state.contentHash, verifiedAt: state.verifiedAt,
  docsCommit, phase: 'committed', deployed: false,
}, null, 2));
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `docs_commit=${docsCommit}\n`);
console.log(`Committed reviewed docs at ${docsCommit}; the separate Pages job must deploy and verify them.`);
