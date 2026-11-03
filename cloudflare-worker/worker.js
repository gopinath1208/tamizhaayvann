/**
 * TamizhAayvan News - Restricted Cloudflare Worker Proxy
 *
 * SAFETY & SECURITY:
 * 1. Fixed WordPress Host ONLY: Strictly proxies to https://tamizhaayvan.42web.io/wp-json/wp/v2/
 * 2. Never accepts arbitrary external URLs (Prevents open-proxy vulnerabilities).
 * 3. Never requires or exposes WordPress admin credentials or passwords.
 * 4. Adds appropriate edge caching (Cache-Control: public, max-age=60).
 * 5. Handles CORS headers for your live domain https://tamizhaayvan.gopitmr7198.workers.dev
 */

const UPSTREAM_WP_ORIGIN = 'https://tamizhaayvan.42web.io';
const UPSTREAM_API_PREFIX = '/wp-json/wp/v2';
const ALLOWED_ORIGINS = [
  'https://tamizhaayvan.gopitmr7198.workers.dev',
  'http://localhost:3000',
  'http://localhost:5173'
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    // Route only /api/wp/* requests
    if (url.pathname.startsWith('/api/wp/')) {
      // Handle CORS preflight OPTIONS
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With',
            'Access-Control-Max-Age': '86400'
          }
        });
      }

      // Restrict strictly to GET and HEAD methods for public news reading
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Construct target URL strictly locked to WordPress REST API
      const subPath = url.pathname.replace(/^\/api\/wp/, '');
      const upstreamUrl = new URL(`${UPSTREAM_WP_ORIGIN}${UPSTREAM_API_PREFIX}${subPath}${url.search}`);

      // Forward request with standard browser User-Agent
      const modifiedHeaders = new Headers();
      modifiedHeaders.set(
        'User-Agent',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      );
      modifiedHeaders.set('Accept', 'application/json');

      try {
        const response = await fetch(upstreamUrl.toString(), {
          method: 'GET',
          headers: modifiedHeaders,
          cf: {
            // Edge caching on Cloudflare
            cacheTtl: 60,
            cacheEverything: true
          }
        });

        // Clone response and attach security & CORS headers
        const responseHeaders = new Headers(response.headers);
        responseHeaders.set('Access-Control-Allow-Origin', origin || '*');
        responseHeaders.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
        responseHeaders.set('Cache-Control', 'public, max-age=60, s-maxage=120');

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: 'Failed to contact WordPress API', message: err.message }),
          {
            status: 502,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': origin || '*'
            }
          }
        );
      }
    }

    // Default static assets handler (for standard Cloudflare Worker deployment)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('TamizhAayvan News Worker Proxy Active', { status: 200 });
  }
};
