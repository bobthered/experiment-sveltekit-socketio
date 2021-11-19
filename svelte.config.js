/* eslint-disable no-unused-vars */
import adapter from '@sveltejs/adapter-node';
import path from 'path';
import preprocess from 'svelte-preprocess';
import vitePluginSocketIO from './vite-plugin-socket.io.js';
import { serverEvents, socketEvents } from './src/lib/socketio/index.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			entryPoint: './server.js'
		}),
		target: '#svelte',
		vite: {
			optimizeDeps: {
				include: [
					'svelte-hero-icons'
				]
			},
			plugins: [vitePluginSocketIO({ serverEvents, socketEvents })],
			resolve: {
				alias: {
					$components: path.resolve('./src/components'),
					$lib: path.resolve('./src/lib'),
					$stores: path.resolve('./src/stores'),
				}
			}
		}
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	],
};

export default config;
