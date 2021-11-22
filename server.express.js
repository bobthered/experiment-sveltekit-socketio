// imports
import compression from 'compression';
import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import { fileURLToPath, URL, URLSearchParams } from "url";
import { assetsMiddleware, prerenderedMiddleware, kitMiddleware } from './build/middlewares.js';
import { serverEvents, socketEvents } from './src/lib/socketio/index.js';

// initiate path variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use('/', express.static(path.join(__dirname, 'assets')));
app.use('/', express.static(path.join(__dirname, 'prerendered')));
app.use('*', assetsMiddleware, prerenderedMiddleware, kitMiddleware);

// server listen
server.listen(process.env.PORT || 3000);