import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    const supabase = await createServiceClient();
    let query = supabase
      .from('internships')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(`title.ilike.%${search}%,company.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: internships, count, error } = await query
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1);

    if (error) throw error;

    console.log('[v0] Fetched internships:', internships?.length || 0, 'total:', count);

    return NextResponse.json({
      internships: internships || [],
      pagination: {
        total: count || 0,
        page,
        limit,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error: any) {
    console.error('[v0] Internships GET error:', error);
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
    const { title, company, description, requirements, skills, location, duration, stipend, deadline } = body;

    if (!title || !company || !description || !location || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createServiceClient();

    const { data: internship, error } = await supabase
      .from('internships')
      .insert({
        title,
        company,
        description,
        requirements: requirements || [],
        skills: skills || [],
        location,
        duration,
        stipend: stipend || '₹0/month',
        deadline: deadline || null,
        recruiter_id: token,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(internship, { status: 201 });
  } catch (error: any) {
    console.error('[v0] Internships POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
