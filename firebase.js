import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app';
import "firebase/storage";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAIL15hT3MUGaoL5VHHl9PIzO91S36oz2c",
    authDomain: "bella-e93f4.firebaseapp.com",
    projectId: "bella-e93f4",
    storageBucket: "bella-e93f4.appspot.com",
    messagingSenderId: "519900212025",
    appId: "1:519900212025:web:486aa55bd5862d197096e8",
    measurementId: "G-DM5P4E8PCZ"
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