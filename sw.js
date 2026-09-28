/* Mountain Dawn service worker — offline-first app shell, cache version 1. */
const CACHE = 'mountain-dawn-v8';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-192.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-64.png'
];
// Google Fonts are optional; the game falls back to system fonts offline.
const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(SHELL);
    // Fonts best-effort only — never block install.
    try { await cache.addAll(FONT_URLS); } catch (_) {}
    self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Cache-first for same-origin app shell and cached fonts; network for everything else.
  const isShell = url.origin === self.location.origin || FONT_URLS.includes(e.request.url);
  if (!isShell) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(e.request, { ignoreSearch: url.origin === 'https://fonts.googleapis.com' });
    if (hit) return hit;
    try {
      const res = await fetch(e.request);
      if (res && res.status === 200 && (url.origin === self.location.origin || FONT_URLS.includes(e.request.url))) {
        cache.put(e.request, res.clone());
      }
      return res;
    } catch (_) {
      const fallback = await cache.match('./index.html');
      if (fallback) return fallback;
      return new Response('Offline', { status: 503 });
    }
  })());
});