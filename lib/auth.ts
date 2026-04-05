import bcrypt from 'bcryptjs';
import { User } from './models/User';
import { connectDB } from './db';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function getUserByEmail(email: string) {
  await connectDB();
  return User.findOne({ email: email.toLowerCase() });
}

export async function createUser(email: string, password: string, name: string, role: string) {
  await connectDB();

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await hashPassword(password);
  const user = new User({
    email: email.toLowerCase(),
    password: hashedPassword,
    name,
    role,
  });

  await user.save();
  return {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export async function verifyCredentials(email: string, password: string) {
  await connectDB();

  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}
