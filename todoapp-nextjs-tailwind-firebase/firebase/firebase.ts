import { initializeApp } from "firebase/app";

const credentials = {
	apiKey: "AIzaSyDB25d42L9OT_-2BjFwRVCypGpbZIkO8Ww",
	authDomain: "todoapp-nextjs-tailwind.firebaseapp.com",
	projectId: "todoapp-nextjs-tailwind",
	storageBucket: "todoapp-nextjs-tailwind.appspot.com",
	messagingSenderId: "934380714924",
	appId: "1:934380714924:web:9aac865873fa0f1200d809",
};

const firebase = initializeApp(credentials);

export default firebase;
