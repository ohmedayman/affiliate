const CACHE_NAME = 'milano-v5';
const urlsToCache = ['/','/auth.html','/dashboard.html','/admin.html','/go.html','/css/landing.css','/css/dashboard.css','/css/admin.css','/js/firebase-config.js','/js/auth.js','/js/dashboard.js','/js/admin.js','/js/products-data.js'];

self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(names => Promise.all(names.filter(n=>n!==CACHE_NAME).map(n=>caches.delete(n))))); self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/')))); });

self.addEventListener('push', e => {
  const data = e.data?.json() || {title:'ميلانو F16',body:'لديك إشعار جديد'};
  e.waitUntil(self.registration.showNotification(data.title, {body:data.body,icon:'https://assets.wuiltstore.com/cmksv9bcw0ki601gn64lf4joy_Gemini_Generated_Image_8x0fug8x0fug8x0f.webp',badge:'https://assets.wuiltstore.com/cmksv9bcw0ki601gn64lf4joy_Gemini_Generated_Image_8x0fug8x0fug8x0f.webp',vibrate:[200,100,200]}));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/dashboard.html'));
});
