import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, confirmPassword, name, role } = body;

    if (!email || !password || !confirmPassword || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const user = await createUser(email, password, name, role || 'student');

    return NextResponse.json(
      { message: 'User created successfully', user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[v0] Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 400 }
    );
  }
}
