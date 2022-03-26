<script lang="ts">
	import { page } from '$app/stores';
	import { firebaseUser, db } from '$lib/firebaseHandler';
	import { collection, getDocs, where, query } from 'firebase/firestore';
	import { newError } from '$lib/errorStore';
	import '../../styles/authRoot.css';
	let id = $page.params.id;
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
		return dopp.docs[0];
	}
	const doppPromise = getDopps();
</script>

{#await doppPromise}
	<p>Searching</p>
{:then dopp}
	{#if dopp?.exists() && $firebaseUser}
		<p>Valid Dopp ✔: {dopp.data().name}</p>
	{:else if dopp?.exists() && !$firebaseUser}
		<p>Please <a href="/">login</a> to join this Dopp</p>
	{:else if !dopp?.exists()}
		<p>Dopp not found</p>
	{/if}
{:catch error}
	<p>Error: {error.message}</p>
{/await}
