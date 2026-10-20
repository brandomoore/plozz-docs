import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT, SITE, readJson, readBaseline, validatePages, validateState, markdown, escapeHtml as e, pagePath, headingSlug, sha256, plainText as plain } from './lib.mjs';
import { brandIcon, uiIcon as icon, platformIcons } from './visuals.mjs';

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
// Match plozz.app's content-versioned image URL, not the cached legacy URL.
const socialImage = 'https://plozz.app/og-image.png?v=783203ae33600ae4';
const json = value => JSON.stringify(value).replaceAll('<', '\\u003c').replaceAll('>', '\\u003e');
const sectionInfo = {
  Connect: { icon: 'connect', description: 'Bring your servers and network storage into Plozz.' },
  Library: { icon: 'library', description: 'Find your media and organize the way you browse.' },
  Playback: { icon: 'playback', description: 'Video, audio, subtitles, music and live channels.', featured: ['playback', 'live-tv', 'downloads'] },
  Personalize: { icon: 'personalize', description: 'Make the picture and interface work for you.' },
  'Accounts & sync': { icon: 'accounts', description: 'Profiles, connected services and your other devices.' },
  Help: { icon: 'help', description: 'Find the cause of a problem and what to try next.' },
};
const data = pages.map(page => {
  const tokens = markdown.parse(readFileSync(resolve(ROOT, 'content', page.file), 'utf8'), {});
  const headings = tokens.flatMap((token, index) => token.type === 'heading_open' && token.tag === 'h2'
    ? [{ id: token.attrGet('id'), title: plain(tokens.slice(index, index + 3)), index }] : []);
  const sections = headings.map((heading, index) => ({
    id: heading.id, title: heading.title, text: plain(tokens.slice(heading.index, headings[index + 1]?.index ?? tokens.length)),
  }));
  return { ...page, tokens, sections, text: plain(tokens) };
});
const installLink = data.find(page => page.slug === 'getting-started').tokens
  .flatMap(token => token.children ?? [])
  .find(token => token.type === 'link_open' && /^https:\/\/(?:testflight\.apple\.com\/join\/|apps\.apple\.com\/)/.test(token.attrGet('href')))
  ?.attrGet('href');
