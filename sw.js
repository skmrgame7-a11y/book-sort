const CACHE='book-sort-v3-20261126';
const ROOT=new URL('./',self.location.href).href;
const FILES=['./','./index.html','./icon.png'];
self.addEventListener('install',event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(FILES.map(f=>new Request(new URL(f,ROOT),{cache:'reload'})));await self.skipWaiting()})())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('book-sort-')&&key!==CACHE)await caches.delete(key);await self.clients.claim()})())});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||!req.url.startsWith(ROOT))return;if(req.mode==='navigate'){event.respondWith((async()=>{try{const response=await fetch(req);if(response.ok)return response}catch(e){}const cache=await caches.open(CACHE);return await cache.match(new URL('index.html',ROOT).href)||Response.error()})());return}if(FILES.some(f=>new URL(f,ROOT).href===req.url))event.respondWith((async()=>{const cache=await caches.open(CACHE);return await cache.match(req)||fetch(req)})())});
