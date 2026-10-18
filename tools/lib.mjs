import { readFileSync, readdirSync } from 'node:fs';
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
export const contentHash = (pages, root = ROOT) => sha256(JSON.stringify(pages.map(page => ({
  ...page, content: readFileSync(resolve(root, 'content', page.file), 'utf8'),
}))));

export function classifyChanges(pages, comparison) {
  const files = comparison.files ?? [];
  const complete = ['ahead', 'identical'].includes(comparison.status) && files.length < 300;
  const changedFiles = files.flatMap(file => [file.filename, file.previous_filename].filter(Boolean))
    .filter(path => !/^(Tests\/|UITests\/|\.github\/|tools\/|scripts\/|fastlane\/)/.test(path)
      && /\.(swift|md|json|plist|ya?ml|xcstrings|xcconfig)$/.test(path));
  const owns = (page, path) => page.sources.includes(path) || page.watch.some(prefix => path.startsWith(prefix));
  let affected = pages.filter(page => changedFiles.some(path => owns(page, path))).map(page => page.slug);
  if (!complete || changedFiles.some(path => !pages.some(page => owns(page, path)))) affected = pages.map(page => page.slug);
  return { mode: complete && changedFiles.length === 0 ? 'metadata' : 'content', affected, changedFiles };
}

function safeSourcePath(path) {
  return typeof path === 'string' && path.length <= 512 && /^[a-zA-Z0-9_][a-zA-Z0-9_./ -]*$/.test(path)
    && !path.replace(/\/$/, '').split('/').some(part => !part || part.startsWith('.'));
}

export function validSourcePath(path) {
  return safeSourcePath(path) && /\.(md|swift|json|plist|ya?ml|xcconfig|xcstrings)$/.test(path);
}

export function validatePages(pages, root = ROOT) {
  if (!Array.isArray(pages) || pages.length < 1 || pages.length > 30) throw new Error('Expected 1–30 concise guides.');
  const slugs = new Set();
  for (const page of pages) {
    if (!/^[a-z][a-z0-9-]{1,60}$/.test(page.slug) || slugs.has(page.slug)) throw new Error('Invalid or duplicate guide slug.');
    slugs.add(page.slug);
    if (page.file !== `${page.slug}.md`) throw new Error(`Guide filename must match slug: ${page.slug}`);
    if (typeof page.title !== 'string' || page.title.length < 3 || page.title.length > 70) throw new Error(`Invalid guide title: ${page.slug}`);
    if (!['Start here', 'Watching', 'Your setup', 'Help'].includes(page.section)) throw new Error(`Unknown navigation section: ${page.slug}`);
    if (!Array.isArray(page.sources) || page.sources.length < 1 || page.sources.length > 8 || !page.sources.every(validSourcePath)) throw new Error(`Invalid source references: ${page.slug}`);
    if (!Array.isArray(page.watch) || page.watch.length > 6 || !page.watch.every(safeSourcePath)) throw new Error(`Invalid source watch prefixes: ${page.slug}`);
    const body = readFileSync(resolve(root, 'content', page.file), 'utf8');
    if (Buffer.byteLength(body) > 32_000) throw new Error(`Guide too large: ${page.slug}`);
    const tokens = markdown.parse(body, {});
    const h1 = tokens.flatMap((token, index) => token.type === 'heading_open' && token.tag === 'h1' ? [tokens[index + 1].content] : []);
    if (h1.length !== 1 || h1[0] !== page.title) throw new Error(`Guide needs one matching H1: ${page.slug}`);
    const words = body.trim().split(/\s+/).length;
    if (words > 350) throw new Error(`${page.slug}: ${words} words exceeds the 350-word limit.`);
    if (/<\/?[a-z][^>]*>/i.test(body) || tokens.some(token => token.children?.some(child => child.type === 'image'))) throw new Error(`No raw HTML or images in guides: ${page.slug}`);
    if (/discord\.gg\/|discord\.com\/invite\//i.test(body)) throw new Error(`Use the stable Discord shortcut: ${page.slug}`);
    if (body.includes(`github.com/${APP_REPO}/tree/`) || body.includes(`github.com/${APP_REPO}/blob/`)) throw new Error(`Keep app source citations in the manifest; the provenance banner is generated: ${page.slug}`);
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
      if (pages.some(other => href === pagePath(other.slug))) continue;
      throw new Error(`Unsupported or broken link in ${page.slug}: ${href}`);
    }
  }
  return pages;
}

export function validateState(state, pages) {
  if (state.repository !== APP_REPO || state.ref !== 'main' || !/^[0-9a-f]{40}$/.test(state.commit)) throw new Error('Invalid app source state.');
  if (!Number.isFinite(Date.parse(state.verifiedAt))) throw new Error('Invalid source verification time.');
  if (state.contentHash !== contentHash(pages)) throw new Error('Content changed after source review; finalize the reviewed proposal.');
  for (const path of new Set(pages.flatMap(page => page.sources))) {
    if (!/^[0-9a-f]{40}$/.test(state.sourceFiles?.[path] ?? '')) throw new Error(`Missing immutable source fingerprint: ${path}`);
  }
  if (!state.review || !['independent-review', 'unchanged-sources'].includes(state.review.kind)) throw new Error('Missing documentation review provenance.');
  return state;
}
