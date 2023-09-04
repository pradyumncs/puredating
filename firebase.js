import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app';
import "firebase/storage";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDOVjoPmsdabIRIZx8aHhn__JQYvM-IieU",
    authDomain: "fire-e6439.firebaseapp.com",
    projectId: "fire-e6439",
    storageBucket: "fire-e6439.appspot.com",
    messagingSenderId: "886937434651",
    appId: "1:886937434651:web:7875b634b348819cb216be",
    measurementId: "G-RKBCCTET5Y"
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