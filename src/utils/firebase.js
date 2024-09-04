// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvcVs2awspwCi66WsnHg6agJaqg2-Jxy4",
  authDomain: "cra-netflix-clone.firebaseapp.com",
  projectId: "cra-netflix-clone",
  storageBucket: "cra-netflix-clone.appspot.com",
  messagingSenderId: "166759968669",
  appId: "1:166759968669:web:58a2ea675af68bcbacc974",
  measurementId: "G-LSQ4JM8XRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();