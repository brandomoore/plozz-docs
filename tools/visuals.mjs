import { diagramReferences, renderDiagram } from './diagrams.mjs';

const symbols = {
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
  external: '<path d="M14 4h6v6m0-6L10 14M9 5H5v14h14v-4"/>',
  connect: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><path d="M10 6h5a3 3 0 0 1 3 3v5M6 10v5a3 3 0 0 0 3 3h5"/>',
  library: '<path d="m3 7 9-4 9 4-9 4-9-4Zm0 5 9 4 9-4M3 17l9 4 9-4"/>',
  playback: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z"/>',
  personalize: '<path d="M4 7h5m4 0h7M4 17h9m4 0h3"/><circle cx="11" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>',
  accounts: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v2"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4.1 1.9c-1.1.8-1.6 1.1-1.6 2.6M12 17h.01"/>',
  tv: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
  tablet: '<rect x="3" y="2" width="18" height="20" rx="2"/><path d="M11 18h2"/>',
  server: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6"/>',
  note: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
  tip: '<path d="M9 18h6m-5 3h4M9 15c0-2-3-3-3-6a6 6 0 0 1 12 0c0 3-3 4-3 6Z"/>',
  warning: '<path d="m12 3 10 18H2L12 3ZM12 9v5m0 3h.01"/>',
};
export const platformIcons = { 'Apple TV': 'tv', iPhone: 'phone', iPad: 'tablet' };

export function uiIcon(name) {
  if (!Object.hasOwn(symbols, name)) throw new Error(`Unknown UI icon: ${name}`);
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${symbols[name]}</svg>`;
}

// Simple Icons 13.21.0, CC0. Sources and trademark guidance are in README.md.
const brandPaths = {
  discord: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z',
  github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
};

export function brandForLink(href) {
  if (!URL.canParse(href)) return null;
  const url = new URL(href);
  if (url.username || url.password) return null;
  if (url.origin === 'https://github.com') return 'github';
  if (url.origin === 'https://plozz.app' && /^\/discord\/?$/.test(url.pathname) && !url.search) return 'discord';
  return null;
}

export function brandIcon(brand) {
  if (!Object.hasOwn(brandPaths, brand)) throw new Error(`Unknown brand icon: ${brand}`);
  return `<svg class="brand-icon" data-brand="${brand}" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false"><path d="${brandPaths[brand]}"/></svg>`;
}

function namedLinkBrand(tokens, index) {
  const brand = brandForLink(tokens[index].attrGet('href'));
  const end = tokens.findIndex((token, position) => position > index && token.type === 'link_close');
  const label = tokens.slice(index + 1, end).map(token => token.content).join('');
  return brand && new RegExp(`\\b${brand}\\b`, 'i').test(label) ? brand : null;
}

