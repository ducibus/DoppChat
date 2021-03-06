import { writable } from 'svelte/store';

export interface Error {
	id: number;
	code: string;
	message: string;
}

export const errorStore = writable([] as Error[]);

export const newError = (code: string, message: string) => {
	errorStore.update((errors) => {
		const lastError = errors[errors.length - 1];
		const newId = lastError ? lastError.id + 1 : 1;
		setTimeout(() => {
			removeError(newId);
		}, 5000);
		return [...errors, { id: newId, code: code, message: message }];
	});
};

export const clearErrors = () => {
	errorStore.set([]);
};

export const removeError = (id: number) => {
	errorStore.update((errors) => errors.filter((error) => error.id !== id));
};
