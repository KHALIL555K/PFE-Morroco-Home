// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCz4cazs6PZLoAykcRxMZhlBzp4H_9OQ9g",
    authDomain: "morroco-home.firebaseapp.com",
    projectId: "morroco-home",
    storageBucket: "morroco-home.firebasestorage.app",
    messagingSenderId: "446643951535",
    appId: "1:446643951535:web:32dc81a0fe6dbaa0b0415a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);


export { auth, fireDB  };