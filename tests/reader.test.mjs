import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { createContext, runInContext } from 'node:vm';

const script = readFileSync(new URL('../public/docs.js', import.meta.url), 'utf8');

function reader(loadIndex) {
  const document = { activeElement: null, body: { dataset: { contentHash: 'hash' } } };
  function element(tagName = 'DIV') {
    const listeners = new Map();
    return {
      tagName, tabIndex: 0, children: [], dataset: {}, hidden: false, value: '', textContent: '',
      addEventListener(type, callback) {
        if (!listeners.has(type)) listeners.set(type, []);
        listeners.get(type).push(callback);
      },
      async emit(type, event = {}) {
        for (const callback of listeners.get(type) ?? []) await callback({ target: this, ...event });
      },
      append(...items) { this.children.push(...items); },
      replaceChildren(...items) { this.children = items; },
      querySelectorAll(selector) {
        return this.children.flatMap(child => [...(child.tagName === selector.toUpperCase() ? [child] : []), ...child.querySelectorAll(selector)]);
      },
      focus() { document.activeElement = this; },
      select() { this.selected = true; },
      scrollIntoView() {},
      getAttribute(name) { return this[name]; },
      getClientRects() { return [{}]; },
    };
  }
  const input = element('INPUT');
  const results = element('UL');
  const status = element('P');
  const trigger = element('A');
  trigger.getBoundingClientRect = () => ({ left: 180, top: 18, width: 280, height: 44 });
  const close = element('BUTTON');
  const row = { offsetHeight: 54 };
  const dialog = Object.assign(element('DIALOG'), {
    open: false,
    offsetWidth: 600, offsetHeight: 104, offsetLeft: 20,
    style: { setProperty(name, value) { this[name] = value; } },
    getAnimations() { return []; },
    showModal() { this.open = true; },
    close() { this.open = false; return this.emit('close'); },
    querySelector: selector => selector === '.search-input-row' ? row : close,
    querySelectorAll: () => [input, close, ...results.querySelectorAll('a')],
  });
  const titleLink = Object.assign(element('A'), { dataset: { title: 'subtitles' }, textContent: 'Subtitles', href: '/subtitles/' });
  const nodes = { '.search-trigger': trigger, '#guide-search': input, '#search-results': results, '#search-status': status, '#docs-search-dialog': dialog };
  document.querySelector = selector => nodes[selector] ?? null;
  document.querySelectorAll = selector => ({
    '#docs-sidebar a[data-slug]': [titleLink],
    '[data-open-search]': [trigger],
    'dialog[open]': dialog.open ? [dialog] : [],
  })[selector] ?? [];
  document.createElement = tag => element(tag.toUpperCase());
  const events = element();
  document.addEventListener = events.addEventListener;
  const context = createContext({ document, window: events, getComputedStyle: () => ({ transform: 'none' }) });
  runInContext(script, context);
  context.loadIndex = loadIndex;
  const key = (value, extra = {}) => ({ key: value, preventDefault() { this.prevented = true; }, ...extra });
  return { input, results, status, trigger, close, dialog, titleLink, document, events, key };
}

test('search shortcuts respect text input, composition and modified slash keys', async () => {
  const r = reader(() => { throw new Error('Opening search must not fetch'); });
  await r.events.emit('keydown', r.key('/', { target: r.input }));
  assert.equal(r.dialog.open, false);
  await r.events.emit('keydown', r.key('/', { ctrlKey: true }));
  assert.equal(r.dialog.open, false);
  await r.events.emit('keydown', r.key('/', { isComposing: true }));
  assert.equal(r.dialog.open, false);
  await r.events.emit('keydown', r.key('/'));
  assert.equal(r.dialog.open, true);
  assert.equal(r.dialog.style['--trigger-top'], '18px');
  assert.equal(r.dialog.style['--return-row-y'], '-6px');
  assert.equal(r.document.activeElement, r.input);
  await r.dialog.close();
  await r.events.emit('keydown', r.key('K', { target: r.input, metaKey: true }));
  assert.equal(r.dialog.open, true);
  await r.close.emit('click');
  await r.events.emit('keydown', r.key('k', { ctrlKey: true }));
  assert.equal(r.dialog.open, true);
});

