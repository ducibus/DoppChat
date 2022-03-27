<script lang="ts">
	export const ssr = false;
	import Join from '$lib/Join.svelte';
	import ChatMessage from '$lib/ChatMessage.svelte';
	import { onMount } from 'svelte';
	import { username, user } from '$lib/gunUser';
	import debounce from 'lodash.debounce';
	import GUN from 'gun';
	const db = GUN();

	interface Message {
		who: any;
		what: any;
		when: any;
	}
	let newMessage: string;
	let messages: Message[] = [];
	let scrollBottom: HTMLDivElement;
	let lastScrollTop: number;
	let canAutoScroll = true;
	let unreadMessages = false;
	function autoScroll() {
		setTimeout(() => scrollBottom?.scrollIntoView({ behavior: 'auto' }), 50);
		unreadMessages = false;
	}
	function watchScroll(e: any) {
		canAutoScroll = (e.target.scrollTop || Infinity) > lastScrollTop;
		lastScrollTop = e.target.scrollTop;
	}
	$: debouncedWatchScroll = debounce(watchScroll, 1000);
	onMount(() => {
		var match = {
			// lexical queries are kind of like a limited RegEx or Glob.
			'.': {
				// property selector
				'>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString() // find any indexed property larger ~3 hours ago
			},
			'-': 1 // filter in reverse
		};
		// Get Messages
		db.get('chat')
			// @ts-ignore
			.map(match)
			.once(async (data, id) => {
				if (data) {
					var message = {
						// transform the data
						who: await db.user(data).get('alias'), // a user might lie who they are! So let the user system detect whose data it is.
						what: data.what, // force decrypt as text.
						when: GUN.state() // get the internal timestamp for the what property.
					};
					if (message.what) {
						messages = [...messages.slice(-100), message].sort((a, b) => a.when - b.when);
						if (canAutoScroll) {
							autoScroll();
						} else {
							unreadMessages = true;
						}
					}
				}
			});
	});
	async function sendMessage() {
		const message = user.get('all').set({ what: newMessage });
		const index = new Date().toISOString();
		db.get('chat').get(index).put(message);
		newMessage = '';
		canAutoScroll = true;
		autoScroll();
	}
	function leave() {
		user.leave();
		username.set('');
	}
</script>

<div class="chat_container">
	{#if $username}
		<header>
			<h1>DoppChat</h1>
			<div class="user-bio">
				<span>Hello <strong>{$username}</strong></span>
				<img src={`https://avatars.dicebear.com/api/initials/${$username}.svg`} alt="avatar" />
			</div>

			<button class="signout-button" on:click={leave}>Leave</button>
		</header>
		<main on:scroll={debouncedWatchScroll}>
			{#each messages as message (message.when)}
				<ChatMessage {message} sender={$username} />
			{/each}
			<div class="dummy" bind:this={scrollBottom} />
		</main>
		<form on:submit|preventDefault={sendMessage}>
			<input type="text" placeholder="Type a message..." bind:value={newMessage} maxlength="100" />
			<button type="submit" disabled={!newMessage}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					fill="currentColor"
					class="bi bi-send-fill"
					viewBox="0 0 16 16"
				>
					<path
						d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"
					/>
				</svg></button
			>
		</form>
		{#if !canAutoScroll}
			<div class="scroll-button">
				<button on:click={autoScroll} class:red={unreadMessages}>
					{#if unreadMessages}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="35"
							height="35"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
								clip-rule="evenodd"
							/>
						</svg>
					{/if}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="35"
						height="35"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
		{/if}
	{:else}
		<main>
			<Join />
		</main>
	{/if}
</div>

<style>
	.chat_container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: #1d1533;
	}

	header {
		background-color: #181717;
		height: 10vh;
		min-height: 50px;
		color: white;
		position: fixed;
		width: 100%;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 99;
		padding: 10px;
		box-sizing: border-box;
	}

	.user-bio {
		display: flex;
		align-items: center;
	}
	.signout-button {
		font-size: 0.8rem;
		padding: 0.5rem 1rem;
	}
	img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin: 2px 5px;
	}
	input,
	button {
		font-family: inherit;
		font-size: inherit;
		-webkit-padding: 0.4em 0;
		padding: 0.4em;
		margin: 0 0 0.5em 0;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-radius: 10px;
	}

	input:disabled {
		color: #ccc;
	}

	main {
		height: 80vh;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
	}

	main::-webkit-scrollbar {
		width: 0.5rem;
	}

	main::-webkit-scrollbar-track {
		background: #1e1e24;
	}

	main::-webkit-scrollbar-thumb {
		background: #6649b8;
	}
	form {
		height: 8vh;
		position: fixed;
		bottom: 0;
		background-color: #1d1533;
		width: 100%;
		display: flex;
		font-size: 1.5rem;
	}

	form button {
		width: 100px;
		border-radius: 0;
		background-color: #6649b8;
	}

	.scroll-button {
		position: fixed;
		bottom: 80px;
		left: 10px;
		color: white;
	}

	.red {
		background: rgb(204, 53, 37);
	}

	input {
		line-height: 1.5;
		width: 100%;
		height: 100%;
		font-size: 1.5rem;
		background: #282c34;
		color: white;
		outline: none;
		border: none;
		padding: 0 10px;
		margin: 0;
		border-radius: 0;
	}
	button {
		background-color: #282c34;
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		cursor: pointer;
		font-size: 1.25rem;
		margin: 0;
	}

	button:hover,
	button:active {
		filter: brightness(0.9);
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