export function installVisuals(markdown) {
  const renderToken = (tokens, index, options, _env, renderer) => renderer.renderToken(tokens, index, options);
  const renderItem = markdown.renderer.rules.list_item_open ?? renderToken;
  const renderQuote = markdown.renderer.rules.blockquote_open ?? renderToken;
  const renderFence = markdown.renderer.rules.fence;
  markdown.renderer.rules.list_item_open = (tokens, index, options, env, renderer) =>
    renderItem(tokens, index, options, env, renderer) + (tokens[index].meta?.stepNumber !== undefined
      ? `<span class="step-number" aria-hidden="true">${tokens[index].meta.stepNumber}</span>` : '');
  markdown.renderer.rules.blockquote_open = (tokens, index, options, env, renderer) => {
    const kind = tokens[index].meta?.callout;
    return renderQuote(tokens, index, options, env, renderer) + (kind
      ? `<p class="callout-label">${uiIcon(kind === 'important' ? 'note' : kind)}<strong>${kind[0].toUpperCase() + kind.slice(1)}</strong></p>\n` : '');
  };
  markdown.renderer.rules.fence = (tokens, index, options, env, renderer) => tokens[index].info.trim() === 'plozz-diagram'
    ? renderDiagram(tokens[index].content.trim(), markdown.utils.escapeHtml, uiIcon)
    : renderFence(tokens, index, options, env, renderer);
  markdown.core.ruler.after('inline', 'guide-components', state => {
    diagramReferences(state.tokens);
    for (let index = 0; index < state.tokens.length; index++) {
      const token = state.tokens[index];
      if (token.type === 'ordered_list_open' && token.level === 0) {
        token.attrJoin('class', 'procedure');
        token.attrSet('role', 'list');
        let number = Number(token.attrGet('start') ?? 1);
        for (let next = index + 1; next < state.tokens.length; next++) {
          const child = state.tokens[next];
          if (child.type === 'ordered_list_close' && child.level === token.level) break;
          if (child.type === 'list_item_open' && child.level === token.level + 1) child.meta = { ...child.meta, stepNumber: number++ };
        }
      }
      if (token.type === 'inline') {
        for (let child = 0; child < token.children.length; child++) {
          if (token.children[child].type === 'strong_open' && token.children[child + 1]?.type === 'text'
            && /^Settings > \S/.test(token.children[child + 1].content) && token.children[child + 2]?.type === 'strong_close') {
            token.children[child].attrJoin('class', 'settings-path');
          }
        }
      }
      const inline = state.tokens[index + 2];
      if (token.type !== 'blockquote_open' || state.tokens[index + 1]?.type !== 'paragraph_open' || inline?.type !== 'inline') continue;
      const marker = inline.content.match(/^\[!([A-Z]+)\][ \t]*(?:\n|$)/i);
      if (!marker) continue;
      const kind = marker[1].toLowerCase();
      if (!['note', 'tip', 'important', 'warning'].includes(kind)) throw new Error(`Unknown guide callout: ${marker[1]}`);
      const end = state.tokens.findIndex((candidate, position) => position > index && candidate.type === 'blockquote_close' && candidate.level === token.level);
      if (!state.tokens.slice(index + 2, end).some(candidate => candidate.type === 'inline' && candidate.content.replace(marker[0], '').trim())) {
        throw new Error(`Empty guide callout: ${marker[1]}`);
      }
      token.tag = 'aside';
      token.attrSet('class', `doc-callout callout-${kind}`);
      token.attrSet('role', 'note');
      token.meta = { ...token.meta, callout: kind };
      state.tokens[end].tag = 'aside';
      inline.content = inline.content.slice(marker[0].length);
      if (inline.content) inline.children.splice(0, 2);
      else state.tokens.splice(index + 1, 3);
    }
  });
  const renderLink = markdown.renderer.rules.link_open ?? ((tokens, index, options, _env, renderer) => renderer.renderToken(tokens, index, options));
  markdown.renderer.rules.link_open = (tokens, index, options, env, renderer) => {
    const brand = namedLinkBrand(tokens, index);
    return renderLink(tokens, index, options, env, renderer) + (brand ? brandIcon(brand) : '');
  };
  markdown.core.ruler.after('inline', 'service-options', state => {
    for (let index = 0; index < state.tokens.length; index++) {
      const list = state.tokens[index];
      if (list.type !== 'bullet_list_open' || list.level !== 0) continue;
      const end = state.tokens.findIndex((token, position) => position > index && token.type === 'bullet_list_close' && token.level === list.level);
      const members = state.tokens.slice(index + 1, end);
      const items = members.flatMap((token, position) => token.type === 'list_item_open' && token.level === 1 ? [position] : []);
      if (items.length < 2 || items.length > 3 || members.some(token => ['bullet_list_open', 'ordered_list_open'].includes(token.type))) continue;
      const brands = items.map(position => {
        const children = members[position + 2]?.children ?? [];
        // A bold, leading service link introduces an option; ordinary lists stay lists.
        const first = children.findIndex(token => token.type !== 'text' || token.content.trim());
        if (children[first]?.type !== 'strong_open' || children[first + 1]?.type !== 'link_open') return null;
        return namedLinkBrand(children, first + 1);
      });
      if (brands.every(Boolean) && new Set(brands).size === brands.length) {
        list.attrSet('class', 'service-options');
        list.attrSet('role', 'list');
      }
    }
  });
}
