import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

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
      const isWhitelistError = error.message.includes('whitelist') || error.message.includes('IP');
      const helpMessage = isWhitelistError
        ? '\n\n⚠️ IP Whitelist Error: Your server IP is not whitelisted in MongoDB Atlas.\n\nFix: Go to mongodb.com → Your Cluster → Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0) for development.'
        : '\n\n⚠️ Connection Error: Make sure your MONGODB_URI is correct and your MongoDB Atlas cluster is running.';
      
      throw new Error(`MongoDB connection failed: ${error.message}${helpMessage}`);
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
