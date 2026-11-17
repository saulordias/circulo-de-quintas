/* Service worker do Círculo de Quintas: guarda o app no aparelho para abrir sem internet.
   Ao mudar qualquer arquivo do app, aumente a VERSION para os aparelhos baixarem a versão nova. */
const VERSION = "v4";
const CACHE = "cq-" + VERSION;
const ASSETS = [
  "./", "index.html", "manifest.webmanifest",
  "assets/fonts/fonts.css", "assets/fonts/dm-sans-400.woff2", "assets/fonts/sora-600.woff2", "assets/fonts/old-standard-tt-700.woff2",
  "assets/lib/webaudio-tinysynth.min.js",
  "licenses/index.html", "privacidade/index.html", "licenses/apache-2.0.txt", "licenses/sora-OFL.txt", "licenses/dm-sans-OFL.txt", "licenses/old-standard-tt-OFL.txt",
  "icons/favicon.svg", "icons/favicon-32.png", "icons/apple-touch-icon.png",
  "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-192.png", "icons/icon-maskable-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("cq-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => (req.mode === "navigate" ? caches.match("index.html") : Response.error()));
    })
  );
});
