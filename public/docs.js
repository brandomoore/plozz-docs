const search = document.querySelector('#guide-search');
const links = [...document.querySelectorAll('#docs-sidebar a[data-slug]')];
const results = document.querySelector('#search-results');
const searchStatus = document.querySelector('#search-status');
const contentHash = document.body.dataset.contentHash;
const normalize = value => value.toLowerCase().normalize('NFKD').replace(/\p{M}/gu, '');
let indexRequest;
let searchGeneration = 0;

function rankPages(entries, query) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return entries.flatMap(entry => {
    const title = normalize(entry.title);
    const description = normalize(entry.description);
    const text = normalize(entry.text);
    if (!terms.every(term => `${title} ${description} ${text}`.includes(term))) return [];
    const score = terms.reduce((sum, term) => sum + (title.includes(term) ? 8 : 0) + (description.includes(term) ? 3 : 0) + (text.includes(term) ? 1 : 0), 0);
    const section = entry.sections.find(section => terms.every(term => normalize(`${section.title} ${section.text}`).includes(term)));
    const context = section?.text ?? entry.description;
    const position = Math.max(0, normalize(context).indexOf(terms[0]) - 35);
    return [{ title: entry.title, path: entry.path + (section ? `#${section.id}` : ''), snippet: `${position ? '…' : ''}${context.slice(position, position + 155)}${context.length > position + 155 ? '…' : ''}`, score }];
  }).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}

function loadIndex() {
  if (!indexRequest) {
    indexRequest = fetch(`/search-index.json?v=${contentHash}`).then(async response => {
      if (!response.ok) throw new Error('Search index unavailable');
      const data = await response.json();
      if (data.contentHash !== contentHash || !Array.isArray(data.entries) || !data.entries.every(entry =>
        typeof entry.title === 'string' && typeof entry.description === 'string' && typeof entry.text === 'string'
        && (entry.path === '/' || /^\/[a-z][a-z0-9-]{1,60}\/$/.test(entry.path))
        && Array.isArray(entry.sections) && entry.sections.every(section => /^[a-z0-9-]+$/.test(section.id) && typeof section.title === 'string' && typeof section.text === 'string'))) {
        throw new Error('Search index belongs to another documentation revision or has an invalid shape');
      }
      return data.entries;
    }).catch(error => { indexRequest = null; throw error; });
  }
  return indexRequest;
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
    const entries = await loadIndex();
    if (generation !== searchGeneration) return;
    const matches = rankPages(entries, query);
    renderMatches(matches);
    searchStatus.textContent = matches.length > 12
      ? `Showing 12 of ${matches.length} matches. Refine your search for fewer results.`
      : matches.length ? `${matches.length} matching ${matches.length === 1 ? 'guide' : 'guides'}.` : 'No matching guide. Try a feature, setting or symptom.';
  } catch {
    if (generation !== searchGeneration) return;
    const terms = normalize(query).split(/\s+/);
    const matches = links.filter(link => terms.every(term => normalize(link.dataset.title).includes(term)))
      .map(link => ({ title: link.textContent, path: link.getAttribute('href') }));
    renderMatches(matches);
    searchStatus.textContent = `Full-text search is unavailable or updating. ${matches.length > 12 ? `Showing 12 of ${matches.length} title matches.` : matches.length ? 'Showing title matches.' : 'No matching titles.'} Reload to retry full-text search.`;
  }
});

function bindDialog(selector, openSelector, closeSelector, onOpen) {
  const dialog = document.querySelector(selector);
  if (!dialog || typeof dialog.showModal !== 'function') return null;
  const open = () => {
    for (const other of document.querySelectorAll('dialog[open]')) {
      if (other !== dialog) other.close();
    }
    if (!dialog.open) dialog.showModal();
    onOpen?.();
  };
  for (const trigger of document.querySelectorAll(openSelector)) trigger.addEventListener('click', event => {
    event.preventDefault();
    open();
  });
  dialog.querySelector(closeSelector).addEventListener('click', () => dialog.close());
  let backdropPointer = false;
  dialog.addEventListener('pointerdown', event => { backdropPointer = event.target === dialog; });
  dialog.addEventListener('click', event => {
    if (event.target === dialog && backdropPointer) dialog.close();
    backdropPointer = false;
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !event.isComposing) {
      event.preventDefault();
      dialog.close();
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

const searchModal = bindDialog('#docs-search-dialog', '[data-open-search]', '[data-close-search]', () => {
  search.focus();
  search.select();
});
const navigationModal = bindDialog('#docs-navigation-dialog', '[data-open-navigation]', '[data-close-navigation]');
searchModal?.dialog.addEventListener('close', clearSearch);
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
