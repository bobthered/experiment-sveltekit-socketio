# Experiment - Sveltekit-SocketIO

Add socket.io to sveltekit

## Step 1. Add Vite plugin for [socket.io](https://socket.io/)

### Description
Socket.io needs to be added to the Vite server for development.

### Installation
```
npm i -D @bobthered/vite-plugin-socket.io
```

### Docs
See the docs for the plugin [here](https://github.com/bobthered/vite-plugin-socket.io)

### Usage
```js
// svelte.config.js

import vitePluginSocketIO from '@bobthered/vite-plugin-socket.io';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		target: '#svelte',
		vite: {
			plugins: [vitePluginSocketIO()],
		}
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	],
};

export default config;
```

## Step 2. Add socket.io server & socket events

### Description
Server & socket events need to be created for your specific application.  These are passed to the Vite plugin.

### Installation
Create a new `socket.io.events.js` file with two functions `serverEvents` & `socketEvents` and add these to the svelte.config.js.

```js
// socket.io.events.js

export const serverEvents (io, socketEvents) => {
  io.on('connection', socket => socketEvents(io, socket))
}

export const socketEvents (io, socket) => {
  console.log(`socket.io - socket.id \`${socket.id}\` connected`);
  socket.on('login', () => {
    // login logic here
  });
  socket.on('disconnect', () => console.log(`socket.io - socket.id \`${socket.id}\` disconnected`));
}
```

### Usage
```js
// svelte.config.js

import vitePluginSocketIO from '@bobthered/vite-plugin-socket.io';
import preprocess from 'svelte-preprocess';
import { serverEvents, socketEvents } from 'path/to/socket.io.events.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		target: '#svelte',
		vite: {
			plugins: [vitePluginSocketIO({serverEvents, socketEvents})],
		}
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	],
};

export default config;
```

## Step 3. Add adapter with custom endpoint

### Description
Add svelte's `adapter-node` and provide a custom endpoint.

### Installation
```
npm i -D @sveltejs/adapter-node@next
```

Create new file `server.js`.  See example below of an express server implementation.
```js
// server.js

// imports
import compression from 'compression';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { assetsMiddleware, prerenderedMiddleware, kitMiddleware } from './build/middlewares.js';
import { serverEvents, socketEvents } from 'path/to/socket.io.events.js';

// initiate app
const app = express();

// initiate server
const server = http.createServer(app);

// initiate io
const io = new Server(server);

// add serverEvents & socketEvents
serverEvents(io, socketEvents);

// add middlewares
app.use(compression());
app.use('/', assetsMiddleware);
app.use('/', prerenderedMiddleware);
app.use(kitMiddleware);

// server listen
server.listen(process.env.PORT || 3000);
```

### Usage
```js
// svelte.config.js
import vitePluginSocketIO from '@bobthered/vite-plugin-socket.io';
import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { serverEvents, socketEvents } from 'path/to/socket.io.events.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
    adapter: adapter({
			entryPoint: ['path/to/server.js']
		}),
		target: '#svelte',
		vite: {
			plugins: [vitePluginSocketIO({serverEvents, socketEvents})],
		}
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	],
};

export default config;
```