import { mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';
import tar from 'tar-stream';
import { APP_REPO, validSourcePath, sha256 } from './lib.mjs';

const LABELS = 'App/Resources/Localizable.xcstrings';
const CATEGORIES = 'Sources/CoreUI/ProfileSettingsCategory.swift';

export function productInputs(tree, pages) {
  const cited = new Set(pages.flatMap(page => page.sources));
  return tree.filter(file => file.type === 'blob' && validSourcePath(file.path)
    && !/(?:^|\/)(?:AGENTS[^/]*|CLAUDE[^/]*)\.md$/.test(file.path)
    && (cited.has(file.path) || file.path === LABELS
      || /^(?:App|Sources)\/.*\.swift$/.test(file.path)
      || /^Sources\/.*\.(?:md|json|plist)$/.test(file.path)
      || /^docs\/.*\.md$/.test(file.path)
      || /^(?:README\.md|Package\.swift|Package\.resolved|project\.yml)$/.test(file.path)
      || /^Config\/.*\.(?:xcconfig|ya?ml)$/.test(file.path)));
}

export function discoverSurfaces(paths, categorySource, labelsHash) {
  const modules = [...new Set(paths.flatMap(path => {
    const name = path.match(/^Sources\/([^/]+)\//)?.[1];
    if (!name || !/^(?:Feature|Provider|MediaTransport)|Service$|^(?:MetadataKit|MediaDownloads|TopShelfKit)$/.test(name)) return [];
    return [name.startsWith('Feature') ? name.replace(/Core$/, '') : name];
  }))].sort();
  const categories = [];
  for (const match of categorySource.matchAll(/^\s*case\s+(?!\.)(.+)$/gm)) {
    let declaration = match[1].trim();
    while (declaration && !declaration.startsWith('//')) {
      const item = declaration.match(/^([a-zA-Z][a-zA-Z0-9_]*)(?:\s*=\s*"(?:[^"\\]|\\.)*")?\s*/);
      if (!item) throw new Error('Unsupported settings-category declaration; source discovery needs review.');
      categories.push(item[1]);
      declaration = declaration.slice(item[0].length);
      if (declaration.startsWith(',')) declaration = declaration.slice(1).trim();
      else if (declaration && !declaration.startsWith('//')) throw new Error('Unsupported settings-category declaration; source discovery needs review.');
    }
  }
  const settingsCategories = [...new Set(categories)].sort();
  if (!settingsCategories.length) throw new Error('No profile-settings categories discovered; review the live registry instead of assuming empty coverage.');
  const settingsSurfaces = paths.filter(path =>
    /^Sources\/FeatureSettings\/.*\.swift$/.test(path)
    || /^Sources\/AppShelliOS\/.*Settings.*\.swift$/.test(path)).sort();
  const result = { modules, settingsCategories, settingsSurfaces, labelsHash };
  return { ...result, structureHash: sha256(JSON.stringify(result)) };
}

export async function downloadSnapshot(commit, tree, pages, work, request = fetch) {
  if (!/^[a-f0-9]{40}$/.test(commit)) throw new Error('An immutable app revision is required.');
  const inputs = productInputs(tree, pages);
  const expected = new Map(inputs.map(file => [file.path, file]));
  if (!expected.has(CATEGORIES)) throw new Error('The live profile-settings registry is missing; source discovery needs review.');
  const remaining = new Set(expected.keys());
  const source = resolve(work, 'source');
  rmSync(source, { recursive: true, force: true });
  rmSync(resolve(work, 'source-labels.json'), { force: true });
  mkdirSync(source, { recursive: true });
  const response = await request(`https://codeload.github.com/${APP_REPO}/tar.gz/${commit}`, { signal: AbortSignal.timeout(180_000) });
  if (!response.ok || !response.body) throw new Error(`Complete source download failed: HTTP ${response.status}`);
  const extractor = tar.extract();
  let archiveBytes = 0;
  let expandedBytes = 0;
  let labelsHash = null;
  const limiter = new Transform({
    transform(chunk, _, callback) {
      archiveBytes += chunk.length;
      callback(archiveBytes > 128 * 1024 * 1024 ? new Error('Source archive exceeds the bounded download size.') : null, chunk);
    },
  });
  extractor.on('entry', (header, stream, next) => {
    try {
      expandedBytes += header.size ?? 0;
      if (expandedBytes > 256 * 1024 * 1024) throw new Error('Source archive exceeds the bounded expanded size.');
      const slash = header.name.indexOf('/');
      const prefix = slash < 0 ? header.name : header.name.slice(0, slash);
      if (prefix !== `Plozz-${commit}`) throw new Error('Unexpected source archive root.');
      const path = slash < 0 ? '' : header.name.slice(slash + 1);
      if (!expected.has(path)) { stream.on('end', next); stream.resume(); return; }
      if (header.type !== 'file' || !remaining.has(path)) throw new Error(`Unsupported or duplicate source entry: ${path}`);
      const limit = path === LABELS ? 64 * 1024 * 1024 : 5 * 1024 * 1024;
      if (header.size !== expected.get(path).size || header.size > limit) throw new Error(`Unexpected source size: ${path}`);
      const chunks = [];
      stream.on('data', chunk => chunks.push(chunk));
      stream.on('end', () => {
        try {
          const bytes = Buffer.concat(chunks);
          const hash = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
          if (hash !== expected.get(path).sha) throw new Error(`Source fingerprint mismatch: ${path}`);
          if (path === LABELS) {
            const catalog = JSON.parse(bytes);
            const labels = Object.fromEntries(Object.entries(catalog.strings ?? {}).sort(([a], [b]) => a.localeCompare(b)).map(([key, entry]) =>
              [key, { source: entry.localizations?.[catalog.sourceLanguage ?? 'en'] ?? { stringUnit: { value: key } }, comment: entry.comment ?? '' }]));
            labelsHash = sha256(JSON.stringify(labels));
            writeFileSync(resolve(work, 'source-labels.json'), JSON.stringify({ path, blob: hash, labels }, null, 2));
          } else {
            const destination = resolve(source, path);
            if (!destination.startsWith(source + '/')) throw new Error('Source path escaped its snapshot.');
            mkdirSync(dirname(destination), { recursive: true });
            writeFileSync(destination, bytes);
          }
          remaining.delete(path);
          next();
        } catch (error) { extractor.destroy(error); }
      });
    } catch (error) { extractor.destroy(error); }
  });
  await pipeline(Readable.fromWeb(response.body), limiter, createGunzip(), extractor);
  if (remaining.size) throw new Error(`Incomplete source snapshot: ${[...remaining].join(', ')}`);
  const files = Object.fromEntries(inputs.map(file => [file.path, file.sha]).sort(([a], [b]) => a.localeCompare(b)));
  const discovery = {
    schemaVersion: 1, repository: APP_REPO, commit, fileCount: inputs.length,
    snapshotHash: sha256(JSON.stringify(files)), files,
    ...discoverSurfaces(inputs.map(file => file.path), readFileSync(resolve(source, CATEGORIES), 'utf8'), labelsHash),
  };
  writeFileSync(resolve(work, 'discovery.json'), JSON.stringify(discovery, null, 2) + '\n');
  return discovery;
}
