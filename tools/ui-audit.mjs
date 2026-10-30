import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Collect literal evidence, not a claim that every string is a reachable control.
// The independent source review still checks navigation, wiring and conditions.
export function swiftStrings(source) {
  const values = new Set();
  let index = 0;
  const comment = () => {
    if (source.startsWith('//', index)) {
      const end = source.indexOf('\n', index);
      index = end < 0 ? source.length : end;
      return true;
    }
    if (!source.startsWith('/*', index)) return false;
    index += 2;
    let depth = 1;
    while (index < source.length && depth) {
      if (source.startsWith('/*', index)) { depth++; index += 2; }
      else if (source.startsWith('*/', index)) { depth--; index += 2; }
      else index++;
    }
    return true;
  };
  const string = () => {
    const opening = source.slice(index).match(/^(#*)("""|")/);
    if (!opening) return false;
    const hashes = opening[1], quote = opening[2];
    const closing = quote + hashes, escape = '\\' + hashes;
    index += opening[0].length;
    let value = '', dynamic = false, closed = false;
    while (index < source.length) {
      if (source.startsWith(closing, index)) {
        index += closing.length; closed = true; break;
      }
      if (source.startsWith(escape, index)) {
        index += escape.length;
        if (source[index] === '(') {
          dynamic = true;
          index++;
          let depth = 1;
          while (index < source.length && depth) {
            if (comment() || string()) continue;
            if (source[index] === '(') depth++;
            if (source[index] === ')') depth--;
            index++;
          }
        } else if (source.startsWith('u{', index)) {
          const unicode = source.slice(index).match(/^u\{([a-fA-F0-9]{1,8})\}/);
          if (!unicode || parseInt(unicode[1], 16) > 0x10ffff) { dynamic = true; index++; }
          else { value += String.fromCodePoint(parseInt(unicode[1], 16)); index += unicode[0].length; }
        } else {
          const next = source[index++];
          const escapes = { n: '\n', r: '\r', t: '\t', '0': '\0', '"': '"', "'": "'", '\\': '\\' };
          if (Object.hasOwn(escapes, next)) value += escapes[next];
          else dynamic = true;
        }
      } else value += source[index++];
    }
    if (closed && !dynamic && quote === '"' && value.trim() && value.length <= 500) values.add(value);
    return true;
  };
  while (index < source.length) {
    if (!comment() && !string()) index++;
  }
  return [...values].sort();
}

export function discoverUI(paths, sourceRoot, catalog = {}) {
  const labels = {}, screens = new Set();
  for (const path of paths.filter(path => /^(?:App|Sources)\/.*\.swift$/.test(path))) {
    const source = readFileSync(resolve(sourceRoot, path), 'utf8');
    const literalLabels = swiftStrings(source);
    const localized = literalLabels.map(key => catalog[key]?.source?.stringUnit?.value ?? key);
    labels[path] = [...new Set(localized)].sort();
    if (/^Sources\/FeatureSettings\//.test(path)
      || /^Sources\/AppShelliOS\/.*Settings.*\.swift$/.test(path)
      || /\b(?:some\s+View|ViewModifier|UIViewRepresentable|UIViewControllerRepresentable)\b|:\s*View\b/.test(source)) screens.add(path);
  }
  return { screenSurfaces: [...screens].sort(), uiLabels: labels };
}

export function validateUI(pages, coverage, discovery, { root, markdown, plainText, pageAnchors }) {
  if (!Array.isArray(discovery.screenSurfaces) || !discovery.uiLabels || !coverage.screens) {
    throw new Error('Missing page-by-page UI inventory; run source:plan and complete coverage.screens.');
  }
  const reference = (ref, sources, context) => {
    if (!ref || typeof ref.text !== 'string' || !ref.text.trim() || ref.text.length > 500
      || !sources.includes(ref.source) || !discovery.files?.[ref.source]
      || !discovery.uiLabels[ref.source]?.includes(ref.text)) {
      throw new Error(`UI label must match exact English source wording and cited evidence: ${context}: ${ref?.text}`);
    }
  };
  const links = (documents, context) => {
    if (!Array.isArray(documents) || !documents.length) throw new Error(`UI screen needs a useful guide or section: ${context}`);
    for (const link of documents) {
      const page = pages.find(page => page.slug === link.slug);
      if (!page || (link.anchor && !pageAnchors(page, root).includes(link.anchor))) throw new Error(`Broken UI coverage link: ${context}`);
    }
  };
  for (const path of discovery.screenSurfaces) {
    const record = coverage.screens[path];
    if (!record || !Array.isArray(record.sources) || !record.sources.includes(path)
      || !record.sources.every(source => discovery.files?.[source])) throw new Error(`Unreviewed UI surface: ${path}`);
    if (record.omitReason !== undefined) {
      if (!['implementation', 'shared-component', 'editorial-scope', 'unreachable'].includes(record.omitKind)
        || typeof record.omitReason !== 'string' || record.omitReason.trim().length < 30
        || record.documents?.length || record.controls?.length) throw new Error(`Invalid UI exclusion: ${path}`);
      continue;
    }
    links(record.documents, path);
    if (!Array.isArray(record.platforms) || !record.platforms.length
      || record.platforms.some(value => !['Apple TV', 'iPhone', 'iPad'].includes(value))
      || typeof record.navigation !== 'string' || record.navigation.trim().length < 15
      || typeof record.experience !== 'string' || record.experience.trim().length < 30
      || typeof record.conditions !== 'string' || !record.conditions.trim()
      || !Array.isArray(record.controls)) throw new Error(`UI screen needs navigation, reader experience, visibility conditions and a control audit: ${path}`);
    for (const ref of record.controls) reference(ref, record.sources, path);
  }
  if (Object.keys(coverage.screens).some(path => !discovery.screenSurfaces.includes(path))) throw new Error('UI coverage contains retired or unknown screens.');
  for (const page of pages) {
    if (!page.ui || !Array.isArray(page.ui.references) || !Array.isArray(page.ui.emphasis)
      || page.ui.emphasis.some(text => typeof text !== 'string' || !text.trim())) throw new Error(`Missing UI terminology audit: ${page.slug}`);
    const tokens = markdown.parse(readFileSync(resolve(root, 'content', page.file), 'utf8'), {});
    const text = plainText(tokens);
    const labels = new Set();
    for (const ref of page.ui.references) {
      reference(ref, page.sources, page.slug);
      if (!text.includes(ref.text)) throw new Error(`Unused UI label reference: ${page.slug}: ${ref.text}`);
      labels.add(ref.text);
    }
    const emphases = new Set(page.ui.emphasis);
    const used = new Set();
    for (const token of tokens.filter(token => token.type === 'inline')) {
      let depth = 0, phrase = '';
      for (const child of token.children ?? []) {
        if (child.type === 'strong_open') { if (depth++ === 0) phrase = ''; }
        else if (child.type === 'strong_close' && --depth === 0) {
          used.add(phrase);
          if (!emphases.has(phrase) && !phrase.split(' > ').every(label => labels.has(label))) {
            throw new Error(`Unverified bold control/path: ${page.slug}: ${phrase}. Cite exact UI labels, or classify genuine non-control emphasis.`);
          }
        } else if (depth > 0 && ['text', 'code_inline', 'softbreak', 'hardbreak'].includes(child.type)) {
          phrase += child.content || ' ';
        }
      }
    }
    if ([...emphases].some(phrase => !used.has(phrase))) throw new Error(`Unused editorial emphasis classification: ${page.slug}`);
  }
}