function navigation(current) {
  const activeSection = pages.find(page => page.slug === current)?.section;
  return policy.sections.map(section => {
    const members = pages.filter(page => page.section === section);
    if (!members.length) return '';
    return `<details class="nav-group"${section === activeSection ? ' open' : ''}><summary>${e(section)}<span class="chevron" aria-hidden="true"></span></summary><div class="nav-items">${members.map(page =>
      `<a href="${pagePath(page.slug)}" data-slug="${page.slug}" data-title="${e(page.title.toLowerCase())}"${page.slug === current ? ' aria-current="page"' : ''}>${e(page.title)}</a>`).join('')}</div></details>`;
  }).join('');
}
function directory() {
  return `<section class="guide-directory" aria-labelledby="all-guides"><div class="section-heading"><h2 id="all-guides">Explore the guides</h2><p>Choose what you want to do.</p></div><div class="topic-grid">${policy.sections.map(section => {
    const members = pages.filter(page => page.section === section && page.slug !== 'getting-started');
    const info = sectionInfo[section];
    const ordered = info.featured
      ? [...info.featured.map(slug => members.find(page => page.slug === slug)).filter(Boolean), ...members.filter(page => !info.featured.includes(page.slug))]
      : members;
    const list = items => items.map(page => `<li><a href="${pagePath(page.slug)}"><span>${e(page.title)}</span>${icon('arrow')}</a></li>`).join('');
    return members.length ? `<section class="topic-card"><div class="topic-card-top"><span class="topic-icon">${icon(info.icon)}</span><span class="topic-count">${members.length} ${members.length === 1 ? 'guide' : 'guides'}</span></div><h3 id="guides-${headingSlug(section)}">${e(section)}</h3><p>${e(info.description)}</p><ul class="topic-links">${list(ordered.slice(0, 3))}</ul>${members.length > 3 ? `<details class="topic-more"><summary>${members.length - 3} more ${members.length === 4 ? 'guide' : 'guides'}<span class="chevron" aria-hidden="true"></span></summary><ul class="topic-links">${list(ordered.slice(3))}</ul></details>` : ''}</section>` : '';
  }).join('')}</div></section>`;
}
function resources() {
  return `<div class="sidebar-resources"><p>Resources</p><a href="https://plozz.app/formats"><span>${icon('library')}Formats & compatibility</span>${icon('external')}</a><a href="https://plozz.app/discord"><span>${brandIcon('discord')}Discord community</span>${icon('external')}</a><a href="https://github.com/brandomoore/Plozz"><span>${brandIcon('github')}GitHub project</span>${icon('external')}</a></div>`;
}
function contents(page, rail = false) {
  const links = page.sections.map(section => `<li><a href="#${section.id}" data-toc-link>${e(section.title)}</a></li>`).join('');
  return rail
    ? `<aside class="toc-rail"><nav aria-label="On this page"><p>On this page</p><ul>${links}</ul></nav></aside>`
    : `<details class="mobile-toc"><summary>On this page<span class="chevron" aria-hidden="true"></span></summary><ul>${links}</ul></details>`;
}
function article(page) {
  const heading = page.tokens.findIndex(token => token.type === 'heading_open' && token.tag === 'h1');
  const headingHtml = markdown.renderer.render(page.tokens.slice(heading, heading + 3), markdown.options, {});
  const tokens = [...page.tokens.slice(0, heading), ...page.tokens.slice(heading + 3)];
  const introEnd = tokens[0]?.type === 'paragraph_open' ? tokens.findIndex(token => token.type === 'paragraph_close' && token.level === 0) : -1;
  const intro = introEnd >= 0 ? markdown.renderer.render(tokens.slice(0, introEnd + 1), markdown.options, {}) : '';
  const rest = markdown.renderer.render(tokens.slice(introEnd + 1), markdown.options, {});
  const home = page.slug === 'getting-started';
  const platforms = page.platforms ? `<ul class="platform-labels" role="list" aria-label="Applies to">${page.platforms.map(platform =>
    `<li>${icon(platformIcons[platform])}${e(platform)}</li>`).join('')}</ul>` : '';
  const title = `<header class="article-header"><div class="article-context"><p class="eyebrow">${home ? 'Plozz documentation' : e(page.section)}</p>${platforms}</div>${headingHtml}</header>`;
  if (home) return `<article class="home-article"><section class="home-intro">${title}<div class="article-lead">${intro}</div><div class="home-actions">${page.sections.length ? `<a class="button primary" href="#${page.sections[0].id}">Start setup${icon('arrow')}</a>` : ''}<a class="button secondary" href="#all-guides" data-open-search>Find an answer${icon('search')}</a></div></section>${directory()}<div class="article-prose quick-start">${rest}</div></article>`;
  return `<article class="article-body">${title}<div class="article-lead">${intro}</div>${page.sections.length > 1 ? contents(page) : ''}<div class="article-prose">${rest}</div></article>`;
}
function related(page) {
  if (!page || page.slug === 'getting-started') return '';
  const members = pages.filter(candidate => candidate.section === page.section);
  const index = members.findIndex(candidate => candidate.slug === page.slug);
  const neighbors = [members[index + 1], members[index - 1]].filter(Boolean);
  return neighbors.length ? `<section class="related-guides" aria-label="Related guides"><p class="related-label">Keep exploring</p><div>${neighbors.map(candidate => `<a href="${pagePath(candidate.slug)}"><span>${e(candidate.title)}</span>${icon('arrow')}<p>${e(candidate.description)}</p></a>`).join('')}</div></section>` : '';
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
<meta property="og:image" content="${socialImage}"><meta property="og:image:alt" content="Plozz media and IPTV player for Apple TV, iPhone and iPad">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${e(title)}"><meta name="twitter:description" content="${e(description)}"><meta name="twitter:image" content="${socialImage}">
<link rel="stylesheet" href="/docs.css?v=${cssVersion}"><link rel="preload" as="font" type="font/woff2" href="/manrope.woff2" crossorigin>
<meta name="theme-color" content="#09090b">${structured.length ? `<script type="application/ld+json">${json(structured)}</script>` : ''}</head><body data-content-hash="${state.contentHash}">
<a class="skip" href="#main">Skip to content</a>
<header class="site-header"><div class="header-inner"><a class="menu-trigger icon-button" href="/#all-guides" data-open-navigation aria-label="Open guides" aria-haspopup="dialog" aria-controls="docs-navigation-dialog">${icon('menu')}</a><a class="brand" href="/" aria-label="Plozz documentation home"><img src="/logo.svg" alt="" width="30" height="30"><span>Plozz</span><span class="brand-divider" aria-hidden="true">/</span><small>Docs</small></a><a class="search-trigger" href="/#all-guides" data-open-search aria-label="Search documentation" aria-haspopup="dialog" aria-controls="docs-search-dialog">${icon('search')}<span>Search documentation</span><kbd>/</kbd></a><div class="header-links"><a href="https://plozz.app" class="website-link">Website${icon('external')}</a>${installLink ? `<a href="${e(installLink)}" class="button primary get-app">Get Plozz${icon('arrow')}</a>` : ''}</div></div></header>
<div class="docs-shell"><aside class="sidebar" id="docs-sidebar"><p class="sidebar-heading">Guides</p><nav class="sidebar-nav" aria-label="Documentation">${navigation(page?.slug)}</nav>${resources()}</aside>
<main id="main" class="docs-main${page?.slug === 'getting-started' ? ' home-main' : ''}"><div class="article-grid${page?.slug === 'getting-started' || (page?.sections.length ?? 0) < 2 ? ' no-rail' : ''}"><div class="article-content">${page ? content : `<article class="article-body"><header class="article-header"><p class="eyebrow">Plozz documentation</p><h1>Page not found</h1></header><p><a href="/">Open the guides.</a></p></article>`}${related(page)}<footer>${updatedAt ? `<p class="updated">Last updated <time datetime="${e(updatedAt)}">${displayDate.format(new Date(updatedAt))}</time>.</p>` : ''}<div class="footer-links"><a href="https://github.com/brandomoore/plozz-docs${page ? `/blob/main/content/${page.file}` : ''}">Documentation source</a><a href="https://github.com/brandomoore/plozz-docs/issues">Report a docs problem</a></div></footer></div>${page && page.slug !== 'getting-started' && page.sections.length > 1 ? contents(page, true) : ''}</div></main></div>
<dialog id="docs-search-dialog" class="search-dialog" aria-label="Search documentation"><div class="search-panel"><div class="search-input-row">${icon('search')}<label class="sr-only" for="guide-search">Search documentation</label><input id="guide-search" type="search" placeholder="A feature, setting or problem" autocomplete="off"><button class="icon-button" type="button" data-close-search aria-label="Close search">${icon('close')}</button></div><div class="search-content"><p id="search-status" role="status" hidden></p><ul id="search-results" aria-label="Search results" hidden></ul></div><div class="search-hints"><span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span><span><kbd>Enter</kbd> Open</span><span><kbd>Esc</kbd> Close</span></div></div></dialog>
<dialog id="docs-navigation-dialog" class="navigation-dialog" aria-label="Browse guides"><div class="navigation-panel"><div class="navigation-heading"><a class="brand" href="/"><img src="/logo.svg" alt="" width="26" height="26"><span>Plozz <small>Docs</small></span></a><button class="icon-button" type="button" data-close-navigation aria-label="Close guides">${icon('close')}</button></div><nav class="sidebar-nav" aria-label="Mobile documentation">${navigation(page?.slug)}</nav>${resources()}</div></dialog>
<script src="/docs.js?v=${scriptVersion}" defer></script></body></html>`;
}
for (const page of data) {
  const destination = page.slug === 'getting-started' ? output : resolve(output, page.slug);
  mkdirSync(destination, { recursive: true });
  writeFileSync(resolve(destination, 'index.html'), shell(page, article(page)));
}
writeFileSync(resolve(output, '404.html'), shell(null, ''));
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
