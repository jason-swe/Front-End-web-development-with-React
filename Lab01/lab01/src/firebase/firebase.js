import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDy88vAlIGk61-USNoZAZGPohZx6VwIdn8",
  authDomain: "fer202-93c72.firebaseapp.com",
  projectId: "fer202-93c72",
  storageBucket: "fer202-93c72.appspot.com",
  messagingSenderId: "1026600437526",
  appId: "1:1026600437526:web:cbf75eaae4002c3bd5f237",
  measurementId: "G-QMH4ECXQKG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); 