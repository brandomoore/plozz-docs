import assert from 'node:assert/strict';
import { test } from 'node:test';
import { markdown } from '../tools/lib.mjs';
import { brandForLink, brandIcon } from '../tools/visuals.mjs';

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
