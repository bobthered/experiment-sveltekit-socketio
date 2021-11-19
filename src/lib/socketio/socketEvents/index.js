import dbInit from './dbInit.js';
import disconnect from './disconnect.js';

export default (io, socket) => {
  console.log(`socket.io - socket.id \`${socket.id}\` connected`);
  dbInit(io, socket);
  disconnect(io, socket);
}