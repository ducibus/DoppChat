<script lang="ts">
	import Dashboard from '$lib/Dashboard.svelte';
	import LandingPage from '$lib/LandingPage.svelte';
	import { firebaseUser } from '$lib/authHandler';
	import type { User } from 'firebase/auth';
	$: CurrentUser = null as User | null;
	firebaseUser.subscribe(
		(user) => {
			CurrentUser = user;
		},
		(error) => {
			console.log(error);
		}
	);
</script>

{#if CurrentUser}
	<Dashboard user={CurrentUser} />
{:else}
	<LandingPage />
{/if}
