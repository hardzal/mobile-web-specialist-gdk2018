const staticCacheName = 'restaurant-reviews-v23';

self.addEventListener('install', function(event) {
  // console.log("Service Worker installed");
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        './index.html',
        './restaurant.html',
        './service_worker.js',
        './favicon.ico',
        './manifest.json',
        './css/responsive_index.css',
        './css/responsive_restaurant.css',
        './css/styles.css',
        './img/1.webp',
        './img/2.webp',
        './img/3.webp',
        './img/4.webp',
        './img/5.webp',
        './img/6.webp',
        './img/7.webp',
        './img/8.webp',
        './img/9.webp',
        './img/10.webp',
        './img/marker-icon-2x-red.png',
        './img/marker-shadow.png',
        './js/idb.js',
        './js/dbhelper.js',
        './js/indexController.js',
        './js/bouncemarker.js',
        './js/main.js',
        './js/restaurant_info.js',
        'https://mws-restaurant-reviews.herokuapp.com:443/restaurants/',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
        'https://fonts.googleapis.com/css?family=Open+Sans:300,400',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        // 'https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN_r8OUuhp.woff',
        // 'https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVZ0b.woff2',
        './img/rr_icon-192.png',
        './img/rr_icon-512.png'
      ]);
    })
  );
  // console.log("cache successful");
});

// deletes old cache
self.addEventListener('activate', function(event) {
  // console.log("Service Worker activated");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-reviews-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
      // console.log("Old cache removed");
    })
  );
});

self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/mws-restaurant/') {
      event.respondWith(caches.match('/mws-restaurant/index.html'));
      return;
    }

    if (requestUrl.pathname === '/mws-restaurant/restaurant.html') {
      event.respondWith(caches.match('/mws-restaurant/restaurant.html'));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});