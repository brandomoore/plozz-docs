import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { markdown, plainText, guideWordCount, validatePages, pageMaterialHash, contentHash } from '../tools/lib.mjs';
import { brandForLink, brandIcon, uiIcon } from '../tools/visuals.mjs';
import { diagrams, diagramText } from '../tools/diagrams.mjs';

test('brand marks identify actual destinations, not words in unrelated URLs', () => {
  for (const url of ['https://github.com/brandomoore/Plozz', 'https://github.com/brandomoore/Plozz/issues?q=bug']) assert.equal(brandForLink(url), 'github');
  for (const url of ['https://plozz.app/discord', 'https://plozz.app/discord/']) assert.equal(brandForLink(url), 'discord');
  for (const url of [
    '/github', 'mailto:github@example.com', 'http://github.com/brandomoore/Plozz',
    'https://github.com.example.com/', 'https://github.com@evil.example/',
    'https://user@github.com/', 'https://github.com:444/', 'https://example.com/github.com',
    'https://plozz.app/discord/other', 'https://plozz.app/discord?redirect=elsewhere',
  ]) assert.equal(brandForLink(url), null, url);
  assert.throws(() => brandIcon('unknown'), /Unknown brand icon/);
});

test('shared Markdown marks preserve link names, destinations, escaping and safe markup', () => {
  const rendered = markdown.render('[GitHub issues](https://github.com/brandomoore/Plozz/issues?q=bug&state=open) and [Discord](https://plozz.app/discord).');
  assert.match(rendered, /href="https:\/\/github\.com\/brandomoore\/Plozz\/issues\?q=bug&amp;state=open"/);
  assert.match(rendered, /data-brand="github"[^>]+aria-hidden="true" focusable="false"/);
  assert.match(rendered, /<\/svg>GitHub issues<\/a>/);
  assert.match(rendered, /<\/svg>Discord<\/a>/);
  assert.doesNotMatch(rendered, /<title>|tabindex=|<img/);
  assert.doesNotMatch(markdown.render('[Unrelated](https://example.com/github)'), /brand-icon/);
  assert.doesNotMatch(markdown.render('[Search existing issues](https://github.com/brandomoore/Plozz/issues)'), /brand-icon/);
  assert.doesNotMatch(markdown.render('[Discord](https://github.com/brandomoore/Plozz)'), /brand-icon/);
  assert.doesNotMatch(markdown.render('[unsafe](javascript:alert(1))\n<svg onload="alert(1)">'), /<svg|href="javascript:/);
});

test('distinct leading service options gain a shared layout without rewriting prose', () => {
  const source = '- **[Discord](https://plozz.app/discord):** Ask a question.\n- **[GitHub](https://github.com/brandomoore/Plozz/issues):** Report a bug.\n';
  for (const content of [source, source.replace('\n-', '\n\n-')]) {
    const rendered = markdown.render(content);
    assert.match(rendered, /<ul class="service-options" role="list">/);
    assert.match(rendered, /Ask a question\./);
    assert.match(rendered, /Report a bug\./);
    assert.equal([...rendered.matchAll(/<li>/g)].length, 2);
  }
  for (const content of [
    '- **[GitHub](https://github.com/a):** One.\n- **[GitHub](https://github.com/b):** Two.',
    '- **[Discord](https://plozz.app/discord):** Help.\n- **[Website](https://example.com):** More.',
    '- Use [Discord](https://plozz.app/discord).\n- Use [GitHub](https://github.com).',
    '1. **[Discord](https://plozz.app/discord):** Ask.\n2. **[GitHub](https://github.com):** Report.',
    '- **[Discord](https://plozz.app/discord):** Ask.\n  - Nested step.\n- **[GitHub](https://github.com):** Report.',
  ]) assert.doesNotMatch(markdown.render(content), /service-options/);
});

test('procedures preserve native ordering, nested lists and paragraph content', () => {
  const rendered = markdown.render('7. **Choose a source.** Start here.\n   - Plex\n   - Jellyfin\n8. **Connect.** Keep going.\n\n   A second paragraph.\n');
  assert.match(rendered, /<ol start="7" class="procedure" role="list">/);
  assert.match(rendered, /class="step-number" aria-hidden="true">7<\/span>/);
  assert.match(rendered, /class="step-number" aria-hidden="true">8<\/span>/);
  assert.equal([...rendered.matchAll(/class="step-number"/g)].length, 2);
  assert.match(rendered, /<ul>\n<li>Plex<\/li>\n<li>Jellyfin<\/li>/);
  assert.match(rendered, /<p>A second paragraph\.<\/p>/);
  assert.doesNotMatch(markdown.render('- First\n- Second\n\n> 1. Quoted item.'), /procedure|step-number/);
});

test('callouts retain readable content, links, nesting and ordinary quotations', () => {
  for (const kind of ['NOTE', 'TIP', 'IMPORTANT', 'WARNING']) {
    const source = `> [!${kind}]\n> Keep **this choice** and [its link](https://example.com).\n>\n> Another paragraph.\n>\n> - One\n> - Two`;
    const tokens = markdown.parse(source, {});
    const rendered = markdown.renderer.render(tokens, markdown.options, {});
    assert.match(rendered, new RegExp(`<aside class="doc-callout callout-${kind.toLowerCase()}" role="note">`));
    assert.match(rendered, /<strong>this choice<\/strong>/);
    assert.match(rendered, /href="https:\/\/example.com"/);
    assert.match(rendered, /<p>Another paragraph\.<\/p>/);
    assert.match(rendered, /<ul>\n<li>One<\/li>\n<li>Two<\/li>/);
    assert.match(rendered, /<\/aside>/);
    assert.doesNotMatch(rendered, /\[!|role="alert"|aria-live/);
    assert(plainText(tokens).includes('Keep this choice and its link.'));
    assert(!plainText(tokens).includes(`[!${kind}]`));
  }
  assert.match(markdown.render('> [!TIP]\n>\n> Keep the paragraph after a blank line.'), /<p>Keep the paragraph after a blank line\.<\/p>/);
  assert.match(markdown.render('> [!note]  \n> Read this.'), /class="doc-callout callout-note"/);
  assert.match(markdown.render('> A real quotation.'), /<blockquote>\n<p>A real quotation\.<\/p>\n<\/blockquote>/);
  assert.throws(() => markdown.render('> [!WARNING]\n> '), /Empty guide callout/);
  assert.throws(() => markdown.render('> [!CAUTION]\n> Unknown component.'), /Unknown guide callout/);
});

test('only complete bold Settings paths gain the path treatment', () => {
  assert.match(markdown.render('Open **Settings > Screens & Navigation > Navigation**.'), /<strong class="settings-path">Settings &gt; Screens &amp; Navigation &gt; Navigation<\/strong>/);
  for (const source of ['**Settings**', '**Other > Settings**', '**Settings > [link](https://example.com)**', '**Settingsish > Test**']) {
    assert.doesNotMatch(markdown.render(source), /settings-path/);
  }
});

test('approved diagrams use accessible local markup and participate in search and word budgets', () => {
  for (const id of Object.keys(diagrams)) {
    const source = `\`\`\`plozz-diagram\n${id}\n\`\`\``;
    const tokens = markdown.parse(source, {});
    const rendered = markdown.render(source);
    assert.match(rendered, new RegExp(`<figure class="guide-diagram" data-diagram="${id}">`));
    assert.match(rendered, /<figcaption>[^<]+<\/figcaption>/);
    assert.match(rendered, /aria-hidden="true" focusable="false"/);
    assert.doesNotMatch(rendered, /<img|<script|<iframe|https?:|tabindex=|<h[1-6]|id="/);
    assert.equal(plainText(tokens), diagramText(id));
    assert(guideWordCount(source) > 30);
  }
  for (const id of ['not-approved', '../elsewhere', '<script>', 'apple-tv-profiles\nextra']) {
    assert.throws(() => markdown.render(`\`\`\`plozz-diagram\n${id}\n\`\`\``), /Unknown approved Plozz diagram/);
  }
  assert.match(markdown.render('```text\n<script>\n```'), /<pre><code class="language-text">&lt;script&gt;/);
  assert.throws(() => uiIcon('not-approved'), /Unknown UI icon/);
});

test('platforms and diagram citations are validated and diagram facts affect only their readers', t => {
  const root = mkdtempSync(resolve(tmpdir(), 'plozz-components-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(resolve(root, 'content'));
  const home = { slug: 'getting-started', title: 'Get started', section: 'Connect', file: 'getting-started.md', sources: ['README.md'], watch: [] };
  const page = { ...home, slug: 'example-guide', title: 'Example guide', file: 'example-guide.md' };
  const save = (file, content) => writeFileSync(resolve(root, 'content', file), content);
  const source = '# Example guide\n\n```plozz-diagram\ncombined-libraries\n```\n';
  save(home.file, '# Get started\n\nInstall Plozz.\n');
  save(page.file, source);
  save('pages.json', JSON.stringify([home, page]));
  assert.throws(() => validatePages([home, page], root), /Missing diagram source references/);
  page.sources = [...diagrams['combined-libraries'].sources];
  assert.equal(validatePages([home, page], root).length, 2);
  for (const platforms of [[], ['Android'], ['Apple TV', 'Apple TV'], 'Apple TV']) {
    assert.throws(() => validatePages([home, { ...page, platforms }], root), /Invalid guide platforms/);
  }
  assert.equal(validatePages([home, { ...page, platforms: ['Apple TV'] }], root).length, 2);
  const original = pageMaterialHash(page, root);
  assert.notEqual(pageMaterialHash({ ...page, platforms: ['Apple TV'] }, root), original);
  const homeHash = pageMaterialHash(home, root);
  const reviewed = contentHash([home, page], root);
  const caption = diagrams['combined-libraries'].caption;
  try {
    diagrams['combined-libraries'].caption = 'A changed source-backed explanation.';
    assert.notEqual(pageMaterialHash(page, root), original);
    assert.notEqual(contentHash([home, page], root), reviewed);
    assert.equal(pageMaterialHash(home, root), homeHash);
  } finally {
    diagrams['combined-libraries'].caption = caption;
  }
  save(page.file, source + '\n' + 'word '.repeat(420));
  assert.throws(() => validatePages([home, page], root), /450-word limit/);
});
