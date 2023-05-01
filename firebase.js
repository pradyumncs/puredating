import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app';
import "firebase/storage";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDoSGChtYE9qJ30HNHNAoqh1lKZKKWDTuc",
    authDomain: "wealthy-6396b.firebaseapp.com",
    projectId: "wealthy-6396b",
    storageBucket: "wealthy-6396b.appspot.com",
    messagingSenderId: "958579982506",
    appId: "1:958579982506:web:e6fd6f93d03054820990d3",
    measurementId: "G-9TE8HQE3TK"
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