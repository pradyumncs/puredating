import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app';
import "firebase/storage";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBDeSozXhJSQGP59BYt-7jGzeBdjQtRYbQ",
    authDomain: "africansocial-f5d0c.firebaseapp.com",
    projectId: "africansocial-f5d0c",
    storageBucket: "africansocial-f5d0c.appspot.com",
    messagingSenderId: "231123907234",
    appId: "1:231123907234:web:c896e9a79250b639b69dfb",
    measurementId: "G-ERC19ZRCDL"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const storage = getStorage(app);

//export { auth, db, storage, firebase };
export { auth, db, firebase, storage };