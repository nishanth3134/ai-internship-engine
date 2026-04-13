import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

interface InternshipMatch {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  internship_type: string;
  salary_min: number;
  salary_max: number;
  stipend: number;
  duration: string;
  skills: string[];
  perks: string[];
  match_score: number;
  match_reasons: string[];
}

function calculateMatchScore(student: any, internship: any): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Skills match (40% weight)
  if (student.skills && internship.skills) {
    const studentSkills = student.skills.map((s: string) => s.toLowerCase());
    const internshipSkills = internship.skills.map((s: string) => s.toLowerCase());
    const matchedSkills = studentSkills.filter((s: string) => 
      internshipSkills.some((is: string) => is.includes(s) || s.includes(is))
    );
    const skillsPercentage = matchedSkills.length / internshipSkills.length;
    score += skillsPercentage * 40;
    
    if (matchedSkills.length > 0) {
      reasons.push(`Matches ${matchedSkills.length} of ${internshipSkills.length} required skills`);
    }
  }

  // GPA match (20% weight)
  if (student.gpa && internship.min_gpa) {
    if (student.gpa >= internship.min_gpa) {
      score += 20;
      reasons.push(`GPA requirement met (${student.gpa} >= ${internship.min_gpa})`);
    } else {
      score += (student.gpa / internship.min_gpa) * 20;
    }
  }

  // Location preference (15% weight)
  if (student.preferred_locations && internship.location) {
    if (student.preferred_locations.some((loc: string) => 
      internship.location.toLowerCase().includes(loc.toLowerCase())
    )) {
      score += 15;
      reasons.push('Location matches your preferences');
    }
  }

  // Internship type preference (15% weight)
  if (student.internship_type_preference && internship.internship_type) {
    if (student.internship_type_preference.includes(internship.internship_type)) {
      score += 15;
      reasons.push(`Matches your ${internship.internship_type} internship preference`);
    }
  }

  // Industry interest (10% weight)
  if (student.interested_industries && internship.industry) {
    if (student.interested_industries.some((ind: string) => 
      internship.industry.toLowerCase().includes(ind.toLowerCase())
    )) {
      score += 10;
      reasons.push(`In your preferred industry: ${internship.industry}`);
    }
  }

  return {
    score: Math.min(100, Math.round(score)),
    reasons
  };
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get student profile
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('*')
      .eq('user_id', token)
      .single();

    if (studentError || !student) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    // Get all active internships
    const { data: internships, error: internshipsError } = await supabase
      .from('internships')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (internshipsError || !internships) {
      return NextResponse.json({ error: 'Failed to fetch internships' }, { status: 500 });
    }

    // Calculate match scores
    const matches: InternshipMatch[] = internships
      .map((internship: any) => {
        const { score, reasons } = calculateMatchScore(student, internship);
        return {
          id: internship.id,
          title: internship.title,
          company: internship.company,
          description: internship.description,
          location: internship.location,
          internship_type: internship.internship_type,
          salary_min: internship.salary_min,
          salary_max: internship.salary_max,
          stipend: internship.stipend,
          duration: internship.duration,
          skills: internship.skills,
          perks: internship.perks,
          match_score: score,
          match_reasons: reasons,
        };
      })
      .filter((m: InternshipMatch) => m.match_score > 0)
      .sort((a: InternshipMatch, b: InternshipMatch) => b.match_score - a.match_score)
      .slice(0, 10); // Top 10 recommendations

    // Cache recommendations (optional)
    if (matches.length > 0) {
      await supabase
        .from('recommendation_cache')
        .upsert({
          student_id: student.id,
          recommendations: matches,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'student_id' })
        .select();
    }

    return NextResponse.json({
      student: {
        id: student.id,
        name: student.full_name,
        skills: student.skills,
        gpa: student.gpa,
      },
      recommendations: matches,
      total_matches: matches.length,
    });
  } catch (error: any) {
    console.error('[v0] Recommendations error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
