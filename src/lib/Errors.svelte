<script lang="ts">
	import { errorStore, removeError } from './errorStore';
	import { fly } from 'svelte/transition';
</script>

<div class="container">
	<ul>
		{#each $errorStore as error}
			<li in:fly={{ x: 100, duration: 200 }} out:fly={{ x: 100, duration: 200 }}>
				<p class="text">{error.code}: {error.message}</p>
				<div class="close" on:click={() => removeError(error.id)}>
					<svg width="18" height="18" viewBox="0 0 23 23"
						><path
							fill="transparent"
							stroke-width="3"
							stroke="#030303"
							stroke-linecap="square"
							color="#030303"
							d="M 3 16.5 L 17 2.5"
						/><path
							fill="transparent"
							stroke-width="3"
							stroke="#030303"
							stroke-linecap="square"
							color="#030303"
							d="M 3 2.5 L 17 16.346"
						/></svg
					>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.container {
		display: flex;
		width: 50vw;
		height: 50%;
		margin: auto;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}
	li {
		background: linear-gradient(15deg, rgb(255, 89, 109), rgb(215, 44, 44));
		width: 225px;
		margin: 0.5rem 1.5rem;
		padding: 0.5rem 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		border-radius: 4px;
	}
	.text {
		margin: auto auto auto 0;
		display: flex;
		padding: 0 22px 0 0;
		font-size: 100%;
		font-weight: 600;
		letter-spacing: 0.25px;
	}
	ul {
		position: fixed;
		bottom: 0.5rem;
		right: 0;
		top: 0.5rem;
		list-style: none;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.close {
		height: 22px;
		width: 22px;
		padding: 10px;
		position: absolute;
		top: 0px;
		right: 0px;
	}
	.close svg {
		margin: 0 auto;
		width: 100%;
		height: 100%;
	}
</style>
