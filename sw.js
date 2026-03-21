// Service Worker - Painel Financeiro PWA
const CACHE_NAME = 'painel-financeiro-v1';
const STATIC_CACHE = 'static-v1';

// Recursos para cache offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
];

// Instalação: pré-cacheia os recursos essenciais
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Cacheando recursos essenciais');
      // Cache com tolerância a falhas para recursos externos
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(url =>
          cache.add(url).catch(err => {
            console.warn('[SW] Não foi possível cachear:', url, err);
          })
        )
      );
    }).then(() => {
      console.log('[SW] Instalação concluída');
      return self.skipWaiting();
    })
  );
});

// Ativação: remove caches antigos
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME && name !== STATIC_CACHE)
          .map(name => {
            console.log('[SW] Removendo cache antigo:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[SW] Ativação concluída');
      return self.clients.claim();
    })
  );
});

// Fetch: estratégia Cache First com fallback para rede
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora requisições não-GET
  if (request.method !== 'GET') return;

  // Estratégia: Network First para navegação, Cache First para assets
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Atualiza cache com versão mais recente
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Offline: retorna página cacheada
          return caches.match('./index.html') || caches.match('./');
        })
    );
    return;
  }

  // Cache First para todos os outros recursos
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Atualiza cache em background (stale-while-revalidate)
        const fetchPromise = fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, networkResponse.clone());
            });
          }
          return networkResponse;
        }).catch(() => {});
        
        return cachedResponse;
      }

      // Não está no cache: busca na rede e armazena
      return fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseToCache);
        });

        return response;
      }).catch(err => {
        console.warn('[SW] Falha ao buscar:', request.url, err);
        // Retorna resposta offline genérica para imagens
        if (request.destination === 'image') {
          return new Response(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💰</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        }
      });
    })
  );
});

// Sincronização em background (quando voltar online)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    console.log('[SW] Sincronizando dados...');
  }
});

// Notificações push (para alertas futuros)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: './icon-192.png',
      badge: './icon-72.png',
      vibrate: [100, 50, 100],
      data: { url: data.url || './' }
    };
    event.waitUntil(
      self.registration.showNotification(data.title || 'Painel Financeiro', options)
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || './')
  );
});

console.log('[SW] Service Worker carregado - Painel Financeiro PWA');
