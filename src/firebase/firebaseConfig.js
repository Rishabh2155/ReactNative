import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd8Vf3DxVhEADfZPlACzkCMyazTUsgsGs",
  authDomain: "happy-e1f25.firebaseapp.com",
  projectId: "happy-e1f25",
  storageBucket: "happy-e1f25.firebasestorage.app",
  messagingSenderId: "784591941915",
  appId: "1:784591941915:web:71ce40ee4e0d969f5f63be",
  measurementId: "G-8EEXEZM80D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

const auth = getAuth(app);

export { auth,database };