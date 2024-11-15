import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCzufCFpg_4QXlb7-v3R7mKqB-jkYOAV9E",
    authDomain: "homeservices-by-saurabhinfosys.firebaseapp.com",
    projectId: "homeservices-by-saurabhinfosys",
    storageBucket: "homeservices-by-saurabhinfosys.appspot.com",
    messagingSenderId: "929142052418",
    appId: "1:929142052418:web:35d7f5e1321274e14a3fdb",
    measurementId: "G-6DRPCYYNQ5"
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
