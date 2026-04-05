import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Student } from '@/lib/models/Student';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth-config';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    let student = await Student.findOne({ userId: (session.user as any).id });

    if (!student) {
      student = new Student({
        userId: (session.user as any).id,
        skills: [],
        interests: [],
        preferences: {},
      });
      await student.save();
    }

    return NextResponse.json(student);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();

    let student = await Student.findOne({ userId: (session.user as any).id });

    if (!student) {
      student = new Student({
        userId: (session.user as any).id,
        ...body,
      });
    } else {
      Object.assign(student, body);
    }

    await student.save();

    return NextResponse.json(student);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
