import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';
const app = initializeApp(firebaseConfig);
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth';
const provider = new GoogleAuthProvider();
let auth = getAuth();

export function login(email: string, password: string) {
	signInWithEmailAndPassword(auth, email, password).catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		alert(`${errorCode}: ${errorMessage}`);
	});
}

export function googleLogin() {
	signInWithPopup(auth, provider).catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		alert(`${errorCode}: ${errorMessage}`);
	});
}

export function getCurrentUser() {
	return auth.currentUser;
}

export function logout() {
	signOut(auth).catch(console.error);
}
