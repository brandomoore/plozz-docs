import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { runInNewContext, createContext, runInContext } from 'node:vm';
import { escapeHtml, markdown, validatePages, validSourcePath, pagePath, pageAnchors, classifyChanges } from '../tools/lib.mjs';
import { discoverSurfaces } from '../tools/source-discovery.mjs';
import { freshness, publishedAsset, handleRequest, PAGES_ORIGIN } from '../worker/handler.mjs';

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
  assert(validSourcePath('Sources/AppShell/AppState+CloudSync.swift'));
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
    writeFileSync(resolve(root, 'content/getting-started.md'), '# Get started\n\n' + 'word '.repeat(451));
    assert.throws(() => validatePages([page], root), /450-word/);
    writeFileSync(resolve(root, 'content/getting-started.md'), '# Get started\n\n[missing](/missing/)\n');
    assert.throws(() => validatePages([page], root), /broken link/);
    writeFileSync(resolve(root, 'content/getting-started.md'), '# Get started\n\n![image][remote]\n\n[remote]: https://example.com/image.png\n');
    assert.throws(() => validatePages([page], root), /No raw HTML or images/);
    writeFileSync(resolve(root, 'content/getting-started.md'), '# Get started\n\n[anchor](#missing)\n');
    assert.throws(() => validatePages([page], root), /broken link/);
    writeFileSync(resolve(root, 'content/getting-started.md'), '# Get started\n\n## Connect\n\n[Details](#connect)\n\n## Connect\n\nMore.\n\n## Search results\n\nUseful matches.\n');
    assert.equal(validatePages([page], root).length, 1);
    assert.deepEqual(pageAnchors(page, root), ['get-started', 'connect', 'connect-2', 'search-results-2']);
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

test('mobile navigation closes when returning to desktop without source polling', () => {
  const script = readFileSync(new URL('../public/docs.js', import.meta.url), 'utf8');
  const navigation = { open: true, showModal() {}, close() { this.open = false; }, querySelector: () => ({ addEventListener() {} }), addEventListener() {} };
  const requests = [];
  let resize;
  const media = { matches: true, addEventListener: (_, callback) => { resize = callback; } };
  runInNewContext(script, {
    document: {
      body: { dataset: { contentHash: 'hash' } },
      querySelector: selector => selector === '#docs-navigation-dialog' ? navigation : null,
      querySelectorAll: () => [],
      addEventListener() {},
    },
    matchMedia: () => media,
    fetch: async url => { requests.push(url); return Response.json({}); },
  });
  assert.deepEqual(requests, []);
  assert.equal(navigation.open, true);
  media.matches = false;
  resize();
  assert.equal(navigation.open, false);
});

test('search keeps its version check without the removed freshness element', async () => {
  const script = readFileSync(new URL('../public/docs.js', import.meta.url), 'utf8');
  const requests = [];
  let hash = 'old';
  const context = createContext({
    document: {
      body: { dataset: { contentHash: 'hash' } },
      querySelector: selector => selector === '.nav-shell' ? {} : null,
      querySelectorAll: () => [],
      addEventListener() {},
    },
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    fetch: async url => { requests.push(url); return Response.json({ contentHash: hash, entries: [] }); },
  });
  runInContext(script, context);
  await assert.rejects(() => context.loadIndex(), /another documentation revision/);
  hash = 'hash';
  assert.equal((await context.loadIndex()).length, 0);
  await context.loadIndex();
  assert.deepEqual(requests, ['/search-index.json?v=hash', '/search-index.json?v=hash']);
});

test('published assets stay in the managed origin and never inherit caller credentials', async () => {
  await publishedAsset('/servers/', { version: 'a'.repeat(40) }, async (url, options) => {
    assert.equal(url.href, `${PAGES_ORIGIN}servers/?v=${'a'.repeat(40)}`);
    assert.equal(options.method, 'GET');
    assert.equal(options.redirect, 'manual');
    assert.equal(options.headers, undefined);
    return new Response('guide');
  });
  await assert.rejects(() => publishedAsset('/../outside/'), /Invalid docs asset path/);
  const response = await handleRequest(new Request('https://docs.plozz.app/servers', {
    headers: { Authorization: 'caller-credential', Cookie: 'private-cookie' },
  }), async (path, options) => {
    assert.equal(path, '/servers');
    assert.equal(options.headers, undefined);
    return new Response(null, { status: 301, headers: { Location: `${PAGES_ORIGIN}servers/` } });
  });
  assert.equal(response.status, 301);
  assert.equal(response.headers.get('Location'), 'https://docs.plozz.app/servers/');
  assert.equal(response.headers.get('X-Plozz-Docs-Origin'), 'github-pages');
  assert.match(response.headers.get('Content-Security-Policy'), /connect-src 'self'/);
});

