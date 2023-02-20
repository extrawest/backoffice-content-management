import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env["NX_FIREBASE_API_KEY"],
	authDomain: process.env["NX_FIREBASE_AUTH_DOMAIN"],
	projectId: process.env["NX_FIREBASE_PROJECT_ID"],
	storageBucket: process.env["NX_FIREBASE_STORAGE_BUCKET"],
	messagingSenderId: process.env["NX_FIREBASE_MESSAGING_SENDER_ID"],
	appId: process.env["NX_FIREBASE_APP_ID"],
	measurementId: process.env["NX_FIREBASE_MEASUREMENT_ID"],
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);
