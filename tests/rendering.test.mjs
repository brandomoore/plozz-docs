import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { runInNewContext } from 'node:vm';
import { pathToFileURL } from 'node:url';
import { ROOT, readJson, markdown, pagePath, escapeHtml, validateEditorialScope } from '../tools/lib.mjs';
import { diagramReferences, diagramFor } from '../tools/diagrams.mjs';
import { handleRequest } from '../worker/handler.mjs';

test('the shared design preserves every guide, anchor, article date and searchable section', async t => {
  const before = readFileSync(resolve(ROOT, 'source-state.json'), 'utf8');
  const result = spawnSync(process.execPath, ['tools/build.mjs'], { cwd: ROOT, encoding: 'utf8', timeout: 10_000 });
  assert.equal(result.status, 0, result.stderr);
  const pages = readJson('content/pages.json');
  const state = JSON.parse(before);
  const context = { document: { body: { dataset: { contentHash: state.contentHash } },
    querySelector: () => null, querySelectorAll: () => [], addEventListener() {} } };
  runInNewContext(readFileSync(resolve(ROOT, 'dist/docs.js'), 'utf8'), context);
  const asset = path => handleRequest(new Request(new URL(path, 'https://docs.plozz.app')),
    async pathname => new Response(readFileSync(resolve(ROOT, `dist${pathname}`))));
  t.mock.method(globalThis, 'fetch', asset);
  const engine = await context.loadIndex(async path => {
    assert.equal(path, `/pagefind/${state.contentHash}/pagefind.js`);
    assert.equal((await asset(path)).status, 200);
    return import(pathToFileURL(resolve(ROOT, `dist${path}`)));
  });
  t.after(() => engine.destroy());
  const entries = await Promise.all((await engine.search(null)).results.map(hit => hit.data()));
  const indexedUrls = new Set(entries.map(entry => entry.url));
  validateEditorialScope(JSON.stringify(entries), 'search index');
  for (const [query, expected, excerpt] of [
    ...['version', 'versions'].map(query => [query, '/playback/#choose-audio-or-a-version', /Settings > Playback > Version selection/i]),
    ...['server sort of the versions', 'Is there any way to preserve server sort of the versions ?', 'server version order']
      .map(query => [query, '/playback/#choose-audio-or-a-version', /Settings > Playback > Version selection.*Use first from server/i]),
    ['app version for a bug report', '/feedback-and-bugs/#report-a-bug', /Plozz version and build/i],
    ['conversion', '/streaming-quality/#buffering-or-unavailable-choices', /conversion/i],
  ]) {
    const hits = (await engine.search(context.searchTerms(query))).results;
    assert(hits.length, query);
    const match = context.sectionMatch(await hits[0].data());
    assert.equal(match.path, expected, query);
    assert.match(match.snippet, excerpt, query);
  }
  let sharedSocialImage;
  for (const path of ['404.html', ...pages.map(page => page.slug === 'getting-started' ? 'index.html' : `${page.slug}/index.html`)]) {
    const html = readFileSync(resolve(ROOT, 'dist', path), 'utf8');
    validateEditorialScope(html, path);
    assert.doesNotMatch(html, /\bredact(?:ed|ion)\b|patent|removed for legal reasons/i, path);
    const socialImage = html.match(/<meta property="og:image" content="([^"]+)">/)?.[1];
    assert.match(socialImage ?? '', /^https:\/\/plozz\.app\/og-image\.png\?v=[a-f0-9]{16}$/, `Unversioned social image in ${path}`);
    sharedSocialImage ??= socialImage;
    assert.equal(socialImage, sharedSocialImage, `Inconsistent social image in ${path}`);
    assert.equal(html.match(/<meta name="twitter:image" content="([^"]+)">/)?.[1], socialImage, `Twitter image mismatch in ${path}`);
  }
  for (const page of pages) {
    const html = readFileSync(resolve(ROOT, 'dist', page.slug === 'getting-started' ? '' : page.slug, 'index.html'), 'utf8');
    const tokens = markdown.parse(readFileSync(resolve(ROOT, 'content', page.file), 'utf8'), {});
    const sectionCount = tokens.filter(token => token.type === 'heading_open' && token.tag === 'h2').length;
    const guidePath = pagePath(page.slug);
    assert(indexedUrls.has(guidePath), `Unsearchable guide: ${page.slug}`);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, page.slug);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(ids.length, new Set(ids).size, `Duplicate ID in ${page.slug}`);
    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index];
      if (token.type === 'heading_open') {
        assert(ids.includes(token.attrGet('id')), `Lost heading in ${page.slug}`);
        if (token.tag === 'h2') assert(indexedUrls.has(`${guidePath}#${token.attrGet('id')}`), `Unsearchable section in ${page.slug}`);
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
    const resources = [...html.matchAll(/<div class="sidebar-resources">([\s\S]*?)<\/div>/g)];
    assert.equal(resources.length, 2, `Missing desktop/mobile resources in ${page.slug}`);
    for (const [, links] of resources) {
      assert.match(links, /href="https:\/\/plozz\.app\/discord"><span><svg class="brand-icon" data-brand="discord"/);
      assert.match(links, /href="https:\/\/github\.com\/brandomoore\/Plozz"><span><svg class="brand-icon" data-brand="github"/);
      assert.equal([...links.matchAll(/class="brand-icon"[^>]+aria-hidden="true" focusable="false"/g)].length, 2);
    }
    if (page.platforms) {
      const labels = html.match(/<ul class="platform-labels"[^>]+>([\s\S]*?)<\/ul>/)?.[1];
      assert(labels, `Missing platform scope in ${page.slug}`);
      for (const platform of page.platforms) assert(labels.includes(escapeHtml(platform)));
    } else assert.doesNotMatch(html, /class="platform-labels"/);
    for (const id of diagramReferences(tokens)) {
      assert(html.includes(`data-diagram="${id}"`), `Missing diagram in ${page.slug}`);
      assert(entries.some(entry => entry.url.split('#')[0] === guidePath && entry.content.includes(diagramFor(id).caption)), `Unsearchable diagram in ${page.slug}`);
    }
  }
  const feedback = readFileSync(resolve(ROOT, 'dist/feedback-and-bugs/index.html'), 'utf8');
  assert.match(feedback, /<ul class="service-options" role="list">/);
  const profiles = readFileSync(resolve(ROOT, 'dist/apple-tv-profiles/index.html'), 'utf8');
  assert.match(profiles, /class="doc-callout callout-important" role="note"/);
  assert.match(profiles, /class="procedure" role="list"/);
  assert.match(profiles, /class="settings-path">Settings &gt; Profiles/);
  const home = readFileSync(resolve(ROOT, 'dist/index.html'), 'utf8');
  assert.equal([...home.matchAll(/class="topic-card"/g)].length, 6);
  for (const page of pages.slice(1)) assert(home.includes(`href="${pagePath(page.slug)}"`));
  assert.equal(readFileSync(resolve(ROOT, 'source-state.json'), 'utf8'), before);
});
