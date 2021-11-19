import _dotenvConfig from 'dotenv/config';
import mongodb from 'mongodb';
const { MongoClient } = mongodb

// connection options
const options = { useUnifiedTopology: true }

// create a new MongoClient
const client = {};

// initial connection variable
const connection = {};

// close connection
const close = async (db = import.meta.env?.MONGO_DB || process.env.MONGO_DB || 'development') => client[db].close();

// create connection function
const connect = async (db = import.meta.env?.MONGO_DB || process.env.MONGO_DB || 'development') => {
  // initiate variables
  const password = import.meta.env?.MONGO_PASSWORD || process.env.MONGO_PASSWORD;
  const url = import.meta.env?.MONGO_URL || process.env.MONGO_URL;
  const uri = url.replace(/\<password\>/g, password).replace(/myFirstDatabase/g, db)

  // check if db client exists
  if (!(db in client)) client[db] = new MongoClient(uri, options);

  // check if db connection exists
  if (!(db in connection)) connection[db] = await client[db].connect();

  return client[db];
}

export { close, connect };