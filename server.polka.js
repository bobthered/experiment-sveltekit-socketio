// imports
import http from 'http';
import polka from 'polka';
import { Server } from 'socket.io';
import { assetsMiddleware, prerenderedMiddleware, kitMiddleware } from './build/middlewares.js';
import { serverEvents, socketEvents } from './src/lib/socketio/index.js';

// initiate app
const app = polka();

// initiate server
const server = http.createServer(app);

// initiate io
const io = new Server(server);

// add serverEvents & socketEvents
serverEvents(io, socketEvents);

// add middlewares
app.all('*', assetsMiddleware, prerenderedMiddleware, kitMiddleware);

// server listen
app.listen(process.env.PORT || 3000);