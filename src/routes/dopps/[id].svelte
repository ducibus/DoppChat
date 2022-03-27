<script lang="ts">
	import { page } from '$app/stores';
	import { firebaseUser, db } from '$lib/firebaseHandler';
	import Chat from '$lib/Chat.svelte';
	import { collection, getDocs, where, query, onSnapshot } from 'firebase/firestore';
	import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
	import { newError } from '$lib/errorStore';
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	let id = $page.params.id;

	let doppPromise = writable(null as null | QueryDocumentSnapshot<DocumentData>);
	async function getDopps() {
		const doppQuery = query(collection(db, 'dopps'), where('dopp', '==', id));
		const dopp = await getDocs(doppQuery)
			.then((dopp) => {
				return dopp;
			})
			.catch((error) => {
				newError(error.code, error.message);
				return {
					docs: []
				};
			});
		doppPromise.set(dopp.docs[0]);
		let listener: () => void;
		listener = onSnapshot(doppQuery, (dopp) => {
			doppPromise.set(dopp.docs[0]);
		});
		onDestroy(() => {
			listener();
		});
	}
	onMount(getDopps);
</script>

{#if $firebaseUser}
	{#await $doppPromise}
		<p>Searching ...</p>
	{:then dopp}
		{#if dopp?.exists()}
			<h1>{dopp.data().name}</h1>
			<Chat />
		{:else}
			<p>Dopp not found</p>
		{/if}
	{/await}
{:else}
	<p>Please <a href="/">login</a> to join this Dopp</p>
{/if}
