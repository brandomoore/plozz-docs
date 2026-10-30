import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { swiftStrings, discoverUI, validateUI, systemUIContracts } from '../tools/ui-audit.mjs';
import { markdown, plainText, pageAnchors } from '../tools/lib.mjs';

test('Swift label evidence ignores comments and dynamic templates, handling raw strings and escapes', () => {
  const source = String.raw`
// Text("Not a label")
/* "Outer comment" /* "Nested comment" */ */
Text("Settings")
Text("Say \"hello\"")
Text("Caf\u{e9}")
Text(#"Raw "quotes""#)
Text("\(user.name): \(String(localized: "Choose a profile"))")
Text("Keep progress")
Text("Progress: \(count)")
`;
  assert.deepEqual(swiftStrings(source), ['Café', 'Choose a profile', 'Keep progress', 'Raw "quotes"', 'Say "hello"', 'Settings']);
});

test('UI discovery includes navigation screens and settings helpers, using source-language catalog values', t => {
  const root = mkdtempSync(resolve(tmpdir(), 'plozz-ui-source-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const sources = {
    'Sources/FeatureSettings/SettingsModel.swift': 'let title = "settings.title"',
    'Sources/FeatureHome/Details.swift': 'struct Details: View { var body: some View { Text("Details").navigationTitle("Details") } }',
    'Sources/CoreModels/SettingsCopy.swift': 'let title = "Show progress bars"',
    'Sources/FeatureHome/Backend.swift': 'let notAScreen = "Details"',
    'Sources/FeaturePlayback/PlayerOverlay.swift': 'struct PlayerOverlay: View { var body: some View { Text("Subtitles") } }',
  };
  for (const [path, text] of Object.entries(sources)) {
    mkdirSync(resolve(root, path, '..'), { recursive: true });
    writeFileSync(resolve(root, path), text);
  }
  const result = discoverUI(Object.keys(sources), root, {
    'settings.title': { source: { stringUnit: { value: 'Settings' } } },
  });
  assert.deepEqual(result.screenSurfaces, ['Sources/FeatureHome/Details.swift', 'Sources/FeaturePlayback/PlayerOverlay.swift', 'Sources/FeatureSettings/SettingsModel.swift']);
  assert.deepEqual(result.uiLabels['Sources/FeatureSettings/SettingsModel.swift'], ['Settings']);
  assert.deepEqual(result.uiLabels['Sources/CoreModels/SettingsCopy.swift'], ['Show progress bars']);
});

function fixture(t) {
  const root = mkdtempSync(resolve(tmpdir(), 'plozz-ui-audit-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(resolve(root, 'content'));
  writeFileSync(resolve(root, 'content/getting-started.md'), '# Get started\n\n## Your screen\n\nOpen **Settings > Appearance**. Enable **Show progress bars** to see how far you have watched. Available on **Apple TV**.\n');
  const path = 'Sources/FeatureSettings/Appearance.swift';
  const refs = ['Settings', 'Appearance', 'Show progress bars'].map(text => ({ text, source: path }));
  const pages = [{ slug: 'getting-started', file: 'getting-started.md', sources: [path],
    ui: { references: refs, emphasis: ['Apple TV'] } }];
  const discovery = { files: { [path]: 'a'.repeat(40) }, screenSurfaces: [path],
    uiLabels: { [path]: refs.map(ref => ref.text) } };
  const coverage = { screens: { [path]: {
    sources: [path], platforms: ['Apple TV'], navigation: 'Open Settings > Appearance.',
    experience: 'Choose how cards look and whether they show your progress.',
    conditions: 'Available to the selected profile.', controls: refs,
    documents: [{ slug: 'getting-started', anchor: 'your-screen' }],
  } } };
  return { root, path, pages, coverage, discovery,
    check: () => validateUI(pages, coverage, discovery, { root, markdown, plainText, pageAnchors }) };
}

test('UI references enforce exact source casing, real evidence and named navigation', t => {
  const f = fixture(t);
  assert.doesNotThrow(f.check);
  f.pages[0].ui.references[2] = { text: 'Show Progress Bars', source: f.path };
  assert.throws(f.check, /exact English source wording/);
  f.pages[0].ui.references.pop();
  assert.throws(f.check, /Unverified bold control\/path/);
  f.pages[0].ui.references.push({ text: 'Show progress bars', source: 'Sources/Missing.swift' });
  assert.throws(f.check, /exact English source wording/);
});

test('every discovered screen needs useful coverage or a specific permitted exclusion', t => {
  const f = fixture(t);
  const record = f.coverage.screens[f.path];
  delete f.coverage.screens[f.path];
  assert.throws(f.check, /Unreviewed UI surface/);
  f.coverage.screens[f.path] = { sources: [f.path], omitKind: 'unnecessary', omitReason: 'Already covered by another broad feature category.' };
  assert.throws(f.check, /Invalid UI exclusion/);
  f.coverage.screens[f.path] = { sources: [f.path], omitKind: 'shared-component',
    omitReason: 'Reusable row included and audited on its parent Appearance screen.' };
  assert.doesNotThrow(f.check);
  f.coverage.screens[f.path] = { ...record, documents: [{ slug: 'getting-started', anchor: 'missing' }] };
  assert.throws(f.check, /Broken UI coverage link/);
});

test('unused references and editorial-emphasis escape hatches remain reviewable and bounded', t => {
  const f = fixture(t);
  f.pages[0].ui.emphasis.push('Invisible phrase');
  assert.throws(f.check, /Unused editorial emphasis/);
  f.pages[0].ui.emphasis.pop();
  f.discovery.uiLabels[f.path].push('Unused label');
  f.pages[0].ui.references.push({ text: 'Unused label', source: f.path });
  assert.throws(f.check, /Unused UI label reference/);
});

test('system captions require real framework identifiers, not comments or quoted symbol names', t => {
  const root = mkdtempSync(resolve(tmpdir(), 'plozz-system-ui-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const sources = {
    'Sources/FeatureSettings/Editor.swift': 'import SwiftUI\nstruct Editor: View { var body: some View { EditButton() } }',
    'Sources/AppShelliOS/Tabs.swift': 'let tabs: UITabBarController\nlet more = tabs.moreNavigationController',
    'Sources/CoreUI/Playing.swift': 'private var center = MPNowPlayingInfoCenter.default()',
    'Sources/CoreUI/Comment.swift': '// EditButton() MPNowPlayingInfoCenter.default()\nlet symbols = "UITabBarController moreNavigationController"',
  };
  for (const [path, text] of Object.entries(sources)) {
    mkdirSync(resolve(root, path, '..'), { recursive: true });
    writeFileSync(resolve(root, path), text);
  }
  const result = discoverUI(Object.keys(sources), root);
  assert.deepEqual(result.systemUiLabels['Sources/FeatureSettings/Editor.swift'].map(entry => entry.text), ['Edit', 'Done']);
  assert.equal(result.systemUiLabels['Sources/AppShelliOS/Tabs.swift'][0].id, 'uikit-more');
  assert.equal(result.systemUiLabels['Sources/CoreUI/Playing.swift'][0].id, 'media-now-playing');
  assert.equal(result.systemUiLabels['Sources/CoreUI/Comment.swift'], undefined);
  assert(!result.uiLabels['Sources/FeatureSettings/Editor.swift'].includes('Edit'), 'Do not pretend system captions are app literals.');
});

test('system references are explicit and cannot invent captions or documentation contracts', t => {
  const f = fixture(t);
  const contract = systemUIContracts.find(contract => contract.id === 'swiftui-edit');
  f.discovery.systemUiLabels = { [f.path]: [{ id: contract.id, text: contract.text, documentation: contract.documentation }] };
  writeFileSync(resolve(f.root, 'content/getting-started.md'), '# Get started\n\n## Your screen\n\nOpen **Settings > Appearance**. Use **Show progress bars** on **Apple TV**. Choose **Edit**.\n');
  const ref = { text: 'Edit', source: f.path };
  f.pages[0].ui.references.push(ref);
  assert.throws(f.check, /verified system contract/);
  ref.system = contract.id;
  assert.doesNotThrow(f.check);
  ref.system = 'invented-contract';
  assert.throws(f.check, /verified system contract/);
  ref.system = contract.id;
  f.discovery.systemUiLabels[f.path][0].documentation = 'https://example.com/unverified';
  assert.throws(f.check, /verified system contract/);
});
