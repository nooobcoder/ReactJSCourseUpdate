// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5GB1ONo0cr4qAqZ9heNlaCLz6YWm2ZlM",
  authDomain: "firestore-react-tut.firebaseapp.com",
  projectId: "firestore-react-tut",
  storageBucket: "firestore-react-tut.appspot.com",
  messagingSenderId: "729522566387",
  appId: "1:729522566387:web:c5c73bcddefcaab175b386",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
