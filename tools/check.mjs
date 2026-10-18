import { readJson, validatePages, validateSeo, validateState, ROOT } from './lib.mjs';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';

const { values } = parseArgs({ options: { 'content-only': { type: 'boolean', default: false } } });
const pages = validatePages(readJson('content/pages.json'));
validateSeo(pages);
const state = values['content-only'] ? null : validateState(readJson('source-state.json'), pages);
for (const page of pages) {
  const words = readFileSync(resolve(ROOT, 'content', page.file), 'utf8').trim().split(/\s+/).length;
  console.log(`${page.slug}: ${words} words, ${page.sources.length} source references`);
}
console.log(state
  ? `Validated ${pages.length} guides reviewed against ${state.repository}@${state.commit}.`
  : `Validated ${pages.length} content drafts; source review/finalization is still required.`);
