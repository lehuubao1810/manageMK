import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFSx7pbP8zpnQvZw3XO3JjW0JBJQJVflU",
    authDomain: "photograph-6635f.firebaseapp.com",
    projectId: "photograph-6635f",
    storageBucket: "photograph-6635f.appspot.com",
    messagingSenderId: "902723865832",
    appId: "1:902723865832:web:324a9ff2ece79e01630d5d",
    measurementId: "G-QZMTNN0CQQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };