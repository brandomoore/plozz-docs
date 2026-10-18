import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT, SITE, readJson, validatePages, validateState, markdown, escapeHtml as e, pagePath } from './lib.mjs';

const pages = validatePages(readJson('content/pages.json'));
const state = validateState(readJson('source-state.json'), pages);
const output = resolve(ROOT, 'dist');
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const file of ['docs.css', 'docs.js', 'logo.svg', 'manrope.woff2', 'font-license.txt', '_headers']) copyFileSync(resolve(ROOT, 'public', file), resolve(output, file));
const date = new Date(state.verifiedAt).toISOString().slice(0, 10);
const nav = pages.map(page => `<a href="${pagePath(page.slug)}" data-title="${e(page.title.toLowerCase())}">${e(page.title)}</a>`).join('');
function shell(title, path, content, currentSlug = '') {
  const navigation = nav.replace(`href="${pagePath(currentSlug)}"`, `aria-current="page" href="${pagePath(currentSlug)}"`);
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${e(title)} — Plozz docs</title><meta name="description" content="Short, source-checked Plozz guides for Apple TV, iPhone and iPad.">
${path === '/404' ? '<meta name="robots" content="noindex,follow">' : ''}
<link rel="canonical" href="${SITE}${path}"><link rel="icon" href="/logo.svg" type="image/svg+xml">
<link rel="stylesheet" href="/docs.css"><link rel="preload" as="font" type="font/woff2" href="/manrope.woff2" crossorigin>
<meta name="theme-color" content="#09090b"></head><body>
<a class="skip" href="#main">Skip to content</a>
<header><a class="brand" href="/"><img src="/logo.svg" alt="" width="30" height="30"><span>Plozz <small>docs</small></span></a><div class="header-links"><a href="https://plozz.app">Website</a><a href="https://plozz.app/discord">Discord</a></div></header>
<div class="layout"><aside><details class="nav-shell" open><summary>Guides</summary><label for="guide-search">Find a guide</label><input id="guide-search" type="search" placeholder="Search guide titles" autocomplete="off"><nav aria-label="Documentation">${navigation}</nav><p id="no-guides" hidden>No matching guide.</p></details></aside>
<main id="main"><div class="source-status"><p>Checked <time datetime="${e(state.verifiedAt)}">${date}</time> against <a href="https://github.com/${state.repository}/tree/${state.commit}">app source ${state.commit.slice(0, 7)}</a>.</p><p id="freshness" role="status" data-source-commit="${state.commit}" data-content-hash="${state.contentHash}">These guides track app main; your installed beta may differ.</p></div>
<article>${content}</article><footer><a href="https://github.com/brandomoore/plozz-docs">Documentation source</a><span>No account or analytics.</span></footer></main></div>
<script src="/docs.js" defer></script></body></html>`;
}
for (const page of pages) {
  const directory = page.slug === 'getting-started' ? output : resolve(output, page.slug);
  mkdirSync(directory, { recursive: true });
  const body = markdown.render(readFileSync(resolve(ROOT, 'content', page.file), 'utf8'));
  writeFileSync(resolve(directory, 'index.html'), shell(page.title, pagePath(page.slug), body, page.slug));
}
writeFileSync(resolve(output, '404.html'), shell('Page not found', '/404', '<h1>Page not found</h1><p><a href="/">Open the guides.</a></p>'));
writeFileSync(resolve(output, '_source.json'), JSON.stringify({ repository: state.repository, ref: state.ref, commit: state.commit, verifiedAt: state.verifiedAt, contentHash: state.contentHash }));
writeFileSync(resolve(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page => `<url><loc>${SITE}${pagePath(page.slug)}</loc><lastmod>${date}</lastmod></url>`).join('')}</urlset>`);
writeFileSync(resolve(output, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /freshness.json\nDisallow: /_source.json\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`Built ${pages.length} guides for ${SITE}.`);
