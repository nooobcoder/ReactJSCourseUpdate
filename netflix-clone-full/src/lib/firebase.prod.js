import Firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
// import { seedDatabase } from "../seed";

// We need to somehow seed the database
const config = {
  apiKey: "AIzaSyD2J1XoVCbh2_GSuZHJdXUvEan6KwWGR9E",
  authDomain: "netflix-clone-full-79fe3.firebaseapp.com",
  projectId: "netflix-clone-full-79fe3",
  storageBucket: "netflix-clone-full-79fe3.appspot.com",
  messagingSenderId: "934970297271",
  appId: "1:934970297271:web:4bc2d7aed96bd6e6807632",
};

const firebase = Firebase.initializeApp(config);

// !WARN: Seed the database only when it is empty, for first time set-up.
// seedDatabase(firebase);
export { firebase as firebaseConnection };
