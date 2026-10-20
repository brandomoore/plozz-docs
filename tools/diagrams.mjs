export const diagrams = {
  'apple-tv-profiles': {
    layout: 'pairs',
    title: 'A remembered profile for each Apple TV user',
    context: 'With Automatically Sign In enabled',
    pairs: [
      { from: 'Apple TV user 1', to: 'Plozz profile A' },
      { from: 'Apple TV user 2', to: 'Plozz profile B' },
    ],
    shared: 'Shared on this Apple TV: server sign-ins and the Plozz profile list.',
    caption: 'Example selections, not a permanent assignment. Choosing another Plozz profile changes the remembered selection.',
    sources: ['Sources/AppShell/SystemProfileBridge.swift', 'Sources/AppRuntime/AutomaticSignInStore.swift'],
  },
  'combined-libraries': {
    layout: 'merge',
    title: 'One view, separate sources',
    context: 'Enabled video libraries on Apple TV',
    inputs: ['Server A libraries', 'Server B libraries'],
    destination: 'All Libraries',
    detail: 'Movies and shows',
    caption: 'Browse together. Files, accounts, and access permissions stay with their original sources.',
    sources: ['Sources/CoreModels/AllLibrariesBrowse.swift', 'Sources/FeatureHome/AggregatedLibraryProvider.swift'],
  },
};

export function diagramFor(id) {
  if (!Object.hasOwn(diagrams, id)) throw new Error(`Unknown approved Plozz diagram: ${id}`);
  return diagrams[id];
}

export function diagramReferences(tokens) {
  return [...new Set(tokens.filter(token => token.type === 'fence' && token.info.trim() === 'plozz-diagram')
    .map(token => {
      const id = token.content.trim();
      diagramFor(id);
      return id;
    }))];
}

export function diagramText(id) {
  const diagram = diagramFor(id);
  return [diagram.title, diagram.context, ...(diagram.pairs ?? []).flatMap(pair => [pair.from, pair.to]),
    ...(diagram.inputs ?? []), diagram.destination, diagram.detail, diagram.shared, diagram.caption].filter(Boolean).join(' ');
}

export function renderDiagram(id, escape, icon) {
  const diagram = diagramFor(id);
  const node = (label, symbol) => `<div class="diagram-node">${icon(symbol)}<span>${escape(label)}</span></div>`;
  const arrow = `<span class="diagram-arrow" aria-hidden="true">${icon('arrow')}</span>`;
  const body = diagram.layout === 'pairs'
    ? `<ul class="diagram-pairs" role="list">${diagram.pairs.map(pair =>
      `<li>${node(pair.from, 'tv')}${arrow}${node(pair.to, 'accounts')}</li>`).join('')}</ul><p class="diagram-shared">${escape(diagram.shared)}</p>`
    : `<div class="diagram-merge"><ul class="diagram-inputs" role="list">${diagram.inputs.map(input =>
      `<li>${node(input, 'server')}</li>`).join('')}</ul>${arrow}<div class="diagram-destination">${icon('library')}<strong>${escape(diagram.destination)}</strong><span>${escape(diagram.detail)}</span></div></div>`;
  return `<figure class="guide-diagram" data-diagram="${escape(id)}"><div class="diagram-surface"><p class="diagram-title">${escape(diagram.title)}</p><p class="diagram-context">${escape(diagram.context)}</p>${body}</div><figcaption>${escape(diagram.caption)}</figcaption></figure>\n`;
}
