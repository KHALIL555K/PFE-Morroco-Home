// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABIcDOPfCT16GdsnXvjm2EVfcJUQZSrW4",
    authDomain: "home-service-99c6e.firebaseapp.com",
    projectId: "home-service-99c6e",
    storageBucket: "home-service-99c6e.firebasestorage.app",
    messagingSenderId: "885118755482",
    appId: "1:885118755482:web:91a28ba7745cf09d683523"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);


export { auth, fireDB };