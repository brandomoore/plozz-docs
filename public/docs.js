const search = document.querySelector('#guide-search');
const links = [...document.querySelectorAll('#docs-sidebar a[data-slug]')];
const results = document.querySelector('#search-results');
const searchStatus = document.querySelector('#search-status');
const contentHash = document.body.dataset.contentHash;
const normalize = value => value.toLowerCase().normalize('NFKD').replace(/\p{M}/gu, '');
let indexRequest;
let searchGeneration = 0;

function searchTerms(query) {
  // The guide calls this "server's version order"; library sorting is a different task.
  if (/\bversions?\b/i.test(query) && /\bserver\b/i.test(query) && /\b(sort(?:ing)?|order(?:ing)?)\b/i.test(query)) {
    return query.replace(/^(?:is there (?:any |a )?way to |how (?:can|do) i )/i, '')
      .replace(/\b(?:preserve|keep)\b/gi, '').replace(/\bsort(?:ing)?\b/gi, 'order').trim();
  }
  return query;
}

async function loadIndex(importModule = path => import(path)) {
  const basePath = `/pagefind/${contentHash}/`;
  const { createInstance } = await importModule(`${basePath}pagefind.js`);
  const engine = createInstance({ basePath, baseUrl: '/', excerptLength: 48, excerptEllipsis: '…' });
  await engine.init();
  return engine;
}

