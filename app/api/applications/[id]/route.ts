import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Application } from '@/lib/models/Application';
import { Student } from '@/lib/models/Student';
import { User } from '@/lib/models/User';
import { Internship } from '@/lib/models/Internship';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth-config';
import { sendApplicationStatusUpdate, sendNewApplicationNotification } from '@/lib/email';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const application = await Application.findById(params.id)
      .populate('internshipId')
      .populate('studentId')
      .lean();

    if (!application) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(application);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    if (!session || (session.user as any).role !== 'recruiter') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();
    const { status, feedback } = body;

    const application = await Application.findById(params.id);

    if (!application) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Verify recruiter owns this internship
    const internship = await Internship.findById(application.internshipId);
    if (internship?.createdBy.toString() !== (session.user as any).id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get student details for email
    const student = await Student.findById(application.studentId).populate('userId');
    const studentUser = student?.userId as any;

    // Update application
    application.status = status || application.status;
    application.feedback = feedback || application.feedback;
    await application.save();

    // Send email notification to student
    if (studentUser?.email) {
      await sendApplicationStatusUpdate(
        studentUser.email,
        studentUser.name,
        internship?.title || 'Unknown Position',
        application.status
      );
    }

    return NextResponse.json(application);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    if (!session || (session.user as any).role !== 'student') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const application = await Application.findById(params.id);

    if (!application) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Verify student owns this application
    const student = await Student.findById(application.studentId);
    if (student?.userId.toString() !== (session.user as any).id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await Application.deleteOne({ _id: params.id });

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
