import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Internship } from '@/lib/models/Internship';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth-config';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const skills = searchParams.get('skills')?.split(',') || [];

    const query: any = { status: 'active' };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (skills.length > 0) {
      query.skills = { $in: skills };
    }

    const skip = (page - 1) * limit;
    const internships = await Internship.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    const total = await Internship.countDocuments(query);

    return NextResponse.json({
      internships,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session || (session.user as any).role !== 'recruiter') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { title, company, description, requirements, skills, location, duration, stipend, startDate, endDate, positionsAvailable, internshipType } = body;

    if (!title || !company || !description || !location || !duration || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const internship = new Internship({
      title,
      company,
      description,
      requirements: requirements || [],
      skills: skills || [],
      location,
      duration,
      stipend: stipend || 0,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      positionsAvailable: positionsAvailable || 1,
      internshipType,
      createdBy: (session.user as any).id,
    });

    await internship.save();

    return NextResponse.json(internship, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
