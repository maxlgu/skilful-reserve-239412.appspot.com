self.addEventListener('paymentrequest', (evt) => {
  evt.respondWith(new Promise((resolve) => {
    evt.openWindow('confirm.html');
  }));
});

self.addEventListener('paymentabort', (evt) => {
  evt.respondWith(true);
});
