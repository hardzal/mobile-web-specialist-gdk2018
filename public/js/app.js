if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
    .then(reg => console.log('Service Worker registered at ', reg.scope))
    .catch(error => console.log('Registration failed: ', error))
} else {
    console.log('Service-Worker not supported in this browser');
}