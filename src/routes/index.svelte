<script lang="ts">
	import { onMount } from 'svelte';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { getCurrentUser } from '$lib/authHandler';
	import Dashboard from '$lib/Dashboard.svelte';
	import LandingPage from '$lib/LandingPage.svelte';

	$: CurrentUser = getCurrentUser();
	onMount(() => {
		let auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				CurrentUser = user;
			}
		});
	});
</script>

{#if CurrentUser}
	<Dashboard user={CurrentUser} />
{:else}
	<LandingPage />
{/if}
