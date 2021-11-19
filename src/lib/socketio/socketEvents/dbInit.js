import { connect } from '../../db/index.js';

export default (io, socket) => {
  socket.on('dbInit', async function (_, callback) {
    console.log('socket.io - dbInit');

    // connect to db
    const client = await connect();

    // get list of collections
    const collections = await client.db().listCollections().toArray();

    // get all documents from collections
    const db = {};
    await Promise.all(collections.map(async ({ name }) => {
      const docs = await client.db().collection(name).find({}).toArray();
      db[name] = docs;
    }))

    return callback(db);
  });
}