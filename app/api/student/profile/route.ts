import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let { data: student } = await supabase
      .from('students')
      .select('*')
      .eq('user_id', token)
      .single();

    if (!student) {
      // Create student profile
      const { data: newStudent } = await supabase
        .from('students')
        .insert({
          user_id: token,
          skills: [],
          interests: [],
        })
        .select()
        .single();

      student = newStudent;
    }

    return NextResponse.json(student);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    let { data: student } = await supabase
      .from('students')
      .select('*')
      .eq('user_id', token)
      .single();

    if (!student) {
      // Create new student
      const { data: newStudent, error: createError } = await supabase
        .from('students')
        .insert({
          user_id: token,
          ...body,
        })
        .select()
        .single();

      if (createError) throw createError;
      return NextResponse.json(newStudent);
    } else {
      // Update existing student
      const { data: updated, error: updateError } = await supabase
        .from('students')
        .update(body)
        .eq('user_id', token)
        .select()
        .single();

      if (updateError) throw updateError;
      return NextResponse.json(updated);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
