import { readJson, validatePages, validateSeo, validateCoverage, validateState, guideWordCount, ROOT } from './lib.mjs';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';

const { values } = parseArgs({ options: { 'content-only': { type: 'boolean', default: false } } });
const pages = validatePages(readJson('content/pages.json'));
validateSeo(pages);
if (values['content-only']) {
  if (!existsSync(resolve(ROOT, '.docs-work/discovery.json'))) throw new Error('Run source:plan before validating draft source coverage.');
  validateCoverage(pages, readJson('.docs-work/discovery.json'));
}
const state = values['content-only'] ? null : validateState(readJson('source-state.json'), pages);
for (const page of pages) {
  const words = guideWordCount(readFileSync(resolve(ROOT, 'content', page.file), 'utf8'));
  console.log(`${page.slug}: ${words} words, ${page.sources.length} source references`);
}
console.log(state
  ? `Validated ${pages.length} guides reviewed against ${state.repository}@${state.commit}.`
  : `Validated ${pages.length} content drafts and source coverage; independent review/finalization is still required.`);
