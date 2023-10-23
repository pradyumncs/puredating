import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app';
import "firebase/storage";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBRj_OJy3ZlTQtz5BhXXf8XwRAyEjjdpR4",
    authDomain: "ethiopiansocial-5e067.firebaseapp.com",
    projectId: "ethiopiansocial-5e067",
    storageBucket: "ethiopiansocial-5e067.appspot.com",
    messagingSenderId: "609023991162",
    appId: "1:609023991162:web:2adf33cd8697f9747e8ac3",
    measurementId: "G-E27XMBF95N"
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