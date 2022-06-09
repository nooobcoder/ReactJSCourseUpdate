// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyB5DrC2FCtPhuFQ7kdxkt9TP0MBTq_Dwh0",
  authDomain: "fir-storage-react-6fc1b.firebaseapp.com",
  projectId: "fir-storage-react-6fc1b",
  storageBucket: "fir-storage-react-6fc1b.appspot.com",
  messagingSenderId: "348005102029",
  appId: "1:348005102029:web:7fa794cdf3ab020b801484"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
