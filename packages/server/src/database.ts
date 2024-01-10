/* eslint-disable no-console */
import mongoose from 'mongoose';
import { config } from './config';

async function connectDatabase() {
  mongoose.connection.on('close', () =>
    console.log('Database connection closed.'),
  );

  await mongoose.connect(config.MONGO_URI);
  await mongoose.connection.db.admin().ping();
  console.log('MongoDB connection has been established.');
}

export { connectDatabase };
