import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { supabase } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { messages, userId } = await request.json();

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Fetch student profile and internship recommendations for context
    const { data: student } = await supabase
      .from('students')
      .select('*')
      .eq('user_id', userId)
      .single();

    const { data: internships } = await supabase
      .from('internships')
      .select('*')
      .eq('status', 'active')
      .limit(5);

    const systemPrompt = `You are an expert career advisor and internship recommendation specialist. You help students navigate their internship search journey.

Your capabilities:
1. Explain internship recommendations based on the student's profile
2. Provide insights about specific companies and roles
3. Offer career guidance and skill development advice
4. Help students understand job requirements and how their skills match
5. Suggest interview preparation strategies
6. Answer questions about internship benefits and career growth

Student Profile:
${student ? `
- Skills: ${student.skills?.join(', ') || 'Not specified'}
- Interests: ${student.interests?.join(', ') || 'Not specified'}
- GPA: ${student.gpa || 'Not specified'}
- Preferred Locations: ${student.preferred_locations?.join(', ') || 'Not specified'}
- Industries: ${student.preferred_industries?.join(', ') || 'Not specified'}
` : 'Student profile not yet completed'}

Available Internships Context:
${internships?.slice(0, 3).map((i: any) => `
- ${i.title} at ${i.company}
  Location: ${i.location}
  Duration: ${i.duration}
  Stipend: ${i.stipend ? `$${i.stipend}/month` : 'Not specified'}
  Skills Needed: ${i.skills?.join(', ') || 'Various'}
`).join('\n') || 'Loading internships...'}

Be conversational, encouraging, and provide actionable advice. When discussing specific internships, highlight how they align with the student's profile and career goals.`;

    const result = streamText({
      model: 'openai/gpt-4-turbo',
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('AI Chat Error:', error);
    return new Response('Error processing request', { status: 500 });
  }
}
