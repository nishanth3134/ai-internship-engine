import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: application } = await supabase
      .from('applications')
      .select(`
        *,
        internship:internship_id(*),
        student:student_id(*)
      `)
      .eq('id', params.id)
      .single();

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
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status, feedback } = body;

    // Get application
    const { data: application } = await supabase
      .from('applications')
      .select('*')
      .eq('id', params.id)
      .single();

    if (!application) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Update application
    const { data: updated, error } = await supabase
      .from('applications')
      .update({
        status: status || application.status,
        feedback: feedback || application.feedback,
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
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
