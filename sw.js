/* Service worker do Círculo de Quintas: guarda o app no aparelho para abrir sem internet.
   Ao mudar qualquer arquivo do app, aumente a VERSION para os aparelhos baixarem a versão nova. */
const VERSION = "v10";
const CACHE = "cq-" + VERSION;
const ASSETS = [
  "./", "index.html", "manifest.webmanifest",
  "assets/fonts/fonts.css", "assets/fonts/dm-sans-400.woff2", "assets/fonts/sora-600.woff2", "assets/fonts/old-standard-tt-700.woff2",
  "assets/lib/webaudio-tinysynth.min.js",
  "licenses/index.html", "privacidade/index.html", "licenses/apache-2.0.txt", "licenses/sora-OFL.txt", "licenses/dm-sans-OFL.txt", "licenses/old-standard-tt-OFL.txt",
  "icons/favicon.svg", "icons/favicon-32.png", "icons/apple-touch-icon.png",
  "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-192.png", "icons/icon-maskable-512.png"
];

/* Ao instalar, baixa cada arquivo ignorando o cache do navegador (cache: "reload"). Sem isso, o GitHub Pages
   pode entregar uma cópia antiga que ainda está em cache por alguns minutos, e o app "atualiza" para a versão velha. */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(ASSETS.map((a) =>
        fetch(new Request(a, { cache: "reload" })).then((r) => { if (!r.ok) throw new Error("falhou: " + a); return c.put(a, r); })
      )))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("cq-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Páginas (index.html e as páginas de licenças e privacidade): tenta a internet primeiro, para sempre mostrar a
   versão mais nova, e usa a cópia guardada se estiver sem internet ou se a rede demorar mais de 3,5 s. */
async function networkFirst(req) {
  try {
    const res = await Promise.race([
      fetch(req, { cache: "no-cache" }),
      new Promise((_, rej) => setTimeout(() => rej(new Error("lento")), 3500))
    ]);
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; }
  } catch (err) { /* sem internet ou lento: usa a cópia */ }
  return (await caches.match(req, { ignoreSearch: true })) || (await caches.match("index.html")) || Response.error();
}

/* Fontes, biblioteca de som e ícones: usa a cópia guardada, que só muda quando a VERSION muda. */
async function cacheFirst(req) {
  const hit = await caches.match(req, { ignoreSearch: true });
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return res;
  } catch (err) { return Response.error(); }
}

self.addEventListener("fetch", (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  const isPage = req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith(".html");
  e.respondWith(isPage ? networkFirst(req) : cacheFirst(req));
});
