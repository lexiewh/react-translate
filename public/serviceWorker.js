/* eslint-disable no-restricted-globals */
let CACHE_NAME = 'translate-cache'
const urls_to_cache = [
    '/',
    '/index.html'
]

self.addEventListener('install', (event) => {
    // perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('opened cache')
            return cache.addAll(urls_to_cache)
        })
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request)).then((response) => {
        if (response) {
            return response
        }
        return fetch(event.request)
    })
})