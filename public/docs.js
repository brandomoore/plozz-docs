const search = document.querySelector('#guide-search');
const links = [...document.querySelectorAll('nav a')];
search?.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();
  for (const link of links) link.hidden = !link.dataset.title.includes(query);
  document.querySelector('#no-guides').hidden = links.some(link => !link.hidden);
});
const navigation = document.querySelector('.nav-shell');
const compact = matchMedia('(max-width: 760px)');
navigation.open = !compact.matches;
compact.addEventListener('change', () => { navigation.open = !compact.matches; });
const status = document.querySelector('#freshness');
fetch('/freshness.json').then(async response => {
  const result = await response.json();
  if (!response.ok || !['current', 'behind'].includes(result.status)) throw new Error('Source check unavailable');
  if (result.documentedCommit !== status.dataset.sourceCommit || result.contentHash !== status.dataset.contentHash) {
    status.className = 'unknown';
    status.textContent = 'Freshness data is updating. The source revision and check date above apply to this page.';
    return;
  }
  if (result.status === 'behind') {
    status.className = 'stale';
    status.textContent = 'App code has changed since this check. Some details may lag until the next daily docs update; your installed beta may differ too.';
  } else {
    status.textContent = 'Matches the latest app main revision checked by this service. Your installed beta may differ.';
  }
}).catch(() => {
  status.className = 'unknown';
  status.textContent = 'Live freshness check unavailable. Use the source revision and check date above; your installed beta may differ.';
});
