import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { escapeHtml, markdown, validatePages, validSourcePath, pagePath, classifyChanges } from '../tools/lib.mjs';
import { freshness } from '../worker/index.mjs';

test('HTML and unsafe Markdown URLs are not executable', () => {
  assert.equal(escapeHtml('<script>"&'), '&lt;script&gt;&quot;&amp;');
  const rendered = markdown.render('[unsafe](javascript:alert(1))\n<script>alert(1)</script>');
  assert(!rendered.includes('<script>'));
  assert(!rendered.includes('href="javascript:'));
});

test('citations stay inside public app source paths', () => {
  assert(validSourcePath('Sources/CoreModels/AppLinks.swift'));
  assert(validSourcePath('README.md'));
  assert(validSourcePath('project.yml'));
  assert(validSourcePath('Config/Platforms.xcconfig'));
  assert(validSourcePath('NewApplication/Feature.swift'));
  for (const path of ['../secret', '/etc/passwd', 'Sources/../secret.md', 'Sources/.env', 'https://example.com/source', 'Sources/test.p8']) assert(!validSourcePath(path));
});

test('guide limits reject oversized, unreferenced and malformed content', () => {
  const root = mkdtempSync(resolve(tmpdir(), 'plozz-docs-test-'));
  mkdirSync(resolve(root, 'content'));
  const page = { slug: 'getting-started', title: 'Get started', section: 'Start here', file: 'getting-started.md', sources: ['README.md'], watch: ['Sources/FeatureAuth/'] };
  try {
    writeFileSync(resolve(root, 'content/getting-started.md'), '# Get started\n\nInstall Plozz.\n');
    assert.equal(validatePages([page], root).length, 1);
    assert.equal(pagePath(page.slug), '/');
    assert.throws(() => validatePages([{ ...page, sources: [] }], root));
    assert.throws(() => validatePages([{ ...page, file: '../escape.md' }], root));
    writeFileSync(resolve(root, 'content/getting-started.md'), '# Get started\n\n' + 'word '.repeat(351));
    assert.throws(() => validatePages([page], root), /350-word/);
    writeFileSync(resolve(root, 'content/getting-started.md'), '# Get started\n\n[missing](/missing/)\n');
    assert.throws(() => validatePages([page], root), /broken link/);
    writeFileSync(resolve(root, 'content/getting-started.md'), '# Get started\n\n![image][remote]\n\n[remote]: https://example.com/image.png\n');
    assert.throws(() => validatePages([page], root), /No raw HTML or images/);
    writeFileSync(resolve(root, 'content/getting-started.md'), '# Get started\n\n[anchor](#missing)\n');
    assert.throws(() => validatePages([page], root), /broken link/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('source impact is incremental and new/unassigned features cannot be silently skipped', () => {
  const pages = [
    { slug: 'servers', sources: ['README.md'], watch: ['Sources/FeatureAuth/'] },
    { slug: 'playback', sources: ['Sources/FeaturePlayback/README.md'], watch: ['Sources/FeaturePlayback/'] },
  ];
  const one = classifyChanges(pages, { status: 'ahead', files: [{ filename: 'Sources/FeatureAuth/Login.swift' }] });
  assert.equal(one.mode, 'content');
  assert.deepEqual(one.affected, ['servers']);
  const irrelevant = classifyChanges(pages, { status: 'ahead', files: [{ filename: 'Tests/Test.swift' }] });
  assert.equal(irrelevant.mode, 'metadata');
  const unknown = classifyChanges(pages, { status: 'ahead', files: [{ filename: 'Sources/NewFeature/View.swift' }] });
  assert.deepEqual(unknown.affected, ['servers', 'playback']);
  const newRoot = classifyChanges(pages, { status: 'ahead', files: [{ filename: 'NewApplication/Feature.swift' }] });
  assert.equal(newRoot.mode, 'content');
  assert.deepEqual(newRoot.affected, ['servers', 'playback']);
  const truncated = classifyChanges(pages, { status: 'ahead', files: Array.from({ length: 300 }, () => ({ filename: 'Tests/Test.swift' })) });
  assert.equal(truncated.mode, 'content');
  assert.deepEqual(truncated.affected, ['servers', 'playback']);
  const rewritten = classifyChanges(pages, { status: 'diverged', files: [] });
  assert.equal(rewritten.mode, 'content');
  assert.deepEqual(rewritten.affected, ['servers', 'playback']);
});

test('freshness distinguishes current, changed and unavailable app source', async () => {
  const source = { commit: 'a'.repeat(40), verifiedAt: '2026-10-18T00:00:00Z' };
  const current = await freshness(source, async () => Response.json({ sha: source.commit }));
  assert.equal((await current.json()).status, 'current');
  const changed = await freshness(source, async () => Response.json({ sha: 'b'.repeat(40) }));
  assert.equal((await changed.json()).status, 'behind');
  const unavailable = await freshness(source, async () => new Response('', { status: 403 }));
  assert.equal(unavailable.status, 503);
  assert.equal((await unavailable.json()).status, 'unknown');
  assert.equal(unavailable.headers.get('Cache-Control'), 'no-store');
});

test('reader status never presents invalid or mismatched metadata as current; desktop navigation reopens', async () => {
  const script = readFileSync(new URL('../public/docs.js', import.meta.url), 'utf8');
  for (const [value, expected] of [
    [{ status: 'current', documentedCommit: 'revision', contentHash: 'hash' }, 'Matches the latest'],
    [{ status: 'behind', documentedCommit: 'revision', contentHash: 'hash' }, 'App code has changed'],
    [{ status: 'current', documentedCommit: 'old', contentHash: 'hash' }, 'Freshness data is updating'],
    [{ status: 'current', documentedCommit: 'revision', contentHash: 'old' }, 'Freshness data is updating'],
    [{ status: 'invalid' }, 'Live freshness check unavailable'],
    [{ status: 'unknown' }, 'Live freshness check unavailable'],
  ]) {
    const status = { dataset: { sourceCommit: 'revision', contentHash: 'hash' } };
    const navigation = { open: true };
    let resize;
    const media = { matches: true, addEventListener: (_, callback) => { resize = callback; } };
    runInNewContext(script, {
      document: {
        querySelector: selector => selector === '.nav-shell' ? navigation : selector === '#freshness' ? status : null,
        querySelectorAll: () => [],
      },
      matchMedia: () => media,
      fetch: async () => Response.json(value),
    });
    await new Promise(resolve => setImmediate(resolve));
    assert(status.textContent.startsWith(expected), status.textContent);
    assert.equal(navigation.open, false);
    media.matches = false;
    resize();
    assert.equal(navigation.open, true);
  }
});
