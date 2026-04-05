import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Student } from '@/lib/models/Student';
import { Internship } from '@/lib/models/Internship';
import { Application } from '@/lib/models/Application';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth-config';
import { calculateMatchScore } from '@/lib/ai-matching';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session || (session.user as any).role !== 'student') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const student = await Student.findOne({ userId: (session.user as any).id });

    if (!student) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    // Get applied internships to exclude from recommendations
    const appliedInternships = await Application.find({ studentId: student._id }).select(
      'internshipId'
    );
    const appliedIds = appliedInternships.map((app) => app.internshipId);

    // Get active internships, excluding already applied ones
    const internships = await Internship.find({
      status: 'active',
      _id: { $nin: appliedIds },
    });

    // Calculate match scores
    const recommendations = internships
      .map((internship) => ({
        internship,
        matchScore: calculateMatchScore(
          {
            skills: student.skills,
            interests: student.interests,
            experience: student.experience,
            university: student.university,
            gpa: student.gpa,
            preferences: student.preferences,
          },
          {
            title: internship.title,
            skills: internship.skills,
            requirements: internship.requirements,
            location: internship.location,
            internshipType: internship.internshipType,
            duration: internship.duration,
          }
        ),
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10) // Return top 10 recommendations
      .map((rec) => ({
        ...rec.internship.toObject(),
        matchScore: rec.matchScore,
      }));

    return NextResponse.json(recommendations);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
