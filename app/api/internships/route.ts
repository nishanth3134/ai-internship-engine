import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    let query = supabase
      .from('internships')
      .select('*', { count: 'exact' })
      .eq('status', 'active');

    if (search) {
      query = query.or(`title.ilike.%${search}%,company.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: internships, count } = await query
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1);

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
    const { title, company, description, requirements, skills, location, duration, stipend, startDate, endDate, positionsAvailable, internshipType } = body;

    if (!title || !company || !description || !location || !duration || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

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
        stipend: stipend || 0,
        start_date: new Date(startDate).toISOString(),
        end_date: new Date(endDate).toISOString(),
        positions_available: positionsAvailable || 1,
        internship_type: internshipType,
        created_by: token,
        status: 'active',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(internship, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
