import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';
const app = initializeApp(firebaseConfig);
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	signOut
} from 'firebase/auth';
const provider = new GoogleAuthProvider();
const auth = getAuth();

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
	auth.signOut()
	.catch(console.error);
}

export function signUp(username: string, email: string, password: string) {
	createUserWithEmailAndPassword(auth, email, password)
		.then((result) => {
			updateProfile(result.user, {
				displayName: username
			});
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			alert(`${errorCode}: ${errorMessage}`);
		});
}
