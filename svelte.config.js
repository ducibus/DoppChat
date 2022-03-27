import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter()
	},

	vite: () => () => {
		const moduleExclude = (match) => {
			const m = (id) => id.indexOf(match) > -1;
			return {
				name: `exclude-${match}`,
				resolveId(id) {
					if (m(id)) return id;
				},
				load(id) {
					if (m(id)) return `export default {}`;
				}
			};
		};

		return {
			optimizeDeps: {
				include: [
					'gun',
					'gun/gun',
					'gun/sea',
					'gun/sea.js',
					'gun/lib/then',
					'gun/lib/webrtc',
					'gun/lib/radix',
					'gun/lib/radisk',
					'gun/lib/store',
					'gun/lib/rindexed'
				]
			},
			plugins: [moduleExclude('text-encoding')]
		};
	}
};

export default config;
