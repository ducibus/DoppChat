<script lang="ts">
	import { user } from '$lib/gunUser';
	import { newError } from '$lib/errorStore';
	import { firebaseUser } from '$lib/firebaseHandler';
	let username: string;
	let password: string;
	function login() {
		user.auth(username, password, (cb: { err: string }) => cb.err && newError('Gun Error', cb.err));
	}
	$: auto = false;
	function join() {
		const p = auto ? $firebaseUser?.uid : password;
		user.auth(username, p, (cb: { err: string }) => {
			if (cb.err === 'Wrong user or password.') {
				user.create(username, p, (cb: { err: string }) => {
					if (cb.err) {
						newError('Gun Error Create', cb.err);
					} else {
						login();
					}
				});
			} else if (cb.err) {
				newError('Gun Error Login', cb.err);
			} else {
				login();
			}
		});
	}
</script>

<div class="root">
	<form id="authcontainer" on:submit|preventDefault={join}>
		<input
			required
			autocomplete="nickname"
			name="username"
			placeholder="Username"
			bind:value={username}
			minlength="3"
			maxlength="20"
		/>
		{#if !auto}
			<input
				required
				autocomplete="new-password"
				name="password"
				placeholder="Password"
				bind:value={password}
				minlength="6"
				type="password"
			/>
		{/if}
		<br />
		<div style="display: flex; width: 15rem; justify-items: center; margin:auto">
			<input bind:checked={auto} id="auto" type="checkbox" />
			<label for="auto">Use auto-generated credential (Insecure)</label>
		</div>
		<button type="submit">Join Dopp</button>
	</form>
</div>

<style>
	input {
		border: 2px solid #673699;
		padding: 10px 8px;
		width: 20rem;
		font-size: 24px;
		border-radius: 0.2rem;
		background-color: #2a2b2e;
		color: #e9f1f7;
	}
	input:focus {
		outline: #673699 solid 2px;
	}
	#auto {
		width: 30px;
	}
	#auto:focus {
		outline: none;
	}
	button {
		border: 5px solid #9446e2;
		padding: 5px 10px;
		border-radius: 0.2rem;
		font-size: 1.25rem;
		background-color: #9446e2;
		color: #e9f1f7;
	}
	button:hover {
		scale: 105%;
	}
	button:active {
		scale: 98%;
	}
	button:focus {
		outline: #9446e2 solid 2px;
	}

	:placeholder-shown {
		font-size: 1.5rem;
	}

	::-webkit-input-placeholder {
		font-size: 1.2rem;
	}

	#authcontainer {
		display: grid;
		gap: 0.5rem;
		margin: auto;
		padding: 2rem;
		justify-content: center;
	}
</style>
