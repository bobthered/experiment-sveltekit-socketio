// imports
import polka from 'polka';
import { Server } from 'socket.io';
import { assetsMiddleware, prerenderedMiddleware, kitMiddleware } from './build/middlewares.js';
import { serverEvents, socketEvents } from './src/lib/socketio/index.js';

// initiate server
const server = polka();

// // initiate io
// const io = new Server(server);

// // add serverEvents & socketEvents
// serverEvents(io, socketEvents);

// add middlewares
server.all('*', assetsMiddleware, prerenderedMiddleware, kitMiddleware);

// server listen
server.listen(process.env.PORT || 3000);