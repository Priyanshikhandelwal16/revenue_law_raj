import mongoose from 'mongoose';
import { patchMongooseModels } from './mongooseAdapter';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: mongoose, promise: null, isOffline: true, lastAttempt: 0 };
}

async function dbConnect() {
  // Force Mongoose adapter to ALWAYS route queries to virtual database adapter (Firestore)
  cached.isOffline = true;
  patchMongooseModels();
  return mongoose;
}

export default dbConnect;
