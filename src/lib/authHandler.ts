import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { writable } from 'svelte/store';
import { newError } from './errorStore';
const app = initializeApp(firebaseConfig);

import {
	GoogleAuthProvider,
	getAuth,
	onAuthStateChanged,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	signOut
} from 'firebase/auth';

import type { User } from 'firebase/auth';

export const firebaseUser = writable(null as User | null);
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
	if (user) {
		firebaseUser.set(user);
	}
});

const provider = new GoogleAuthProvider();

export function login(email: string, password: string) {
	signInWithEmailAndPassword(auth, email, password).catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		newError(errorCode, errorMessage);
	});
}

export function googleLogin() {
	signInWithPopup(auth, provider).catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		newError(errorCode, errorMessage);
	});
}

export function getCurrentUser() {
	return auth.currentUser;
}

export function logout() {
	auth.signOut().catch(console.error);
	window.location.reload();
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
			newError(errorCode, errorMessage);
		});
}
