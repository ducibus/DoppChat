<script lang="ts">
	import { goto } from '$app/navigation';
	import { signUp, firebaseUser } from '$lib/firebaseHandler';
	import '../styles/authRoot.css';
	firebaseUser.subscribe(
		(user) => {
			if (user) goto('/');
		},
		(error) => {
			console.log(error);
		}
	);

	let username: string;
	let email: string;
	let password: string;
	let confirmPassword: string;

	function handleSubmit(e: any) {
		e.preventDefault();
		if (password === confirmPassword) {
			signUp(username, email, password);
		} else {
			alert('Passwords do not match');
		}
	}
</script>

<div class="root">
	<form id="authcontainer" on:submit={handleSubmit}>
		<h1>DoppChat</h1>
		<p>Create Account</p>
		<input
			required
			autocomplete="nickname"
			name="username"
			placeholder="Username"
			bind:value={username}
			minlength="3"
			maxlength="20"
		/>
		<input
			required
			autocomplete="email"
			name="email"
			placeholder="Email"
			bind:value={email}
			minlength="3"
			maxlength="20"
		/>
		<input
			required
			autocomplete="new-password"
			name="password"
			placeholder="Password"
			bind:value={password}
			minlength="6"
			type="password"
		/>
		<input
			required
			name="confirmPassword"
			placeholder="Confirm Password"
			minlength="6"
			bind:value={confirmPassword}
			type="password"
		/>
		<br />
		<button type="submit">Continue</button>
	</form>
</div>

<style>
	input {
		border: 2px solid #673699;
		padding: 10px 8px;
		font-size: 1rem;
		border-radius: 0.2rem;
		background-color: #2a2b2e;
		color: #e9f1f7;
	}
	input:focus {
		outline: #673699 solid 2px;
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
	h1 {
		color: #e7dfc6;
		font-size: 3rem;
		margin-bottom: 5px;
		margin-top: 5px;
	}
	p {
		font-size: 1.7rem;
		margin-top: 0;
	}
</style>
