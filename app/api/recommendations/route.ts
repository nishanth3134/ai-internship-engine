import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { calculateMatchScore } from '@/lib/ai-matching';

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
      .select('*')
      .eq('user_id', token)
      .single();

    if (!student) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    // Get applied internships
    const { data: appliedApps } = await supabase
      .from('applications')
      .select('internship_id')
      .eq('student_id', student.id);

    const appliedIds = appliedApps?.map((app: any) => app.internship_id) || [];

    // Get active internships
    let query = supabase
      .from('internships')
      .select('*')
      .eq('status', 'active');

    if (appliedIds.length > 0) {
      query = query.not('id', 'in', `(${appliedIds.join(',')})`) as any;
    }

    const { data: internships } = await query;

    // Calculate match scores
    const recommendations = (internships || [])
      .map((internship) => ({
        internship,
        matchScore: calculateMatchScore(
          {
            skills: student.skills || [],
            interests: student.interests || [],
            experience: student.experience || 'Beginner',
            university: student.university || '',
            gpa: student.gpa || 0,
            preferences: student.preferences || {},
          },
          {
            title: internship.title,
            skills: internship.skills || [],
            requirements: internship.requirements || [],
            location: internship.location,
            internshipType: internship.internship_type,
            duration: internship.duration,
          }
        ),
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10) // Return top 10 recommendations
      .map((rec) => ({
        ...rec.internship,
        matchScore: rec.matchScore,
      }));

    return NextResponse.json(recommendations);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
