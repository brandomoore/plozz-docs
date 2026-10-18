export async function freshness(source, request = fetch) {
  try {
    const response = await request('https://api.github.com/repos/brandomoore/Plozz/commits/main', {
      headers: { 'User-Agent': 'Plozz-Docs-Freshness', Accept: 'application/vnd.github+json' },
      cf: { cacheTtl: 300, cacheEverything: true },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
    const { sha } = await response.json();
    if (!/^[0-9a-f]{40}$/.test(sha)) throw new Error('Invalid GitHub revision');
    return Response.json({ status: sha === source.commit ? 'current' : 'behind', documentedCommit: source.commit, contentHash: source.contentHash, latestCommit: sha, verifiedAt: source.verifiedAt }, {
      headers: { 'Cache-Control': 'public, max-age=300' },
    });
  } catch (error) {
    console.error('Docs freshness check failed:', error.name, error.message);
    return Response.json({ status: 'unknown', documentedCommit: source.commit, verifiedAt: source.verifiedAt }, {
      status: 503, headers: { 'Cache-Control': 'no-store' },
    });
  }
}

export async function handleRequest(request, load = publishedAsset, check = freshness) {
  const url = new URL(request.url);
  let response;
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response = new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    } else if (url.pathname === '/freshness.json') {
      const source = await load('/_source.json');
      if (!source.ok) throw new Error(`Published source metadata returned HTTP ${source.status}`);
      const metadata = await source.json();
      if (!/^[a-f0-9]{40}$/.test(metadata.commit) || !/^[a-f0-9]{64}$/.test(metadata.contentHash) || !Number.isFinite(Date.parse(metadata.verifiedAt))) throw new Error('Invalid published source metadata');
      response = await check(metadata);
    } else {
      const supported = url.pathname === '/' || /^\/[a-z][a-z0-9-]{1,60}\/?$/.test(url.pathname) || assets.has(url.pathname);
      const upstream = await load(supported ? url.pathname : '/404.html', { method: request.method, version: url.searchParams.get('v') });
      const headers = new Headers(upstream.headers);
      const location = headers.get('Location');
      if (location) {
        const destination = new URL(location, new URL(`.${url.pathname}`, PAGES_ORIGIN));
        const origin = new URL(PAGES_ORIGIN);
        if (destination.origin !== origin.origin || !destination.pathname.startsWith(origin.pathname)) throw new Error('Unexpected documentation origin redirect');
        headers.set('Location', new URL(destination.pathname.slice(origin.pathname.length), `${url.origin}/`).href);
      }
      headers.set('Cache-Control', upstream.ok ? 'public, max-age=0, must-revalidate' : 'no-store');
      response = new Response(upstream.body, { status: supported ? upstream.status : 404, headers });
    }
  } catch (error) {
    console.error('Docs origin request failed:', error.name, error.message);
    response = url.pathname === '/freshness.json'
      ? Response.json({ status: 'unknown' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
      : new Response('Documentation is temporarily unavailable. Please try again shortly.', { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(securityHeaders)) headers.set(name, value);
  return new Response(request.method === 'HEAD' ? null : response.body, { status: response.status, headers });
}

export default { fetch: request => handleRequest(request) };
export const PAGES_ORIGIN = 'https://brandomoore.github.io/plozz-docs/';
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Content-Security-Policy': "default-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'",
  'X-Plozz-Docs-Origin': 'github-pages',
};
const assets = new Set(['/docs.css', '/docs.js', '/logo.svg', '/manrope.woff2', '/font-license.txt', '/_source.json', '/sitemap.xml', '/robots.txt', '/404.html', '/index.html']);

export async function publishedAsset(path, { method = 'GET', version } = {}, request = fetch) {
  const url = new URL(`.${path}`, PAGES_ORIGIN);
  if (!url.pathname.startsWith(new URL(PAGES_ORIGIN).pathname)) throw new Error('Invalid docs asset path');
  if (/^[a-f0-9]{40,64}$/.test(version ?? '')) url.searchParams.set('v', version);
  return request(url, { method, redirect: 'manual', signal: AbortSignal.timeout(15_000) });
}
