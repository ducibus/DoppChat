<script lang="ts">
	let email: string;
	let password: string;
	function login(e: any) {
		e.preventDefault();
	}
</script>
<main>
	<div id="intro">
		<h1>DoppChat</h1>
		<p>
			Create ephemeral chat rooms and invite your friends to the <strong>decentralized Dopps.</strong><br><br>
			To learn more about the project, <a href="https://docs.com" target="_blank"><br> click here</a>.
		</p>
	</div>

	<form id="authcontainer" on:submit={login}>
		<br />
		<input name="email" placeholder="Email" bind:value={email} minlength="3" maxlength="16" />
		<input name="password" placeholder="Password" bind:value={password} type="password" />
		<br />
		<button type="submit">Login</button>
		<button type="button" class="login-with-google-btn"> Sign in with Google </button>
		<spam>Don't have an account yet? <a href="signup">Create one!</a></spam>
	</form>
</main>

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
	strong {
		color: #e7dfc6;
		font-weight: 600;
		background-image: linear-gradient(to left, #673699, #9446e2);
		border-radius: 3px;
		padding: 0px 8px 4px 8px;
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
		padding: 4px 8px;
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
	#intro {
		margin: auto;
	}
	a {
		color: #9446e2;
		text-decoration: none;
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
		background-position: 12px 11px;
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
