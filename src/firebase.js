// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB27aMT4QEpP8AhfuPLcrv7KOgWgKS8I7E",
  authDomain: "spellbound-be758.firebaseapp.com",
  projectId: "spellbound-be758",
  storageBucket: "spellbound-be758.appspot.com",
  messagingSenderId: "692760090169",
  appId: "1:692760090169:web:f81321efe6a0b66088dfe8",
  measurementId: "G-BW27VDMB98",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
