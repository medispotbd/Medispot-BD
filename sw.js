
self.addEventListener("push", function (event) {
  let data = {
    title: "Medispot BD",
    body: "আপনার কাছে নতুন অর্ডার এসেছে!",
    url: "/Medispot-BD/"
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch (error) {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      data: {
        url: data.url || "/Medispot-BD/"
      }
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const targetUrl = new URL(
    event.notification.data?.url || "/Medispot-BD/",
    self.location.origin
  ).href;

  event.waitUntil(clients.openWindow(targetUrl));
});
