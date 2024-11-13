// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCtn-DjhBb2oHWeK_MWV25gjbVL_UwBG1k",
    authDomain: "home-services-e02b6.firebaseapp.com",
    projectId: "home-services-e02b6",
    storageBucket: "home-services-e02b6.firebasestorage.app",
    messagingSenderId: "880125539346",
    appId: "1:880125539346:web:a3e2d93c0b65cb1b37d4cb",
    measurementId: "G-R9HYTSSTF1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Sign-In function
const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        return result;
    } catch (error: any) {
        throw new Error(`Google sign-in failed: ${error.message}`);
    }
};

export { auth, signInWithGoogle };
