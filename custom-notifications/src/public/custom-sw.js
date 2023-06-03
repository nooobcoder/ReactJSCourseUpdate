console.log("Service Worker Loaded");
self.addEventListener("push", (event) => {
	const data = event.data.json();
	console.log("New Notification ", data);

	event.waitUntil(
		self.registration.showNotification(data.title, {
			body: data.registration,
			icon: data.icon,
		})
	);
});
