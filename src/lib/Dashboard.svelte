<script lang="ts">
	import { logout, firebaseUser, db } from '$lib/firebaseHandler';
	import {
		collection,
		addDoc,
		getDocs,
		where,
		orderBy,
		query,
		doc,
		deleteDoc,
		Timestamp
	} from 'firebase/firestore';
	import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
	import { newError } from './errorStore';

	// making sure only logged in users can see
	firebaseUser.subscribe((user) => {
		if (!user) window.location.reload();
	});

	// utils
	async function hash(string: string) {
		const utf8 = new TextEncoder().encode(string);
		const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, '0')).join('');
		return hashHex;
	}
	function generateId() {
		return hash((Math.random() + 1).toString(36).substring(7) + Date.now().toString);
	}

	// managing dopps
	let newDoppName: string;
	async function createNewDopp() {
		await addDoc(collection(db, 'dopps'), {
			name: newDoppName,
			owner: $firebaseUser?.uid,
			created_at: Timestamp.now(),
			dopp: await generateId()
		}).catch((error) => {
			newError(error.code, error.message);
		});
		window.location.reload();
	}
	async function getDopps() {
		const doppQuery = query(
			collection(db, 'dopps'),
			where('owner', '==', $firebaseUser?.uid),
			orderBy('created_at', 'desc')
		);
		const doppsData = await getDocs(doppQuery)
			.then((dopps) => {
				return dopps;
			})
			.catch((error) => {
				newError(error.code, error.message);
				return {
					docs: []
				};
			});
		return doppsData.docs;
	}
	let doppsPromise = getDopps();
	async function deleteDopp(dopp: QueryDocumentSnapshot<DocumentData>) {
		await deleteDoc(doc(db, dopp.ref.path))
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				newError(error.code, error.message);
			});
	}

	// boolean to check if the list of cards is long enough to be scrolled
	let long: boolean;
	doppsPromise.then((dopps) => {
		long = dopps.length > 4;
	});

	// card stuff
	const share = (dopp: QueryDocumentSnapshot<DocumentData>) => {
		const shareData = {
			title: 'Dopp',
			text: 'You have been invited to a dopp',
			url: `https://doppchat.ml/dopps/${dopp.data().dopp}`
		};
		navigator.share(shareData);
	};
	let next = false;
	const openNext = () => {
		next = true;
	};
</script>

<button class="btn-logout" type="button" on:click={logout}>Log out</button>
<br />
<h1>Hi {$firebaseUser?.displayName}</h1>
<br />
<h2>Here are your <strong>Dopps</strong></h2>
{#await doppsPromise}
	<p>Getting your Dopps . . .</p>
{:then dopps}
	<ul class:justify={long === false}>
		{#each dopps as dopp}
			<li>
				<header>
					<h1>{dopp.data().name}</h1>
				</header>
				<a
					class="dopp_btn"
					href="https://doppchat.ml/dopps/{dopp.data().dopp}"
					target="_blank"
					rel="noopener noreferrer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="45"
						height="45"
						fill="currentColor"
						class="bi bi-box-arrow-right"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
						/>
						<path
							fill-rule="evenodd"
							d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
						/>
					</svg>
					<h3>Open</h3>
				</a>
				<button
					class="dopp_btn"
					on:click={() => {
						share(dopp);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="45"
						width="45"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
						/>
					</svg>
					<h3>Share</h3>
				</button>
				<button
					class="dopp_btn"
					on:click={() => {
						deleteDopp(dopp);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="45"
						width="45"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
					<h3>Delete</h3>
				</button>
			</li>
		{/each}
		<li>
			<div class="create" class:hide={next === true} on:click={openNext}>
				<svg height="98" width="98" viewBox="0 0 20 20" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<div class:hide={next === false}>
				<input placeholder="Name" type="text" bind:value={newDoppName} />
				<button on:click={createNewDopp}>Create</button>
			</div>
		</li>
	</ul>
{:catch error}
	<p>Oops! I broke 💩</p>
	<p>{error}</p>
{/await}

<style>
	h1 {
		margin: 2rem;
	}
	ul {
		list-style: none;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 400px;
		position: fixed;
		bottom: 0;
		padding: 3rem;
		overflow: scroll;
		margin: auto;
		width: 100%;
	}
	ul::-webkit-scrollbar {
		width: 10px;
		height: 5px;
	}
	ul::-webkit-scrollbar-thumb {
		background: #201c29;
		border-radius: 10px;
		box-shadow: inset 2px 2px 2px hsla(0, 0%, 100%, 0.25), inset -2px -2px 2px rgba(0, 0, 0, 0.25);
	}

	ul::-webkit-scrollbar-track {
		background-color: #9446e2;
	}
	.justify {
		justify-content: center;
	}
	li {
		height: 350px;
		width: 250px;
		min-width: 250px;
		border-radius: 16px;
		background: #25202e;
		box-shadow: -0.5rem 0 1.5rem #000;
		display: flex;
		flex-direction: column;
		transition: 0.2s;
		margin: 0;
		scroll-snap-align: start;
		clear: both;
		position: relative;
	}
	li:focus-within ~ li,
	li:hover ~ li {
		transform: translateX(50px);
	}

	li:hover {
		transform: translateY(-1rem);
	}
	li:not(:first-child) {
		margin-left: -50px;
	}
	li:last-child {
		justify-content: center;
		justify-items: center;
		align-items: center;
	}
	.create {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 16px;
		height: 100%;
		width: 100%;
	}
	.create:hover {
		background-color: #9446e2;
	}
	.hide {
		display: none;
		transition: 0.5s;
	}
	input {
		width: 150px;
		margin: 20px;
	}
	.dopp_btn {
		width: 250px;
		display: flex;
		justify-content: center;
		gap: 1rem;
		align-items: center;
		background-color: inherit;
		border: none;
		transition: 0.7s;
		border-radius: 0;
		color: inherit;
		padding: 0.7rem;
	}
	.dopp_btn h3 {
		display: none;
	}
	.dopp_btn:hover {
		scale: 100%;
		background-color: #9446e2;
	}
	.dopp_btn:hover h3 {
		display: block;
	}
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
