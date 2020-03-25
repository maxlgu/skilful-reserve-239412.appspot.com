self.addEventListener('paymentrequest', (evt) => {
  evt.respondWith(new Promise((resolve) => {
    evt.openWindow('non-existent-page');
  }));
});
