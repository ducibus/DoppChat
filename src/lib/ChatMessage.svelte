<script lang="ts">
	interface Message {
		who: string;
		what: string;
		when: string;
	}
	export let message: Message;
	export let sender;
	const messageClass = message.who === sender ? 'sent' : 'received';
	const avatar = `https://avatars.dicebear.com/api/initials/${message.who}.svg`;
	const ts = new Date(message.when);
</script>

<div class={`message ${messageClass}`}>
	<img src={avatar} alt="avatar" />
	<div class="message-text">
		<p>{message.what}</p>

		<time>{ts.toLocaleTimeString()}</time>
	</div>
</div>

<style>
	p {
		max-width: 500px;
		margin-bottom: 0;
		line-height: 24px;
		padding: 10px 20px;
		border-radius: 25px;
		position: relative;
		color: white;
		text-align: center;
	}

	.message {
		display: flex;
		align-items: center;
		margin: 0;
		word-wrap: break-word;
	}

	.sent {
		flex-direction: row-reverse;
	}

	.sent p {
		color: white;
		background: #0b93f6;
		align-self: flex-end;
		text-align: right;
	}
	.received p {
		background: #e5e5ea;
		color: black;
		text-align: left;
	}

	.message-text {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.received .message-text {
		align-items: flex-start;
	}

	time {
		color: white;
		font-size: 0.7rem;
		color: #9a9a9a;
		margin: 0 1rem;
	}

	img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin: 2px 5px;
	}

	.message:last-child {
		margin-bottom: 20px;
	}

	.user-bio {
		display: flex;
		align-items: center;
	}

	.scroll-button {
		position: fixed;
		bottom: 70px;
		right: 20px;
		color: white;
	}

	.red {
		background: rgb(204, 53, 37);
	}

	.signout-button {
		font-size: 0.8rem;
		padding: 0.5rem 1rem;
	}
</style>
