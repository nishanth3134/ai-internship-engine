import { supabaseServer } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: 'student' | 'recruiter'
) {
  try {
    // Check if user already exists
    const { data: existingUser } = await supabaseServer
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const { data: user, error } = await supabaseServer
      .from('users')
      .insert({
        email,
        password: hashedPassword,
        name,
        role,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // If student, create student profile
    if (role === 'student' && user) {
      await supabaseServer
        .from('students')
        .insert({
          user_id: user.id,
          skills: [],
          interests: [],
          education: '',
          gpa: null,
          preferred_location: '',
          preferred_type: '',
          preferred_duration: '',
          resume_url: '',
          created_at: new Date().toISOString(),
        });
    }

    return user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create user');
  }
}

export async function getUserByEmail(email: string) {
  try {
    const { data: user, error } = await supabaseServer
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    return user;
  } catch (error: any) {
    return null;
  }
}
