<script lang="ts">
	import Dashboard from '$lib/Dashboard.svelte';
	import LandingPage from '$lib/LandingPage.svelte';
	import { firebaseUser } from '$lib/authHandler';
</script>

{#if $firebaseUser}
	<Dashboard />
{:else}
	<LandingPage />
{/if}
