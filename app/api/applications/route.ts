import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Application } from '@/lib/models/Application';
import { Student } from '@/lib/models/Student';
import { User } from '@/lib/models/User';
import { Internship } from '@/lib/models/Internship';
import { sendApplicationNotification, sendNewApplicationNotification } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const student = await Student.findOne({ userId: token });

    if (!student) {
      return NextResponse.json([]);
    }

    const applications = await Application.find({ studentId: student._id })
      .populate('internshipId')
      .sort({ appliedAt: -1 });

    return NextResponse.json(applications);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { internshipId, resume, coverLetter } = body;

    if (!internshipId) {
      return NextResponse.json({ error: 'Missing internshipId' }, { status: 400 });
    }

    const student = await Student.findOne({ userId: token });

    if (!student) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      internshipId,
      studentId: student._id,
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: 'Already applied to this internship' },
        { status: 400 }
      );
    }

    const application = new Application({
      internshipId,
      studentId: student._id,
      resume: resume || student.resumeUrl,
      coverLetter,
    });

    await application.save();

    // Send notifications
    const studentUser = await User.findById(student.userId);
    const internship = await Internship.findById(internshipId).populate('createdBy');

    if (studentUser?.email) {
      await sendApplicationNotification(
        studentUser.email,
        studentUser.name,
        internship?.title || 'Position',
        internship?.company || 'Company'
      );
    }

    // Notify recruiter
    const recruiterUser = internship?.createdBy as any;
    if (recruiterUser?.email) {
      await sendNewApplicationNotification(
        recruiterUser.email,
        recruiterUser.name,
        studentUser?.name || 'Applicant',
        internship?.title || 'Position',
        application.matchScore || 0
      );
    }

    return NextResponse.json(application, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
