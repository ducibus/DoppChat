<script lang="ts">
	import { errorStore, removeError } from './errorStore';
	import type { Error } from './errorStore';
	let stack: Error[] = [];
	errorStore.subscribe((errors) => {
		stack = errors;
	});
	function removeLast() {
		const IDs = stack.map((error) => error.id);
		const lastID = stack[stack.length - 1]?.id;
		removeError(lastID);
	}
	setInterval(removeLast, 5000);
</script>

<div class="errorContainer">
	{#each stack as error}
		<div class="error">
			<span>{error.code}: {error.message}</span>
		</div>
	{/each}
</div>