function sectionMatch({ url, meta, plain_excerpt }) {
  if (!/^\/(?:[a-z][a-z0-9-]{1,60}\/)?(?:#[a-z0-9-]+)?$/.test(url) || !meta.title) throw new Error('Invalid search result');
  return {
    path: url, title: meta.guide && meta.title !== meta.guide ? `${meta.title} · ${meta.guide}` : meta.title,
    snippet: plain_excerpt.replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
  };
}

function renderMatches(matches) {
  results.replaceChildren();
  results.hidden = !matches.length;
  for (const item of matches.slice(0, 12)) {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = item.path;
    const title = document.createElement('span');
    title.textContent = item.title;
    anchor.append(title);
    if (item.snippet) {
      const excerpt = document.createElement('p');
      excerpt.textContent = item.snippet;
      anchor.append(excerpt);
    }
    li.append(anchor);
    results.append(li);
  }
}

function clearSearch() {
  ++searchGeneration;
  search.value = '';
  results.replaceChildren();
  results.hidden = true;
  searchStatus.hidden = true;
}

search?.addEventListener('input', async () => {
  const generation = ++searchGeneration;
  const query = search.value.trim();
  results.replaceChildren();
  results.hidden = !query;
  searchStatus.hidden = !query;
  if (!query) return;
  searchStatus.textContent = 'Searching guides and settings…';
  try {
    indexRequest ??= loadIndex().catch(error => { indexRequest = null; throw error; });
    const engine = await indexRequest;
    if (generation !== searchGeneration) return;
    const { results: hits } = await engine.search(searchTerms(query));
    if (generation !== searchGeneration) return;
    const matches = await Promise.all(hits.slice(0, 12).map(async hit => sectionMatch(await hit.data())));
    if (generation !== searchGeneration) return;
    renderMatches(matches);
    searchStatus.textContent = hits.length > 12
      ? `Showing 12 of ${hits.length} matches. Refine your search for fewer results.`
      : hits.length ? `${hits.length} ${hits.length === 1 ? 'match' : 'matches'}.` : 'No matches. Try a feature, setting or symptom.';
  } catch {
    if (generation !== searchGeneration) return;
    const terms = normalize(query).split(/\s+/);
    const matches = links.filter(link => terms.every(term => normalize(link.dataset.title).includes(term)))
      .map(link => ({ title: link.textContent, path: link.getAttribute('href') }));
    renderMatches(matches);
    searchStatus.textContent = `Full-text search is unavailable or updating. ${matches.length > 12 ? `Showing 12 of ${matches.length} title matches.` : matches.length ? 'Showing title matches.' : 'No matching titles.'} Reload to retry full-text search.`;
  }
});

function bindDialog(selector, openSelector, closeSelector, onOpen, dismiss = dialog => dialog.close()) {
  const dialog = document.querySelector(selector);
  if (!dialog || typeof dialog.showModal !== 'function') return null;
  const open = event => {
    for (const other of document.querySelectorAll('dialog[open]')) {
      if (other !== dialog) other.close();
    }
    const alreadyOpen = dialog.open;
    if (!alreadyOpen) dialog.showModal();
    onOpen?.(event, alreadyOpen);
  };
  for (const trigger of document.querySelectorAll(openSelector)) trigger.addEventListener('click', event => {
    event.preventDefault();
    open(event);
  });
  const close = () => dismiss(dialog);
  dialog.querySelector(closeSelector).addEventListener('click', close);
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  let backdropPointer = false;
  dialog.addEventListener('pointerdown', event => { backdropPointer = event.target === dialog; });
  dialog.addEventListener('click', event => {
    if (event.target === dialog && backdropPointer) close();
    backdropPointer = false;
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !event.isComposing) {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab' || event.metaKey || event.ctrlKey || event.altKey || event.isComposing) return;
    const focusable = [...dialog.querySelectorAll('a[href], button, input, summary, [tabindex]')]
      .filter(element => element.tabIndex >= 0 && !element.disabled && element.getClientRects().length);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (first && document.activeElement === (event.shiftKey ? first : last)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    }
  });
  return { dialog, open };
}

// Text inputs can match :focus-visible even after a mouse click or tap.
search?.addEventListener('pointerdown', () => { search.dataset.focusOrigin = 'pointer'; });
search?.addEventListener('blur', () => { delete search.dataset.focusOrigin; });
const headerSearch = document.querySelector('.search-trigger');
function anchorSearch() {
  const { left, top, width, height } = headerSearch.getBoundingClientRect();
  const dialog = searchModal.dialog;
  // Measure the final layout, not the transformed rectangle of an interrupted animation.
  const w = dialog.offsetWidth, h = dialog.offsetHeight;
  const dx = left - dialog.offsetLeft;
  const rowY = (height - dialog.querySelector('.search-input-row').offsetHeight - 2) / 2;
  dialog.style.setProperty('--trigger-top', `${top}px`);
  dialog.style.setProperty('--return-x', `${dx}px`);
  dialog.style.setProperty('--return-end-x', `${width - w}px`);
  dialog.style.setProperty('--return-row-y', `${rowY}px`);
  dialog.style.setProperty('--return-scale', `scale(${width / w}, ${height / h})`);
  dialog.style.setProperty('--return-height', `${h}px`);
}
const searchModal = bindDialog('#docs-search-dialog', '[data-open-search]', '[data-close-search]', (event, alreadyOpen) => {
  const dialog = searchModal.dialog;
  delete dialog.dataset.closing;
  if (!alreadyOpen) {
    clearSearch();
    anchorSearch();
    dialog.dataset.starting = '';
    // Commit the source frame before allowing the compositor to move it.
    getComputedStyle(dialog, '::before').transform;
    delete dialog.dataset.starting;
  }
  if (event?.detail > 0) search.dataset.focusOrigin = 'pointer';
  else delete search.dataset.focusOrigin;
  search.focus();
  search.select();
}, dismissSearch);
if (searchModal) window.addEventListener('resize', () => { if (searchModal.dialog.open) anchorSearch(); });
const navigationModal = bindDialog('#docs-navigation-dialog', '[data-open-navigation]', '[data-close-navigation]');
let exitTransition;
function dismissSearch(dialog) {
  if (dialog.dataset.closing) return;
  anchorSearch();
  dialog.dataset.closing = 'true';
  // Keep the native dialog in the top layer until its border reaches the trigger.
  const transforms = dialog.getAnimations({ subtree: true }).filter(animation => animation.transitionProperty === 'transform');
  if (!transforms.length) return dialog.close();
  const morph = Promise.allSettled(transforms.map(animation => animation.finished));
  exitTransition = morph;
  morph.then(() => {
    if (dialog.open && dialog.dataset.closing && exitTransition === morph) dialog.close();
  });
}
searchModal?.dialog.addEventListener('close', () => {
  if (!searchModal.dialog.open) clearSearch();
});
results?.addEventListener('click', event => {
  if (event.target.closest('a') && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) searchModal?.dialog.close();
});
if (navigationModal) {
  const compact = matchMedia('(max-width: 760px)');
  compact.addEventListener('change', () => {
    if (!compact.matches && navigationModal.dialog.open) navigationModal.dialog.close();
  });
  navigationModal.dialog.addEventListener('click', event => {
    if (event.target.closest('a')) navigationModal.dialog.close();
  });
}

document.addEventListener('keydown', event => {
  if (event.defaultPrevented || event.isComposing || !searchModal) return;
  const typing = event.target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName);
  const command = (event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === 'k';
  const slash = event.key === '/' && !typing && !event.metaKey && !event.ctrlKey && !event.altKey;
  if (command || slash) {
    event.preventDefault();
    searchModal.open();
  }
});

searchModal?.dialog.addEventListener('keydown', event => {
  if (!['ArrowDown', 'ArrowUp'].includes(event.key) || event.metaKey || event.ctrlKey || event.altKey || event.isComposing) return;
  const matches = [...results.querySelectorAll('a')];
  const index = matches.indexOf(document.activeElement);
  if (!matches.length || (index < 0 && document.activeElement !== search)) return;
  event.preventDefault();
  const next = event.key === 'ArrowDown' ? Math.min(index + 1, matches.length - 1) : index - 1;
  if (next < 0) search.focus();
  else {
    matches[next].focus();
    matches[next].scrollIntoView({ block: 'nearest' });
  }
});

const tocLinks = [...document.querySelectorAll('[data-toc-link]')];
const headings = [...document.querySelectorAll('.article-prose h2[id]')];
if (tocLinks.length && headings.length) {
  let scheduled = false;
  const updateSection = () => {
    scheduled = false;
    const threshold = document.querySelector('.site-header').getBoundingClientRect().bottom + 36;
    let current = headings[0].id;
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= threshold) current = heading.id;
    }
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = headings.at(-1).id;
    for (const link of tocLinks) {
      if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };
  const schedule = () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateSection);
    }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  updateSection();
}
