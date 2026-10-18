import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { createContext, runInContext } from 'node:vm';

const script = readFileSync(new URL('../public/docs.js', import.meta.url), 'utf8');

function reader(fetch) {
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
  const close = element('BUTTON');
  const dialog = Object.assign(element('DIALOG'), {
    open: false,
    showModal() { this.open = true; },
    close() { this.open = false; return this.emit('close'); },
    querySelector: () => close,
    querySelectorAll: () => [input, close, ...results.querySelectorAll('a')],
  });
  const titleLink = Object.assign(element('A'), { dataset: { title: 'subtitles' }, textContent: 'Subtitles', href: '/subtitles/' });
  const nodes = { '#guide-search': input, '#search-results': results, '#search-status': status, '#docs-search-dialog': dialog };
  document.querySelector = selector => nodes[selector] ?? null;
  document.querySelectorAll = selector => ({
    '#docs-sidebar a[data-slug]': [titleLink],
    '[data-open-search]': [trigger],
    'dialog[open]': dialog.open ? [dialog] : [],
  })[selector] ?? [];
  document.createElement = tag => element(tag.toUpperCase());
  const events = element();
  document.addEventListener = events.addEventListener;
  const context = createContext({ document, fetch });
  runInContext(script, context);
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
  assert.equal(r.document.activeElement, r.input);
  await r.dialog.close();
  await r.events.emit('keydown', r.key('K', { target: r.input, metaKey: true }));
  assert.equal(r.dialog.open, true);
  await r.close.emit('click');
  await r.events.emit('keydown', r.key('k', { ctrlKey: true }));
  assert.equal(r.dialog.open, true);
});

test('full-text results are keyboard-accessible links and closing clears the query', async () => {
  const r = reader(async () => Response.json({ contentHash: 'hash', entries: [
    { title: 'Subtitles', description: 'Choose captions.', path: '/subtitles/', text: 'Adjust subtitle timing.', sections: [{ id: 'timing', title: 'Timing', text: 'Adjust subtitle timing.' }] },
  ] }));
  await r.trigger.emit('click', { preventDefault() {} });
  r.input.value = 'timing';
  await r.input.emit('input');
  const [link] = r.results.querySelectorAll('a');
  assert.equal(link.href, '/subtitles/#timing');
  assert.equal(link.children[0].textContent, 'Subtitles');
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
  const r = reader(async () => new Response('', { status: 503 }));
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

test('closing search discards an in-flight response instead of restoring stale results', async () => {
  let resolveFetch;
  const r = reader(() => new Promise(resolve => { resolveFetch = resolve; }));
  await r.trigger.emit('click', { preventDefault() {} });
  r.input.value = 'captions';
  const pending = r.input.emit('input');
  await r.dialog.close();
  resolveFetch(Response.json({ contentHash: 'hash', entries: [] }));
  await pending;
  assert.equal(r.results.children.length, 0);
  assert.equal(r.results.hidden, true);
  assert.equal(r.status.hidden, true);
});
