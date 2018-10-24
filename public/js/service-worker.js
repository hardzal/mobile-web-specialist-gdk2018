(function() {
    'use strict';
    const version = "0.1.1";
    const staticCacheName = "startmws-${version}";
    self.addEventListener('install', e => {
        e.waitUntil(
            caches.open(staticCacheName).then(cache => {
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/pages/404.html',
                    '/css/style.css',
                    '/images/logo/Icon-48.png',
                    '/images/logo/Icon-72.png',
                    '/images/logo/Icon-96.png',
                    '/images/logo/Icon-144.png',
                    '/images/logo/Icon-192.png',
                    '/images/logo/Icon-512.png',
                    '/images/profile.jpg'
                ])
                .then(() => self.skipWaiting());
            })
        );
    });

    self.addEventListener('fetch', function(event) {
        console.log('Fetch event for ', event.request.url);

        event.respondWith(
            caches.match(event.request).then(function(response) {
                if(response) {
                    console.log('Found', event.request.url, ' in cache');
                    return response;
                }

                console.log('Network request for ', event.request.url);
                return fetch(event.request).then(function(response) {

                    if(response.status == 404) {
                        return caches.match('/pages/404.html');
                    }
                    return caches.open(staticCacheName).then(function (cache) {

                        if(event.request.url.indexOf('test') < 0) {
                            cache.put(event.request.url, response.clone());
                        }
                        return response;
                    });
                });
            }).catch(function (error) {
                console.log('Error', error);
                return caches.match('pages/offline.html');
            })
        );
    });

    self.addEventListener('activate', function(event) {
        console.log("Activating new service worker...");

        var cacheWhitelist = [staticCacheName];

        event.waitUntil(
            caches.keys().then(function (cacheNames) {
                return Promise.all(
                    cacheNames.map(function (cacheName) {
                        if(cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        );
    });
})();