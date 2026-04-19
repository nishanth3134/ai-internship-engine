import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServiceClient();
    
    const { data: internship, error } = await supabase
      .from('internships')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !internship) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(internship);
  } catch (error: any) {
    console.error('[v0] Internship detail GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const supabase = await createServiceClient();

    const { data: internship, error } = await supabase
      .from('internships')
      .update(body)
      .eq('id', id)
      .eq('recruiter_id', token)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(internship);
  } catch (error: any) {
    console.error('[v0] Internship detail PUT error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createServiceClient();

    const { error } = await supabase
      .from('internships')
      .delete()
      .eq('id', id)
      .eq('recruiter_id', token);

    if (error) throw error;

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error: any) {
    console.error('[v0] Internship detail DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
