// imports
import compression from 'compression';
import polka from 'polka';
import { Server } from 'socket.io';
import { path, host, port } from './.svelte-kit/node/env.js';
import { assetsMiddleware, kitMiddleware, prerenderedMiddleware } from './.svelte-kit/node/middlewares.js';
import { serverEvents, socketEvents } from './src/lib/socketio/index.js';

// initiate server
const server = polka().use(
  compression({ threshold: 0 }),
  assetsMiddleware,
  kitMiddleware,
  prerenderedMiddleware,
);

// initiate io
const io = new Server(server);

// initiate listenOpts
const listenOpts = { path, host, port };

console.log('working')

// create server listener event
server.listen(listenOpts, () => {
  console.log(`Listening on ${path ? path : host + ':' + port}`);
});

// initiate socket.io serverEvents
serverEvents(io, socketEvents)

export { server };