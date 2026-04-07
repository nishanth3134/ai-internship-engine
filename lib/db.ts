import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/internship-scheme';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    }).catch((error) => {
      console.error('[v0] MongoDB connection error:', error.message);
      throw new Error(
        `MongoDB connection failed. Please ensure MONGODB_URI is set correctly. Current URI: ${MONGODB_URI.substring(0, 50)}...`
      );
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
