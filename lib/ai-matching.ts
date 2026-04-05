// AI-powered skill and job matching algorithm
// This algorithm calculates a match score between a student's profile and internship requirements

export interface StudentProfile {
  skills: string[];
  interests: string[];
  experience: string;
  university?: string;
  gpa?: number;
  preferences?: {
    location?: string;
    internshipType?: string;
    duration?: string;
  };
}

export interface InternshipProfile {
  title: string;
  skills: string[];
  requirements: string[];
  location: string;
  internshipType: string;
  duration: string;
}

function calculateSkillMatch(studentSkills: string[], requiredSkills: string[]): number {
  if (requiredSkills.length === 0) return 50;

  const studentSkillsLower = studentSkills.map((s) => s.toLowerCase());
  const matchedSkills = requiredSkills.filter((s) =>
    studentSkillsLower.includes(s.toLowerCase())
  );

  return (matchedSkills.length / requiredSkills.length) * 100;
}

function calculateInterestMatch(
  studentInterests: string[],
  jobTitle: string,
  jobDescription: string
): number {
  const jobText = `${jobTitle} ${jobDescription}`.toLowerCase();
  const interestMatches = studentInterests.filter((interest) =>
    jobText.includes(interest.toLowerCase())
  );

  return studentInterests.length > 0
    ? (interestMatches.length / studentInterests.length) * 100
    : 50;
}

function calculateLocationMatch(
  studentPreference: string | undefined,
  jobLocation: string
): number {
  if (!studentPreference) return 100; // No preference = full match
  if (studentPreference.toLowerCase() === jobLocation.toLowerCase()) return 100;
  return 50; // Partial match for different locations
}

function calculateTypeMatch(
  studentPreference: string | undefined,
  internshipType: string
): number {
  if (!studentPreference) return 100;
  if (studentPreference.toLowerCase() === internshipType.toLowerCase()) return 100;
  return 50;
}

function calculateDurationMatch(
  studentPreference: string | undefined,
  internshipDuration: string
): number {
  if (!studentPreference) return 100;
  if (studentPreference.toLowerCase() === internshipDuration.toLowerCase()) return 100;
  return 50;
}

export function calculateMatchScore(
  student: StudentProfile,
  internship: InternshipProfile
): number {
  // Weight different factors
  const weights = {
    skills: 0.35,
    interests: 0.2,
    location: 0.15,
    type: 0.15,
    duration: 0.15,
  };

  const skillMatch = calculateSkillMatch(student.skills, internship.skills);
  const interestMatch = calculateInterestMatch(
    student.interests,
    internship.title,
    ''
  );
  const locationMatch = calculateLocationMatch(
    student.preferences?.location,
    internship.location
  );
  const typeMatch = calculateTypeMatch(student.preferences?.internshipType, internship.internshipType);
  const durationMatch = calculateDurationMatch(student.preferences?.duration, internship.duration);

  const totalScore =
    skillMatch * weights.skills +
    interestMatch * weights.interests +
    locationMatch * weights.location +
    typeMatch * weights.type +
    durationMatch * weights.duration;

  return Math.round(totalScore);
}

export function extractKeywordsFromText(text: string): string[] {
  // Simple keyword extraction - in a real app, use NLP
  const words = text
    .toLowerCase()
    .split(/\W+/)
    .filter((word) => word.length > 3);

  // Remove common words
  const stopwords = new Set(['that', 'this', 'with', 'from', 'have', 'will']);
  return [...new Set(words)].filter((w) => !stopwords.has(w));
}

export function getRecommendationText(score: number): string {
  if (score >= 85) return 'Excellent match';
  if (score >= 70) return 'Good match';
  if (score >= 50) return 'Moderate match';
  return 'Limited match';
}
