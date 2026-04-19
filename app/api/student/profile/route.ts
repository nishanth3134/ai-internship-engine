import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const userId = authHeader?.replace('Bearer ', '');

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createServiceClient();

    let { data: student, error: fetchError } = await supabase
      .from('students')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (!student) {
      // Create student profile
      const { data: newStudent, error: createError } = await supabase
        .from('students')
        .insert({
          user_id: userId,
          skills: [],
          interests: [],
        })
        .select()
        .single();

      if (createError) throw createError;
      student = newStudent;
    }

    return NextResponse.json(student);
  } catch (error: any) {
    console.error('[v0] Profile GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const userId = authHeader?.replace('Bearer ', '');

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const supabase = createServiceClient();

    let { data: student, error: fetchError } = await supabase
      .from('students')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    // Only include fields that exist in the students table
    const updateData = {
      education: body.education,
      skills: body.skills || [],
      interests: body.interests || [],
      gpa: body.gpa,
      preferred_location: body.preferred_location,
      // University, degree, and experience_level are stored in education field
    };

    if (!student) {
      // Create new student
      const { data: newStudent, error: createError } = await supabase
        .from('students')
        .insert({
          user_id: userId,
          ...updateData,
        })
        .select()
        .single();

      if (createError) throw createError;
      return NextResponse.json(newStudent);
    } else {
      // Update existing student
      const { data: updated, error: updateError } = await supabase
        .from('students')
        .update(updateData)
        .eq('user_id', userId)
        .select()
        .single();

      if (updateError) throw updateError;
      return NextResponse.json(updated);
    }
  } catch (error: any) {
    console.error('[v0] Profile PUT error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
