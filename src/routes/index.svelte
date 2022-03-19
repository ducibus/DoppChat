<script lang="ts">
	import Dashboard from '$lib/Dashboard.svelte';
	import LandingPage from '$lib/LandingPage.svelte';
	import { firebaseUser } from '$lib/authHandler';
	import type { User } from 'firebase/auth';
	let CurrentUser: User | null = null;
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
