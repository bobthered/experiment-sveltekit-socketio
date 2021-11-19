// imports
import { Server } from 'socket.io';

const serverEvents = (io, socketEvents) => {
  io.on('connection', socket => socketEvents(io, socket))
}

const socketEvents = (io, socket) => {
  console.log('socket.io - connection');
  socket.on('disconnect', () => console.log(`socket.io - socket.id \`${socket.id}\` disconnected`))
}

export default (options = {}) => ({
  name: 'socket.io',
  configureServer(server) {
    // initiate default options
    const defaults = { serverEvents, socketEvents }

    // merge defaults with options
    options = Object.assign(defaults, options);

    // create io server
    const io = new Server(server.httpServer);

    // pass io server to serverEvents
    options.serverEvents(io, options.socketEvents);
  }
})