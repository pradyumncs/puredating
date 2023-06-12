import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app';
import "firebase/storage";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBNZ_ZxpMy9C0EJH5_lrEAeoDOP-vTdMoU",
    authDomain: "social-love-dedbe.firebaseapp.com",
    projectId: "social-love-dedbe",
    storageBucket: "social-love-dedbe.appspot.com",
    messagingSenderId: "476163531178",
    appId: "1:476163531178:web:5c9b4f511fec0308830bd3",
    measurementId: "G-DFWE6P31RJ"
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