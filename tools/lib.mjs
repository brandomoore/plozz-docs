import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import MarkdownIt from 'markdown-it';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const APP_REPO = 'brandomoore/Plozz';
export const SITE = 'https://docs.plozz.app';
export const sha256 = value => createHash('sha256').update(value).digest('hex');
export const readJson = path => JSON.parse(readFileSync(resolve(ROOT, path), 'utf8'));
export const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
export const pagePath = slug => slug === 'getting-started' ? '/' : `/${slug}/`;
export const markdown = new MarkdownIt({ html: false, linkify: false, typographer: false });
export const headingSlug = text => text.toLowerCase().normalize('NFKD').replace(/\p{M}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
markdown.core.ruler.after('inline', 'heading-identifiers', state => {
  const used = new Set(['main', 'freshness', 'guide-search', 'no-guides', 'search-status', 'search-results', 'all-guides']);
  for (let index = 0; index < state.tokens.length; index++) {
    const token = state.tokens[index];
    if (token.type !== 'heading_open') continue;
    const slug = headingSlug(state.tokens[index + 1].content);
    const base = slug.startsWith('guides-') ? `section-${slug}` : slug;
    let id = base, count = 1;
    while (used.has(id)) id = `${base}-${++count}`;
    used.add(id);
    token.attrSet('id', id);
  }
});
export const readCoverage = (root = ROOT) => {
  const path = resolve(root, 'content/coverage.json');
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : null;
};
export const readBaseline = (root = ROOT) => JSON.parse(readFileSync(resolve(root, 'config/documentation-baseline.json'), 'utf8'));
export const baselineHash = (root = ROOT) => sha256(JSON.stringify({
  policy: readBaseline(root), editorial: readFileSync(resolve(root, 'EDITORIAL.md'), 'utf8'),
}));
export const coverageHash = (root = ROOT) => sha256(JSON.stringify(readCoverage(root)));
export const isContentFilename = name => /^(?:[a-z][a-z0-9-]{1,60}\.md|pages\.json|coverage\.json)$/.test(name);
export const isContentPath = path => path.startsWith('content/') && isContentFilename(path.slice(8));
export const contentHash = (pages, root = ROOT) => sha256(JSON.stringify({
  pages: pages.map(page => ({ ...page, content: readFileSync(resolve(root, 'content', page.file), 'utf8') })),
  coverage: readCoverage(root),
}));
export const pageMaterialHash = (page, root = ROOT) => sha256(JSON.stringify({
  slug: page.slug, title: page.title, seoTitle: page.seoTitle, description: page.description,
  section: page.section, kind: page.kind ?? 'guide', content: readFileSync(resolve(root, 'content', page.file), 'utf8'),
  directory: page.slug === 'getting-started' ? JSON.parse(readFileSync(resolve(root, 'content/pages.json'), 'utf8'))
    .map(({ slug, title, description, section }) => ({ slug, title, description, section })) : undefined,
}));
export const pageAnchors = (page, root = ROOT) => markdown.parse(readFileSync(resolve(root, 'content', page.file), 'utf8'), {})
  .filter(token => token.type === 'heading_open').map(token => token.attrGet('id'));

export function classifyChanges(pages, comparison) {
  const files = comparison.files ?? [];
  const complete = ['ahead', 'identical'].includes(comparison.status) && files.length < 300;
  const changedFiles = files.flatMap(file => [file.filename, file.previous_filename].filter(Boolean))
    .filter(path => !/^(Tests\/|UITests\/|\.github\/|tools\/|scripts\/|fastlane\/)/.test(path)
      && /\.(swift|md|json|plist|ya?ml|xcstrings|xcconfig|resolved)$/.test(path));
  const owns = (page, path) => page.sources.includes(path) || page.watch.some(prefix => path.startsWith(prefix));
  let affected = pages.filter(page => changedFiles.some(path => owns(page, path))).map(page => page.slug);
  if (!complete || changedFiles.some(path => !pages.some(page => owns(page, path)))) affected = pages.map(page => page.slug);
  return { mode: complete && changedFiles.length === 0 ? 'metadata' : 'content', affected, changedFiles };
}

function safeSourcePath(path) {
  return typeof path === 'string' && path.length <= 512 && /^[a-zA-Z0-9_][a-zA-Z0-9_./ +\-]*$/.test(path)
    && !path.replace(/\/$/, '').split('/').some(part => !part || part.startsWith('.'));
}

export function validSourcePath(path) {
  return safeSourcePath(path) && /\.(md|swift|json|plist|ya?ml|xcconfig|xcstrings|resolved)$/.test(path);
}

export function validatePages(pages, root = ROOT) {
  if (!Array.isArray(pages) || pages.length < 1 || pages.length > 60) throw new Error('Expected 1–60 focused documentation pages.');
  const slugs = new Set();
  for (const page of pages) {
    if (!/^[a-z][a-z0-9-]{1,60}$/.test(page.slug) || slugs.has(page.slug)) throw new Error('Invalid or duplicate guide slug.');
    slugs.add(page.slug);
    if (page.file !== `${page.slug}.md`) throw new Error(`Guide filename must match slug: ${page.slug}`);
    if (typeof page.title !== 'string' || page.title.length < 3 || page.title.length > 70) throw new Error(`Invalid guide title: ${page.slug}`);
    if (!['Connect', 'Library', 'Playback', 'Personalize', 'Accounts & sync', 'Help', 'Start here', 'Watching', 'Your setup'].includes(page.section)) throw new Error(`Unknown navigation section: ${page.slug}`);
    if (!Array.isArray(page.sources) || page.sources.length < 1 || page.sources.length > 20 || !page.sources.every(validSourcePath)) throw new Error(`Invalid source references: ${page.slug}`);
    if (!Array.isArray(page.watch) || page.watch.length > 6 || !page.watch.every(safeSourcePath)) throw new Error(`Invalid source watch prefixes: ${page.slug}`);
    const body = readFileSync(resolve(root, 'content', page.file), 'utf8');
    if (Buffer.byteLength(body) > 32_000) throw new Error(`Guide too large: ${page.slug}`);
    const tokens = markdown.parse(body, {});
    const h1 = tokens.flatMap((token, index) => token.type === 'heading_open' && token.tag === 'h1' ? [tokens[index + 1].content] : []);
    if (h1.length !== 1 || h1[0] !== page.title) throw new Error(`Guide needs one matching H1: ${page.slug}`);
    const words = body.trim().split(/\s+/).length;
    const limit = { guide: 450, reference: 900, overview: 350 }[page.kind ?? 'guide'];
    if (!limit) throw new Error(`Unknown page kind: ${page.slug}`);
    if (words > limit) throw new Error(`${page.slug}: ${words} words exceeds the ${limit}-word limit.`);
    if (/<\/?[a-z][^>]*>/i.test(body) || tokens.some(token => token.children?.some(child => child.type === 'image'))) throw new Error(`No raw HTML or images in guides: ${page.slug}`);
    if (/discord\.gg\/|discord\.com\/invite\//i.test(body)) throw new Error(`Use the stable Discord shortcut: ${page.slug}`);
    if (body.includes(`github.com/${APP_REPO}/tree/`) || body.includes(`github.com/${APP_REPO}/blob/`)) throw new Error(`Keep app source citations in the manifest; publishing metadata records provenance: ${page.slug}`);
    if (/gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|-----BEGIN .*PRIVATE KEY-----/.test(body)) throw new Error(`Possible credential in guide: ${page.slug}`);
  }
  if (!slugs.has('getting-started')) throw new Error('Missing getting-started guide.');
  const files = readdirSync(resolve(root, 'content')).filter(file => file.endsWith('.md'));
  if (files.some(file => !pages.some(page => page.file === file))) throw new Error('Every Markdown file needs a navigation entry.');
  for (const page of pages) {
    const tokens = markdown.parse(readFileSync(resolve(root, 'content', page.file), 'utf8'), {});
    for (const token of tokens.flatMap(token => token.children ?? [])) {
      if (token.type !== 'link_open') continue;
      const href = token.attrGet('href');
      if (/^https:\/\//.test(href) || /^mailto:/.test(href)) continue;
      const target = new URL(href, `${SITE}${pagePath(page.slug)}`);
      const destination = pages.find(other => target.origin === SITE && target.pathname === pagePath(other.slug));
      if (destination && !target.search && (!target.hash || pageAnchors(destination, root).includes(decodeURIComponent(target.hash.slice(1))))) continue;
      throw new Error(`Unsupported or broken link in ${page.slug}: ${href}`);
    }
  }
  return pages;
}

export function validateSeo(pages, root = ROOT) {
  const titles = new Set(), descriptions = new Set();
  const normalized = value => value.trim().replace(/\s+/g, ' ').toLowerCase();
  for (const page of pages) {
    if (typeof page.seoTitle !== 'string' || page.seoTitle.trim().length < 8 || page.seoTitle.length > 110 || /[\r\n<>]/.test(page.seoTitle) || titles.has(normalized(page.seoTitle))) throw new Error(`Missing, duplicated or invalid search title: ${page.slug}`);
    if (typeof page.description !== 'string' || page.description.trim().length < 30 || page.description.length > 200 || /[\r\n<>]/.test(page.description) || descriptions.has(normalized(page.description))) throw new Error(`Missing, duplicated or invalid description: ${page.slug}`);
    if (!readBaseline(root).sections.includes(page.section)) throw new Error(`Use a reader-task navigation section: ${page.slug}`);
    titles.add(normalized(page.seoTitle)); descriptions.add(normalized(page.description));
  }
}

export function validateCoverage(pages, discovery, root = ROOT) {
  const coverage = readCoverage(root);
  const policy = readBaseline(root);
  if (coverage?.schemaVersion !== 1 || !coverage.areas || !coverage.modules || !coverage.settingsCategories) throw new Error('Missing the product coverage ledger.');
  if (Object.keys(coverage.areas).some(id => !policy.areas.some(area => area.id === id))) throw new Error('Unknown baseline coverage area.');
  const sourceRefs = record => {
    if (!Array.isArray(record?.sources) || !record.sources.length || record.sources.length > 20 || !record.sources.every(path => validSourcePath(path) && discovery.files?.[path])) throw new Error('Coverage decisions need existing immutable source evidence.');
  };
  for (const area of policy.areas) {
    const record = coverage.areas[area.id];
    sourceRefs(record);
    if (!Array.isArray(record.documents) || !record.documents.length) throw new Error(`Undocumented baseline area: ${area.id}`);
    for (const link of record.documents) {
      const page = pages.find(page => page.slug === link.slug);
      if (!page || (link.anchor && !pageAnchors(page, root).includes(link.anchor))) throw new Error(`Broken coverage link for ${area.id}`);
    }
  }
  const mappedAreas = record => Array.isArray(record?.areas) && record.areas.length > 0 && record.areas.every(id => policy.areas.some(area => area.id === id));
  if (!Array.isArray(discovery.modules) || !Array.isArray(discovery.settingsCategories)) throw new Error('Missing discovered product surfaces.');
  for (const name of discovery.modules) {
    const record = coverage.modules[name];
    sourceRefs(record);
    if (!record.sources.some(path => path.startsWith(`Sources/${name}/`) || path.startsWith(`Sources/${name}Core/`))) throw new Error(`Module evidence must include its implementation: ${name}`);
    const omitted = typeof record.omitReason === 'string' && record.omitReason.trim().length >= 30;
    if (mappedAreas(record) === omitted) throw new Error(`Classify product module ${name}: documented areas or a justified internal-code omission.`);
  }
  if (Object.keys(coverage.modules).some(name => !discovery.modules.includes(name))) throw new Error('Coverage contains retired or unknown product modules.');
  for (const name of discovery.settingsCategories) {
    const record = coverage.settingsCategories[name];
    sourceRefs(record);
    if (!mappedAreas(record)) throw new Error(`Unmapped live settings category: ${name}`);
  }
  if (Object.keys(coverage.settingsCategories).some(name => !discovery.settingsCategories.includes(name))) throw new Error('Coverage contains retired or unknown settings categories.');
  return coverage;
}

export function validateState(state, pages, root = ROOT) {
  validateSeo(pages, root);
  if (state.repository !== APP_REPO || state.ref !== 'main' || !/^[0-9a-f]{40}$/.test(state.commit)) throw new Error('Invalid app source state.');
  if (!Number.isFinite(Date.parse(state.verifiedAt))) throw new Error('Invalid source verification time.');
  if (state.contentHash !== contentHash(pages, root)) throw new Error('Content changed after source review; finalize the reviewed proposal.');
  if (state.policyHash !== baselineHash(root) || state.coverageHash !== coverageHash(root)) throw new Error('Coverage baseline changed after review.');
  validateCoverage(pages, { ...state.discovery, files: state.sourceFiles }, root);
  for (const path of new Set(pages.flatMap(page => page.sources))) {
    if (!/^[0-9a-f]{40}$/.test(state.sourceFiles?.[path] ?? '')) throw new Error(`Missing immutable source fingerprint: ${path}`);
  }
  for (const page of pages) {
    if (state.pages?.[page.slug]?.contentHash !== pageMaterialHash(page, root) || !Number.isFinite(Date.parse(state.pages[page.slug].updatedAt))) throw new Error(`Missing genuine article-change history: ${page.slug}`);
  }
  if (!state.review || state.review.coverageReviewed !== true || !['independent-review', 'unchanged-sources'].includes(state.review.kind)) throw new Error('Missing documentation content/coverage review provenance.');
  return state;
}
