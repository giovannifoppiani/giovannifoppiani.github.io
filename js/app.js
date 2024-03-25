//collego il service worker e controllo se è registrato
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('service worker registrato', reg))
    .catch(err => console.log('service worker non registato', err));
}
