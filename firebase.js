// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCtn-DjhBb2oHWeK_MWV25gjbVL_UwBG1k",
    authDomain: "home-services-e02b6.firebaseapp.com",
    projectId: "home-services-e02b6",
    storageBucket: "home-services-e02b6.appspot.com",
    messagingSenderId: "880125539346",
    appId: "1:880125539346:web:a3e2d93c0b65cb1b37d4cb",
    measurementId: "G-R9HYTSSTF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { auth, RecaptchaVerifier };

export const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};