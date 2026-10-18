const search = document.querySelector('#guide-search');
const links = [...document.querySelectorAll('.nav-shell nav a')];
const groups = [...document.querySelectorAll('.nav-group')];
const results = document.querySelector('#search-results');
const searchStatus = document.querySelector('#search-status');
const navigation = document.querySelector('.nav-shell');
const compact = matchMedia('(max-width: 760px)');
navigation.open = !compact.matches;
compact.addEventListener('change', () => { navigation.open = !compact.matches; });
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

search?.addEventListener('input', async () => {
  const generation = ++searchGeneration;
  const query = search.value.trim();
  results.replaceChildren();
  results.hidden = !query;
  searchStatus.hidden = !query;
  for (const link of links) link.hidden = false;
  for (const group of groups) group.hidden = false;
  if (!query) return;
  searchStatus.textContent = 'Searching guides and settings…';
  try {
    const entries = await loadIndex();
    if (generation !== searchGeneration) return;
    const matches = rankPages(entries, query);
    for (const item of matches.slice(0, 12)) {
      const li = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.href = item.path;
      anchor.textContent = item.title;
      const excerpt = document.createElement('p');
      excerpt.textContent = item.snippet;
      li.append(anchor, excerpt);
      results.append(li);
    }
    searchStatus.textContent = matches.length > 12
      ? `Showing 12 of ${matches.length} matches. Refine your search for fewer results.`
      : matches.length ? `${matches.length} matching ${matches.length === 1 ? 'guide' : 'guides'}.` : 'No matching guide. Try a feature, setting or symptom.';
  } catch {
    if (generation !== searchGeneration) return;
    results.hidden = true;
    const terms = normalize(query).split(/\s+/);
    for (const link of links) link.hidden = !terms.every(term => normalize(link.dataset.title).includes(term));
    for (const group of groups) { group.hidden = ![...group.querySelectorAll('a')].some(link => !link.hidden); group.open = true; }
    searchStatus.textContent = 'Full-text search is unavailable or updating. Showing title matches; reload to try again.';
  }
});
