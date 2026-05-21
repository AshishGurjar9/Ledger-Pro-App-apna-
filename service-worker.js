// const CACHE_NAME = 'ledger-pro-v4';
const CACHE_NAME =
'ledger-pro-v5';
const urlsToCache = [
  './',
  './index.html',
  './icon.png',
  './icon1.png',
  './manifest.json',
  './service-worker.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     fetch(event.request)
//       .then(networkResponse => {
//         if (networkResponse && networkResponse.ok) {
//           const responseClone = networkResponse.clone();
//           caches.open(CACHE_NAME).then(cache => {
//             cache.put(event.request, responseClone);
//           });
//           return networkResponse;
//         }
//         return caches.match(event.request);
//       })
//       .catch(() => caches.match(event.request))
//   );
// });

self.addEventListener(
'fetch',
event => {

event.respondWith(

fetch(event.request)

.then(response => {

if(
!response ||
response.status !== 200 ||
response.type !== 'basic'
){

return response;

}

const clone =
response.clone();

caches.open(
CACHE_NAME
)

.then(cache => {

cache.put(
event.request,
clone
);

});

return response;

})

.catch(() => {

return caches.match(
event.request
);

})

);

});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});