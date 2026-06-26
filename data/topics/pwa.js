export const pwaContent = {
  slug: "pwa",
  briefDescription: [
    "Progressive Web Apps (PWAs) are web applications that use modern browser APIs to provide app-like experiences: they can be installed on the home screen, work offline, send push notifications, and load instantly. A PWA requires three things: 1) a Web App Manifest (manifest.json) that describes the app's name, icons, and display mode, 2) a Service Worker (a JavaScript file that acts as a programmable network proxy), and 3) served over HTTPS (required for service workers in production). PWAs bridge the gap between web and native apps without needing an app store.",
    "Service Workers are the heart of PWAs. They run in a background thread, separate from the main page — they have no access to the DOM. The lifecycle: install (runs once when the SW is first registered — cache static assets here), activate (runs after install — clean up old caches here), and fetch (intercepts every network request from the page). Caching strategies determine how the SW handles requests: Cache First (serve from cache, fall back to network — fastest), Network First (try network, fall back to cache — freshest), Stale-While-Revalidate (serve cache immediately, update cache in background — balance of speed and freshness).",
    "The Cache API lets service workers store request/response pairs for offline access. Workbox (by Google) is a library that makes service worker caching much easier — you define routes and caching strategies in a few lines instead of manually managing the Cache API. The Web App Manifest enables the 'Add to Home Screen' prompt on Android and the install button in Chrome/Edge on desktop. Push Notifications use the Push API and Notification API — the server sends messages to a push service (like Google FCM), which delivers them to the browser's service worker even when the app isn't open. Background Sync allows deferred actions (like submitting a form) to complete when connectivity is restored.",
  ],
  keyConcepts: [
    "PWA requires: manifest.json + service worker + HTTPS",
    "manifest.json: name, short_name, icons, start_url, display (standalone/fullscreen), theme_color",
    "Service Worker: background script — no DOM access; intercepts fetch, handles caching",
    "SW lifecycle: install (cache assets) → activate (clean old caches) → fetch (serve requests)",
    "Cache API: caches.open('v1') → cache.put(request, response) / cache.match(request)",
    "Cache First: serve cache → fall back to network (best for static assets: CSS, images)",
    "Network First: try network → fall back to cache (best for API data that changes often)",
    "Stale-While-Revalidate: serve cache + fetch in background to update (best balance)",
    "Workbox: Google library for service workers — precacheAndRoute, registerRoute, strategies",
    "installprompt event: capture and defer 'Add to Home Screen' prompt",
    "Push Notifications: Push API + Notification API — requires VAPID keys and user permission",
    "Background Sync: queue actions to retry when connectivity is restored",
  ],
  codeExample: {
    language: "javascript",
    title: "manifest.json, Service Worker with Cache Strategies, Workbox Setup",
    code: `// ── manifest.json (place in public/ folder) ──
// {
//   "name": "DevOnix Learning",
//   "short_name": "DevOnix",
//   "description": "Learn full-stack development",
//   "start_url": "/",
//   "display": "standalone",
//   "background_color": "#ffffff",
//   "theme_color": "#6366f1",
//   "icons": [
//     { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
//     { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
//   ]
// }

// ── index.html — link manifest + register SW ──
// <link rel="manifest" href="/manifest.json" />
// <meta name="theme-color" content="#6366f1" />
// <script>
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js')
//       .then(reg => console.log('SW registered:', reg.scope))
//       .catch(err => console.error('SW failed:', err))
//   }
// </script>

// ── sw.js — Service Worker (place in public/) ──
const CACHE_NAME = 'devonix-v1'
const STATIC_ASSETS = ['/', '/index.html', '/styles.css', '/app.js', '/offline.html']

// INSTALL: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching static assets')
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()  // activate immediately without waiting for old SW to die
})

// ACTIVATE: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  )
  self.clients.claim()  // take control of pages immediately
})

// FETCH: intercept network requests
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Cache First — for static assets
  if (url.pathname.match(/\\.(css|js|png|jpg|svg|woff2)$/)) {
    event.respondWith(
      caches.match(request).then(cached => cached ?? fetch(request))
    )
    return
  }

  // Network First — for API calls
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
          return response
        })
        .catch(() => caches.match(request))  // fall back to cache if offline
    )
    return
  }

  // Stale-While-Revalidate — for HTML pages
  event.respondWith(
    caches.match(request).then(cached => {
      const fetchPromise = fetch(request).then(response => {
        caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()))
        return response
      })
      return cached ?? fetchPromise  // return cache immediately, update in background
    })
  )
})

// ── Workbox alternative (much simpler) ──
// workbox-config.js
// module.exports = {
//   globDirectory: 'dist/',
//   globPatterns: ['**/*.{html,css,js,png,svg}'],
//   swDest: 'dist/sw.js',
//   runtimeCaching: [
//     { urlPattern: /^\\/api\\//, handler: 'NetworkFirst' },
//     { urlPattern: /\\.(png|jpg|svg)$/, handler: 'CacheFirst',
//       options: { cacheName: 'images', expiration: { maxEntries: 60 } } }
//   ]
// }`,
  },
}
