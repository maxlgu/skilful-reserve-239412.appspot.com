self.addEventListener('paymentrequest', (evt) => {
  evt.respondWith(new Promise((resolve) => {
    evt.openWindow('confirm.html');
  }));
});

self.addEventListener('canmakepayment', function(evt) {
  evt.respondWith(true);
});
