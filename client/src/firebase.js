import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDLVnPbAHUoocT5d5xNyB5uRm2lNKEnRuw",
    authDomain: "litcritique-a8ac9.firebaseapp.com",
    projectId: "litcritique-a8ac9",
    storageBucket: "litcritique-a8ac9.firebasestorage.app",
    messagingSenderId: "987609676210",
    appId: "1:987609676210:web:74ba97dd90858ad9170cab",
    measurementId: "G-1D59GH9PEC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };