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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/freshness.json') {
      if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
      const source = await env.ASSETS.fetch(new URL('/_source.json', url));
      if (!source.ok) return Response.json({ status: 'unknown' }, { status: 503 });
      const result = await freshness(await source.json());
      return request.method === 'HEAD' ? new Response(null, result) : result;
    }
    return env.ASSETS.fetch(request);
  },
};
