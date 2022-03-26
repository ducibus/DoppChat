<script lang="ts">
	import { login, googleLogin } from '$lib/firebaseHandler';
	import '../styles/authRoot.css';
	function handleSubmit(e: any) {
		e.preventDefault();
		login(email, password);
	}
	let email: string;
	let password: string;
</script>

<div class="root">
	<main>
		<div id="intro">
			<h1>DoppChat</h1>
			<p>
				Create ephemeral chat rooms and invite your friends to the <strong
					>decentralized Dopps</strong
				><br /><br />
				<a href="https://docs.doppchat.ml" target="_blank">Learn more</a> about the project.
			</p>
		</div>

		<form id="authcontainer" on:submit={handleSubmit}>
			<br />
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
				autocomplete="current-password"
				name="password"
				placeholder="Password"
				bind:value={password}
				type="password"
			/>
			<br />
			<button type="submit">Login</button>
			<button type="button" on:click={googleLogin} class="login-with-google-btn">
				Sign in with Google
			</button>
			<spam>Don't have an account yet? <a href="./signup">Create one!</a></spam>
		</form>
	</main>
</div>

<style>
	main {
		display: grid;
		gap: 4rem;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
	h1 {
		color: #e7dfc6;
		font-size: 3rem;
	}
	p {
		font-size: 1.5rem;
		line-height: 1.5;
	}
	#authcontainer {
		display: grid;
		gap: 0.5rem;
		margin: auto;
		padding: 2rem;
		justify-content: center;
	}
	#intro {
		margin: auto;
	}
	
	::-webkit-input-placeholder {
		font-size: 1.25rem;
	}

	.login-with-google-btn {
		transition: background-color 0.3s, box-shadow 0.3s;

		padding: 12px 16px 12px 42px;
		border: none;
		border-radius: 3px;
		box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);

		color: #757575;
		font-size: 17px;
		font-weight: 500;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

		background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
		background-color: white;
		background-repeat: no-repeat;
		background-position: 13px 14px;
	}

	.login-with-google-btn:hover {
		box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
	}

	.login-with-google-btn:active {
		background-color: #eeeeee;
	}

	.login-with-google-btn:focus {
		outline: none;
		box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25), 0 0 0 3px #c8dafc;
	}

	.login-with-google-btn:disabled {
		filter: grayscale(100%);
		background-color: #ebebeb;
		box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
		cursor: not-allowed;
	}
</style>
