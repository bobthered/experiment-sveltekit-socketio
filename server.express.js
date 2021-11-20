// imports
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { assetsMiddleware, prerenderedMiddleware, kitMiddleware } from './build/middlewares.js';
import { serverEvents, socketEvents } from './src/lib/socketio/index.js';

// initiate app
const app = express();

// initiate server
const server = http.createServer(app);

// initiate io
const io = new Server(server);

// add serverEvents & socketEvents
serverEvents(io, socketEvents);

// add middlewares
app.use('*', assetsMiddleware, prerenderedMiddleware, kitMiddleware);

// server listen
server.listen(process.env.PORT || 3000);