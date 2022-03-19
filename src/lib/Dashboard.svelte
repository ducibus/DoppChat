<script lang="ts">
	export let user: any;
	$: username = user.displayName;
	import { logout } from '../lib/authHandler';
</script>

<p>Welcome back, {username}!</p>
<button class="btn-logout" type="button" on:click={logout}>Log out</button>

<style>
	.btn-logout {
		background-color: #9446e2;
		border: none;
		color: white;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 1em;
		padding: 12px 28px;
		border-radius: 4px;
		cursor: pointer;
		position: absolute;
		top: 2%;
		right: 1.2%;
		transition-duration: 0.4s;
	}
	.btn-logout:hover {
		box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
	}
</style>
