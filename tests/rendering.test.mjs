import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { ROOT, readJson, markdown, pagePath, escapeHtml } from '../tools/lib.mjs';

test('the shared design preserves every guide, anchor, article date and source record', () => {
  const before = readFileSync(resolve(ROOT, 'source-state.json'), 'utf8');
  const result = spawnSync(process.execPath, ['tools/build.mjs'], { cwd: ROOT, encoding: 'utf8', timeout: 10_000 });
  assert.equal(result.status, 0, result.stderr);
  const pages = readJson('content/pages.json');
  const state = JSON.parse(before);
  for (const page of pages) {
    const html = readFileSync(resolve(ROOT, 'dist', page.slug === 'getting-started' ? '' : page.slug, 'index.html'), 'utf8');
    const tokens = markdown.parse(readFileSync(resolve(ROOT, 'content', page.file), 'utf8'), {});
    const sectionCount = tokens.filter(token => token.type === 'heading_open' && token.tag === 'h2').length;
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, page.slug);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(ids.length, new Set(ids).size, `Duplicate ID in ${page.slug}`);
    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index];
      if (token.type === 'heading_open') {
        assert(ids.includes(token.attrGet('id')), `Lost heading in ${page.slug}`);
        if (token.tag === 'h2' && sectionCount > 1 && page.slug !== 'getting-started') assert(html.includes(`href="#${token.attrGet('id')}" data-toc-link`), `Missing TOC link in ${page.slug}`);
      }
      if (token.type === 'paragraph_open') {
        const end = tokens.findIndex((candidate, position) => position > index && candidate.type === 'paragraph_close' && candidate.level === token.level);
        const paragraph = markdown.renderer.render(tokens.slice(index, end + 1), markdown.options, {}).trim();
        assert(html.includes(paragraph), `Lost paragraph in ${page.slug}`);
      }
    }
    assert(html.includes(`<title>${escapeHtml(page.seoTitle)}</title>`));
    assert(html.includes(`<link rel="canonical" href="https://docs.plozz.app${pagePath(page.slug)}">`));
    assert(html.includes(`datetime="${state.pages[page.slug].updatedAt}"`));
    assert(html.indexOf('Last updated') > html.indexOf('<footer>'));
    assert.doesNotMatch(html, /id="freshness"|class="source-status"/);
    assert.match(html, /id="docs-search-dialog"[^>]+aria-label="Search documentation"/);
    assert.match(html, /id="docs-navigation-dialog"[^>]+aria-label="Browse guides"/);
  }
  const home = readFileSync(resolve(ROOT, 'dist/index.html'), 'utf8');
  assert.equal([...home.matchAll(/class="topic-card"/g)].length, 6);
  for (const page of pages.slice(1)) assert(home.includes(`href="${pagePath(page.slug)}"`));
  assert.equal(readFileSync(resolve(ROOT, 'source-state.json'), 'utf8'), before);
});