test('front door preserves HEAD, 404, read-only methods and unavailable-source status', async () => {
  const head = await handleRequest(new Request('https://docs.plozz.app/', { method: 'HEAD' }), async () => new Response(null));
  assert.equal(await head.text(), '');
  const missing = await handleRequest(new Request('https://docs.plozz.app/not/a/guide'), async path => {
    assert.equal(path, '/404.html');
    return new Response('Page not found');
  });
  assert.equal(missing.status, 404);
  const denied = await handleRequest(new Request('https://docs.plozz.app/', { method: 'POST' }), async () => { throw new Error('Should not forward a write'); });
  assert.equal(denied.status, 405);
  assert.equal(denied.headers.get('Allow'), 'GET, HEAD');
  const source = { commit: 'a'.repeat(40), contentHash: 'b'.repeat(64), verifiedAt: '2026-10-18T00:00:00Z' };
  const current = await handleRequest(new Request('https://docs.plozz.app/freshness.json'), async path => {
    assert.equal(path, '/_source.json');
    return Response.json(source);
  }, async metadata => {
    assert.deepEqual(metadata, source);
    return Response.json({ status: 'current' });
  });
  assert.equal((await current.json()).status, 'current');
  const unavailable = await handleRequest(new Request('https://docs.plozz.app/freshness.json'), async () => new Response('', { status: 404 }));
  assert.equal(unavailable.status, 503);
  assert.equal((await unavailable.json()).status, 'unknown');
  const invalidRedirect = await handleRequest(new Request('https://docs.plozz.app/servers'), async () => new Response(null, { status: 302, headers: { Location: 'https://example.com/' } }));
  assert.equal(invalidRedirect.status, 503);
  assert.equal(invalidRedirect.headers.get('Location'), null);
});

test('Worker entry point exports only its HTTP handler', async () => {
  const entry = await import('../worker/index.mjs');
  assert.deepEqual(Object.keys(entry), ['default']);
  assert.equal(typeof entry.default.fetch, 'function');
});

test('live settings discovery handles grouped cases, values and comments without dropping controls', () => {
  const result = discoverSurfaces(['Sources/FeatureHome/View.swift', 'Sources/FeatureHomeCore/Model.swift'], 'enum ProfileSettingsCategory: String {\n case playback, subtitles\n case appearance = "Appearance" // visible category\n}\n', null);
  assert.deepEqual(result.modules, ['FeatureHome']);
  assert.deepEqual(result.settingsCategories, ['appearance', 'playback', 'subtitles']);
  assert.throws(() => discoverSurfaces([], 'enum Empty {}', null), /No profile-settings/);
  assert.throws(() => discoverSurfaces([], 'case appearance = unknownExpression', null), /Unsupported settings-category/);
});

test('documentation search finds article text and links to the relevant section', () => {
  const script = readFileSync(new URL('../public/docs.js', import.meta.url), 'utf8');
  const context = createContext({
    document: {
      body: { dataset: { contentHash: 'y' } },
      querySelector: selector => selector === '.nav-shell' ? {} : null,
      querySelectorAll: () => [],
      addEventListener() {},
    },
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    fetch: async () => Response.json({ status: 'current', documentedCommit: 'x', contentHash: 'y' }),
  });
  runInContext(script, context);
  const entries = [{ title: 'Appearance', description: 'Personalize the interface.', path: '/appearance/', text: 'Dim the interface at sunset.', sections: [{ id: 'scheduled-dimming', title: 'Scheduled dimming', text: 'Dim the interface at sunset.' }] }];
  const matches = context.rankPages(entries, 'sunset');
  assert.equal(matches.length, 1);
  assert.equal(matches[0].path, '/appearance/#scheduled-dimming');
  assert(matches[0].snippet.includes('sunset'));
  assert.equal(context.rankPages(entries, 'unrelated').length, 0);
  assert.doesNotMatch(script, /\.innerHTML\s*=/);
});
