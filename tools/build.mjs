import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT, SITE, readJson, readBaseline, validatePages, validateState, markdown, escapeHtml as e, pagePath, headingSlug, sha256 } from './lib.mjs';

const pages = validatePages(readJson('content/pages.json'));
const state = validateState(readJson('source-state.json'), pages);
const policy = readBaseline();
const output = resolve(ROOT, 'dist');
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const file of ['docs.css', 'docs.js', 'logo.svg', 'manrope.woff2', 'font-license.txt']) copyFileSync(resolve(ROOT, 'public', file), resolve(output, file));
const displayDate = new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' });
const cssVersion = sha256(readFileSync(resolve(ROOT, 'public/docs.css')));
const scriptVersion = sha256(readFileSync(resolve(ROOT, 'public/docs.js')));
const json = value => JSON.stringify(value).replaceAll('<', '\\u003c').replaceAll('>', '\\u003e');
const plain = tokens => tokens.filter(token => token.type === 'inline').map(token =>
  (token.children ?? []).filter(child => ['text', 'code_inline', 'softbreak', 'hardbreak'].includes(child.type)).map(child => child.content || ' ').join('')).join(' ').replace(/\s+/g, ' ').trim();
const data = pages.map(page => {
  const tokens = markdown.parse(readFileSync(resolve(ROOT, 'content', page.file), 'utf8'), {});
  const headings = tokens.flatMap((token, index) => token.type === 'heading_open' && token.tag === 'h2'
    ? [{ id: token.attrGet('id'), title: tokens[index + 1].content, index }] : []);
  const sections = headings.map((heading, index) => ({
    id: heading.id, title: heading.title, text: plain(tokens.slice(heading.index, headings[index + 1]?.index ?? tokens.length)),
  }));
  return { ...page, tokens, sections, text: plain(tokens) };
});
function navigation(current) {
  return policy.sections.map(section => {
    const members = pages.filter(page => page.section === section);
    if (!members.length) return '';
    return `<details class="nav-group" open><summary>${e(section)}</summary>${members.map(page =>
      `<a href="${pagePath(page.slug)}" data-slug="${page.slug}" data-title="${e(page.title.toLowerCase())}"${page.slug === current ? ' aria-current="page"' : ''}>${e(page.title)}</a>`).join('')}</details>`;
  }).join('');
}
function directory() {
  return `<section class="guide-directory" aria-labelledby="all-guides"><h2 id="all-guides">Explore the guides</h2><div>${policy.sections.map(section => {
    const members = pages.filter(page => page.section === section && page.slug !== 'getting-started');
    return members.length ? `<section><h3 id="guides-${headingSlug(section)}">${e(section)}</h3><ul>${members.map(page =>
      `<li><a href="${pagePath(page.slug)}">${e(page.title)}</a><p>${e(page.description)}</p></li>`).join('')}</ul></section>` : '';
  }).join('')}</div></section>`;
}
function shell(page, content) {
  const path = page ? pagePath(page.slug) : '/404';
  const title = page?.seoTitle ?? 'Page not found — Plozz docs';
  const description = page?.description ?? 'Find Plozz setup, playback, settings and troubleshooting guides.';
  const updatedAt = page ? state.pages[page.slug].updatedAt : null;
  const canonical = SITE + path;
  const structured = page ? [
    { '@context': 'https://schema.org', '@type': 'TechArticle', headline: page.title, description, url: canonical, mainEntityOfPage: canonical,
      dateModified: state.pages[page.slug].updatedAt, about: { '@type': 'SoftwareApplication', name: 'Plozz', url: 'https://plozz.app' } },
    ...(page.slug === 'getting-started' ? [] : [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Plozz docs', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: page.title, item: canonical },
    ] }]),
  ] : [];
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${e(title)}</title><meta name="description" content="${e(description)}">
${page ? '' : '<meta name="robots" content="noindex,follow">'}
<link rel="canonical" href="${canonical}"><link rel="icon" href="/logo.svg" type="image/svg+xml">
<meta property="og:type" content="${page ? 'article' : 'website'}"><meta property="og:site_name" content="Plozz docs">
<meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}"><meta property="og:url" content="${canonical}">
<meta property="og:image" content="https://plozz.app/og-image.png"><meta property="og:image:alt" content="Plozz media and IPTV player for Apple TV, iPhone and iPad">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${e(title)}"><meta name="twitter:description" content="${e(description)}"><meta name="twitter:image" content="https://plozz.app/og-image.png">
<link rel="stylesheet" href="/docs.css?v=${cssVersion}"><link rel="preload" as="font" type="font/woff2" href="/manrope.woff2" crossorigin>
<meta name="theme-color" content="#09090b">${structured.length ? `<script type="application/ld+json">${json(structured)}</script>` : ''}</head><body data-content-hash="${state.contentHash}">
<a class="skip" href="#main">Skip to content</a>
<header><a class="brand" href="/"><img src="/logo.svg" alt="" width="30" height="30"><span>Plozz <small>docs</small></span></a><div class="header-links"><a href="https://plozz.app">Website</a><a href="https://plozz.app/discord">Discord</a></div></header>
<div class="layout"><aside><details class="nav-shell" open><summary>Guides and search</summary><label for="guide-search">Search documentation</label><input id="guide-search" type="search" placeholder="A feature, setting or problem" autocomplete="off"><p id="search-status" role="status" hidden></p><ul id="search-results" hidden></ul><nav aria-label="Documentation">${navigation(page?.slug)}</nav><p id="no-guides" hidden>No matching guide.</p></details></aside>
<main id="main">${page && page.slug !== 'getting-started' ? `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Plozz docs</a><span aria-hidden="true">/</span><span>${e(page.title)}</span></nav>` : ''}
<article>${content}</article>${page?.slug === 'getting-started' ? directory() : ''}<footer>${updatedAt ? `<p class="updated">Last updated <time datetime="${e(updatedAt)}">${displayDate.format(new Date(updatedAt))}</time>.</p>` : ''}<div class="footer-links"><a href="https://github.com/brandomoore/plozz-docs${page ? `/blob/main/content/${page.file}` : ''}">Documentation source</a><a href="https://github.com/brandomoore/plozz-docs/issues">Report a docs problem</a></div></footer></main></div>
<script src="/docs.js?v=${scriptVersion}" defer></script></body></html>`;
}
for (const page of data) {
  const destination = page.slug === 'getting-started' ? output : resolve(output, page.slug);
  mkdirSync(destination, { recursive: true });
  let body = markdown.renderer.render(page.tokens, markdown.options, {});
  if (page.sections.length >= 3) {
    const toc = `<details class="toc"><summary>On this page</summary><ul>${page.sections.map(section => `<li><a href="#${section.id}">${e(section.title)}</a></li>`).join('')}</ul></details>`;
    const intro = page.tokens.findIndex(token => token.type === 'paragraph_close' && token.level === 0);
    body = intro >= 0
      ? markdown.renderer.render(page.tokens.slice(0, intro + 1), markdown.options, {}) + toc + markdown.renderer.render(page.tokens.slice(intro + 1), markdown.options, {})
      : body.replace('</h1>', `</h1>${toc}`);
  }
  writeFileSync(resolve(destination, 'index.html'), shell(page, body));
}
writeFileSync(resolve(output, '404.html'), shell(null, '<h1>Page not found</h1><p><a href="/">Open the guides.</a></p>'));
writeFileSync(resolve(output, '_source.json'), JSON.stringify({
  repository: state.repository, ref: state.ref, commit: state.commit, verifiedAt: state.verifiedAt, contentHash: state.contentHash,
  coverageHash: state.coverageHash, policyHash: state.policyHash, sourceSnapshotHash: state.discovery.snapshotHash,
  sourceFilesAvailable: state.discovery.fileCount, baselineAreas: policy.areas.length,
}));
writeFileSync(resolve(output, 'search-index.json'), JSON.stringify({
  contentHash: state.contentHash,
  entries: data.map(page => ({ slug: page.slug, path: pagePath(page.slug), title: page.title, description: page.description, text: page.text, sections: page.sections })),
}));
writeFileSync(resolve(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page => `<url><loc>${SITE}${pagePath(page.slug)}</loc><lastmod>${state.pages[page.slug].updatedAt.slice(0, 10)}</lastmod></url>`).join('')}</urlset>`);
writeFileSync(resolve(output, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /freshness.json\nDisallow: /_source.json\nDisallow: /search-index.json\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`Built ${pages.length} source-checked pages covering ${policy.areas.length} reader-task areas.`);
