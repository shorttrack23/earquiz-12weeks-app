const CACHE = "aeq-v3.7.0";
const ASSETS = ["./","./index.html","./manifest.json","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(()=> self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=> self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.mode === "navigate") { e.respondWith(caches.match("./index.html").then(r=>r||fetch(e.request))); return; }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});