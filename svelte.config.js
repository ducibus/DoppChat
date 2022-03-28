import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import viteConfig from './vite.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter()
	},

	vite: viteConfig,
	target: '#svelte'
};

export default config;
