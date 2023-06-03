const convertedVapidKey = urlBase64ToUint8Array("dkjfhskcjdskfhdkj");

function urlBase64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	// eslint-disable-next-line
	const base64 = (base64String + padding)
		.replace(/\-/g, "+")
		.replace(/_/g, "/");

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

function sendSubscription(subscription) {
	return fetch(`/notifications/subscribe`, {
		method: "POST",
		body: JSON.stringify({
			subscription: subscription,
			title: "Notified by Precision Ordance",
			description: "someone buy a product",
			icon: "https://ichef.bbci.co.uk/news/976/cpsprodpb/9A50/production/_118740593_gettyimages-1231144196.jpg",
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
}
//conditional render
let clicked = true;

export function subscribeUser() {
	if (clicked) {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker.ready
				.then(function (registration) {
					if (!registration.pushManager) {
						console.log("Push manager unavailable.");
						return;
					}

					registration.pushManager
						.getSubscription()
						.then(function (existedSubscription) {
							if (existedSubscription === null) {
								console.log(
									"No subscription detected, make a request."
								);
								registration.pushManager
									.subscribe({
										applicationServerKey: convertedVapidKey,
										userVisibleOnly: true,
									})
									.then(function (newSubscription) {
										console.log(
											"New subscription added.",
											newSubscription
										);
										sendSubscription(newSubscription);
									})
									.catch(function (e) {
										if (
											Notification.permission !==
											"granted"
										) {
											console.log(
												"Permission was not granted."
											);
										} else {
											console.error(
												"An error ocurred during the subscription process.",
												e
											);
										}
									});
							} else {
								console.log("Existed subscription detected.");
								sendSubscription(existedSubscription);
							}
						});
				})
				.catch(function (e) {
					console.error(
						"An error ocurred during Service Worker registration.",
						e
					);
				});
		}
	} else {
		console.log("Can not reachable to the service worker");
	}
}