test('pointer focus stays quiet without suppressing subsequent keyboard focus', async () => {
  const r = reader();
  await r.trigger.emit('click', { detail: 1, preventDefault() {} });
  assert.equal(r.document.activeElement, r.input);
  assert.equal(r.input.dataset.focusOrigin, 'pointer');
  await r.events.emit('keydown', r.key('k', { ctrlKey: true }));
  assert.notEqual(r.input.dataset.focusOrigin, 'pointer');
  await r.input.emit('pointerdown');
  assert.equal(r.input.dataset.focusOrigin, 'pointer');
  await r.input.emit('blur');
  assert.notEqual(r.input.dataset.focusOrigin, 'pointer');
  await r.dialog.close();
  await r.trigger.emit('click', { detail: 0, preventDefault() {} });
  assert.notEqual(r.input.dataset.focusOrigin, 'pointer');
});

test('full-text results are keyboard-accessible links and closing clears the query', async () => {
  const r = reader(async () => ({ search: async () => ({ results: [{ data: async () => ({
    url: '/subtitles/#timing', meta: { title: 'Timing', guide: 'Subtitles' }, plain_excerpt: 'Adjust subtitle timing.',
  }) }] }) }));
  await r.trigger.emit('click', { preventDefault() {} });
  r.input.value = 'timing';
  await r.input.emit('input');
  const [link] = r.results.querySelectorAll('a');
  assert.equal(link.href, '/subtitles/#timing');
  assert.equal(link.children[0].textContent, 'Timing · Subtitles');
  assert.match(link.children[1].textContent, /timing/);
  await r.dialog.emit('keydown', r.key('ArrowDown'));
  assert.equal(r.document.activeElement, link);
  await r.dialog.emit('keydown', r.key('ArrowUp'));
  assert.equal(r.document.activeElement, r.input);
  await r.dialog.emit('keydown', r.key('Tab', { shiftKey: true }));
  assert.equal(r.document.activeElement, link);
  await r.dialog.emit('keydown', r.key('Tab'));
  assert.equal(r.document.activeElement, r.input);
  await r.dialog.emit('keydown', r.key('Escape'));
  assert.equal(r.input.value, '');
  assert.equal(r.dialog.open, false);
  assert.equal(r.results.children.length, 0);
  assert.equal(r.status.hidden, true);
});

test('failed full-text search shows usable title matches inside the dialog', async () => {
  const r = reader(async () => { throw new Error('Index unavailable'); });
  r.input.value = 'subtitles';
  await r.input.emit('input');
  assert.match(r.status.textContent, /Full-text search is unavailable/);
  assert.match(r.status.textContent, /Showing title matches/);
  assert.equal(r.results.querySelectorAll('a')[0].href, '/subtitles/');
  assert.equal(r.titleLink.hidden, false);
  r.input.value = 'missing';
  await r.input.emit('input');
  assert.match(r.status.textContent, /No matching titles/);
  assert.equal(r.results.hidden, true);
});

test('closing preserves results during exit and reopening cancels an unfinished exit', async () => {
  const r = reader(async () => { throw new Error('Offline'); });
  const open = () => r.trigger.emit('click', { detail: 1, preventDefault() {} });
  const find = async () => { r.input.value = 'subtitles'; await r.input.emit('input'); };
  let finish = [];
  r.dialog.getAnimations = () => Array.from({ length: 2 }, () => ({
    transitionProperty: 'transform', finished: new Promise(resolve => finish.push(resolve)),
  }));
  await open();
  await find();
  await r.close.emit('click');
  assert(r.dialog.open);
  assert.equal(r.results.querySelectorAll('a').length, 1);
  await open();
  finish.splice(0).forEach(resolve => resolve());
  await new Promise(resolve => setImmediate(resolve));
  assert(r.dialog.open);
  assert.equal(r.input.value, 'subtitles');
  await r.close.emit('click');
  finish.shift()();
  await new Promise(resolve => setImmediate(resolve));
  assert(r.dialog.open, 'the shell must not disappear while the row is still returning');
  finish.shift()();
  await new Promise(resolve => setImmediate(resolve));
  assert(!r.dialog.open);
  assert.equal(r.input.value, '');
  assert.equal(r.results.children.length, 0);
});

test('closing search discards an in-flight response instead of restoring stale results', async () => {
  let resolveData;
  const r = reader(async () => ({ search: async () => ({ results: [{ data: () => new Promise(resolve => { resolveData = resolve; }) }] }) }));
  await r.trigger.emit('click', { preventDefault() {} });
  r.input.value = 'captions';
  const pending = r.input.emit('input');
  await new Promise(resolve => setImmediate(resolve));
  await r.dialog.close();
  resolveData({ url: '/subtitles/', meta: { title: 'Subtitles' }, plain_excerpt: 'Captions.' });
  await pending;
  assert.equal(r.results.children.length, 0);
  assert.equal(r.results.hidden, true);
  assert.equal(r.status.hidden, true);
});
