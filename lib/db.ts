import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

console.log('[v0] DEBUG: process.env.MONGODB_URI =', MONGODB_URI ? `${MONGODB_URI.substring(0, 50)}...` : 'NOT SET');
console.log('[v0] DEBUG: Available env keys with MONGO:', Object.keys(process.env).filter(k => k.includes('MONGO')));

if (!MONGODB_URI) {
  console.error('[v0] ERROR: MONGODB_URI environment variable is not set!');
  console.error('[v0] Please set MONGODB_URI in your project environment variables (Settings → Vars)');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI environment variable is not set. Please add it in your project settings (Settings → Vars → Add Variable). Use a MongoDB Atlas connection string like: mongodb+srv://username:password@cluster.mongodb.net/database'
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    };

    console.log('[v0] Connecting to MongoDB...');
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('[v0] Connected to MongoDB successfully');
      return mongoose;
    }).catch((error) => {
      console.error('[v0] MongoDB connection error:', error.message);
      throw new Error(
        `MongoDB connection failed: ${error.message}. Make sure your MONGODB_URI is correct and your database is accessible.`
      );
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
