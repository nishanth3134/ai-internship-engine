import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get student
    const { data: student } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', token)
      .single();

    if (!student) {
      return NextResponse.json([]);
    }

    // Get applications with internship details
    const { data: applications } = await supabase
      .from('applications')
      .select(`
        *,
        internship:internship_id(*)
      `)
      .eq('student_id', student.id)
      .order('created_at', { ascending: false });

    return NextResponse.json(applications || []);
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

    const body = await request.json();
    const { internshipId, resume, coverLetter } = body;

    if (!internshipId) {
      return NextResponse.json(
        { error: 'Missing internshipId' },
        { status: 400 }
      );
    }

    // Get student
    const { data: student } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', token)
      .single();

    if (!student) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    // Check if already applied
    const { data: existingApplication } = await supabase
      .from('applications')
      .select('id')
      .eq('internship_id', internshipId)
      .eq('student_id', student.id)
      .single();

    if (existingApplication) {
      return NextResponse.json(
        { error: 'Already applied to this internship' },
        { status: 400 }
      );
    }

    // Create application
    const { data: application, error } = await supabase
      .from('applications')
      .insert({
        internship_id: internshipId,
        student_id: student.id,
        resume: resume || null,
        cover_letter: coverLetter || null,
        status: 'applied',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(application, { status: 201 });
  } catch (error: any) {
    console.error('[v0] Application error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 400 }
    );
  }
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
