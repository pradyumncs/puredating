import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app';
import "firebase/storage";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDkNd9OXi3Ww4dpjqE2pRGHqB0Z3U41ZbI",
    authDomain: "trulyblack-f5627.firebaseapp.com",
    projectId: "trulyblack-f5627",
    storageBucket: "trulyblack-f5627.appspot.com",
    messagingSenderId: "394777516054",
    appId: "1:394777516054:web:671b55865a8aee117e7d37",
    measurementId: "G-ME7FWDTDKT"
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