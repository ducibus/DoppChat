<script lang="ts">
	import Dashboard from '$lib/Dashboard.svelte';
	import LandingPage from '$lib/LandingPage.svelte';
	import Errors from '$lib/Errors.svelte';
	import { firebaseUser } from '$lib/authHandler';
	import type { User } from 'firebase/auth';
	let user: User | null = null;
	firebaseUser.subscribe((u) => {
		user = u;
	});
</script>

{#if user}
	<Dashboard {user} />
{:else}
	<LandingPage />
{/if}

<Errors />
