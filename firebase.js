import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCtn-DjhBb2oHWeK_MWV25gjbVL_UwBG1k",
    authDomain: "home-services-e02b6.firebaseapp.com",
    projectId: "home-services-e02b6",
    storageBucket: "home-services-e02b6.appspot.com",
    messagingSenderId: "880125539346",
    appId: "1:880125539346:web:a3e2d93c0b65cb1b37d4cb",
    measurementId: "G-R9HYTSSTF1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, RecaptchaVerifier };

/**
 * Function to send OTP to a specified phone number using Firebase Authentication.
 * @param {string} phoneNumber - The phone number to which the OTP will be sent.
 * @param {HTMLDivElement} recaptchaContainer - The container for reCAPTCHA to be attached.
 * @returns {Promise} - A promise that resolves with the confirmation result containing verificationId.
 */
export const sendOtpToPhone = (phoneNumber, recaptchaContainer) => {
    return new Promise((resolve, reject) => {
        const recaptchaVerifier = new RecaptchaVerifier(
            recaptchaContainer,
            { size: 'invisible' }, // Use 'invisible' for seamless user experience
            auth
        );

        signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
            .then((confirmationResult) => {
                resolve(confirmationResult);
            })
            .catch((error) => {
                console.error("Error sending OTP:", error);
                reject(error);
            });
    });
};

/**
 * Function to initiate Google sign-in using Firebase Authentication.
 * @returns {Promise} - A promise that resolves with the user's credentials upon successful sign-in.
 */
export const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};
