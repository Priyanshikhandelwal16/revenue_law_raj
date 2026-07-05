import mongoose from 'mongoose';
import { patchMongooseModels } from './mongooseAdapter';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, isOffline: false, lastAttempt: 0 };
}

async function dbConnect() {
  // Apply offline fallback virtual adapters
  patchMongooseModels();

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env or Netlify environment settings.');
  }

  if (cached.conn) {
    return cached.conn;
  }

  // Circuit breaker: if we are offline, bypass connection attempt and serve from local DB
  const now = Date.now();
  if (cached.isOffline && now - cached.lastAttempt < 60000) {
    return mongoose;
  }

  if (!cached.promise) {
    cached.lastAttempt = now;

    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
      socketTimeoutMS: 3000,
    };

    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error('MongoDB Connection Timeout (DNS/Network Blocked)')), 3500);
    });

    cached.promise = Promise.race([
      mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
        clearTimeout(timeoutId);
        cached.isOffline = false; // Reset offline status on success
        return mongooseInstance;
      }),
      timeoutPromise
    ]).catch((err) => {
      clearTimeout(timeoutId);
      cached.isOffline = true; // Mark as offline on failure
      cached.promise = null;
      console.warn("MongoDB connection failed. Local file fallback database active.");
      return mongoose; // Return mongoose so caller does not crash
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    return mongoose;
  }

  return cached.conn;
}

export default dbConnect;
