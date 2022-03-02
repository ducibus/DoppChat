<script lang="ts">
	import { validateSignUpPass } from '../lib/authHandler';
    let username: string;
    let email: string;
	let password: string;
    let confirmPassword: string;
	
	function handleSubmit(e: any) {
		e.preventDefault();
		validateSignUpPass(password, confirmPassword, email);
	}
</script>
<form id="authcontainer" on:submit={handleSubmit}>
    <br />
    <h1>Create Account</h1>
    <input name="email" placeholder="Email" bind:value={email} minlength="3" maxlength="20" />
    <input name="username" placeholder="Username" bind:value={username} minlength="3" maxlength="18"/>
    <input name="password" placeholder="Password" bind:value={password} type="password" />
    <input name="confirmPassword" placeholder="Confirm Password" bind:value={confirmPassword} type="password" />
    <br />
    <button type="submit" on:submit={handleSubmit}>Continue</button>
</form>


<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		background-color: #101827;
		color: #e9f1f7;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		height: -webkit-calc(100% - 10px);
		height: -moz-calc(100% - 10px);
		height: calc(100% - 10px);
		border: 5px solid #9446e2;
	}
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
	#authcontainer {
		display: grid;
		gap: 0.5rem;
		margin: auto;
		padding: 2rem;
		justify-content: center;
	}
</style>