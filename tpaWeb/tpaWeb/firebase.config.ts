// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoFMR3uWfHanOaxu4sCPUCsC-VY0xFX1k",
    authDomain: "linkhedin-fbdf8.firebaseapp.com",
    projectId: "linkhedin-fbdf8",
    storageBucket: "linkhedin-fbdf8.appspot.com",
    messagingSenderId: "1091369464561",
    appId: "1:1091369464561:web:a372b849c61eda4556af50",
    measurementId: "G-800CF6CRLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage()
const analytics = getAnalytics(app)

export { app, storage}