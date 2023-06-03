import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `AIzaSyD-ygTWdWGreOf22OjTlGO2PN6lB6L8arY`,
  authDomain: `netflix-clone-nextjs-70c29.firebaseapp.com`,
  projectId: `netflix-clone-nextjs-70c29`,
  storageBucket: `netflix-clone-nextjs-70c29.appspot.com`,
  messagingSenderId: `427470003319`,
  appId: `1:427470003319:web:d510eee13de96d8bcf7a72`,
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
