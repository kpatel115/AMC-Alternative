import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB48enhtYoLv52HxEN5bppg7RGrbZ-RfeQ",
  authDomain: "movies-52b12.firebaseapp.com",
  projectId: "movies-52b12",
  storageBucket: "movies-52b12.appspot.com",
  messagingSenderId: "913331968238",
  appId: "1:913331968238:web:0f4abaa852913b1d867bff"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();



