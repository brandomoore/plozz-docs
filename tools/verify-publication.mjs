import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { ROOT, SITE, readJson, validatePages, validateState } from './lib.mjs';
import { PAGES_ORIGIN } from '../worker/index.mjs';

const state = validateState(readJson('source-state.json'), validatePages(readJson('content/pages.json')));
const docsCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim();
const origins = [PAGES_ORIGIN, SITE + '/'];
for (const origin of origins) {
  let verified = false;
  for (let attempt = 0; attempt < 36; attempt++) {
    try {
      const response = await fetch(new URL(`_source.json?v=${docsCommit}`, origin), { signal: AbortSignal.timeout(15_000) });
      if (response.ok) {
        const live = await response.json();
        if (live.commit === state.commit && live.contentHash === state.contentHash && live.verifiedAt === state.verifiedAt) { verified = true; break; }
      }
      console.warn(`Publication check ${attempt + 1} at ${origin}: HTTP ${response.status} or source mismatch.`);
    } catch (error) {
      console.warn(`Publication check ${attempt + 1} at ${origin}: ${error.name}: ${error.message}`);
    }
    await delay(5_000);
  }
  if (!verified) throw new Error(`Publication did not reach ${origin}; the next daily run can retry the deployment.`);
}
mkdirSync(resolve(ROOT, '.docs-work'), { recursive: true });
writeFileSync(resolve(ROOT, '.docs-work/deployment.json'), JSON.stringify({
  docsCommit, sourceCommit: state.commit, contentHash: state.contentHash, sourceVerifiedAt: state.verifiedAt,
  origins, verified: true, deployedAt: new Date().toISOString(),
}, null, 2));
console.log(`Verified the reviewed documentation at ${SITE} and its managed Pages origin.`);
