// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-7-starter';

// Once the service worker has been installed, feed it some initial URLs to cache
self.addEventListener('install', function (event) {
  /**
   * TODO - Part 2 Step 2
   * Create a function as outlined above
   */
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll([
          'https://introweb.tech/assets/json/ghostCookies.json',
          'https://introweb.tech/assets/json/birthdayCake.json',
          'https://introweb.tech/assets/json/chocolateChip.json',
          'https://introweb.tech/assets/json/stuffing.json',
          'https://introweb.tech/assets/json/turkey.json',
          'https://introweb.tech/assets/json/pumpkinPie.json'
        ]);
      })
  );
});

/**
 * Once the service worker 'activates', this makes it so clients loaded
 * in the same scope do not need to be reloaded before their fetches will
 * go through this service worker
 */
self.addEventListener('activate', function (event) {
  /**
   * TODO - Part 2 Step 3
   * Create a function as outlined above, it should be one line
   */
  // Want to check if client is loaded into the scope already (?)
  // console.log("Scope: ", event.currentTarget.registration.scope);
  // console.log("Activate: ", event);
  event.waitUntil(
    clients.claim()
  );
});

// Intercept fetch requests and store them in the cache
self.addEventListener('fetch', function (event) {
  /**
   * TODO - Part 2 Step 4
   * Create a function as outlined above
   */
  event.respondWith(
    caches.match(event.request)
      .then((res) => {
        if(res){
          return res;
        }else{
          return fetch(event.request).then((res) => {
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, res);
              });
          });
        }
      })
  );
});