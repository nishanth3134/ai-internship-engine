'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Recommendation {
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
  match_score: number;
  match_reasons: string[];
}

export default function RecommendationsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/recommendations/enhanced', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError('Please complete your profile first');
            router.push('/profile');
            return;
          }
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        setStudent(data.student);
        setRecommendations(data.recommendations);
      } catch (err: any) {
        console.error('[v0] Error fetching recommendations:', err);
        setError(err.message || 'Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Generating personalized recommendations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Personalized Recommendations</h1>
          <p className="text-gray-600 mt-2">
            Based on your profile and skills, here are the best internship matches for you
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Card className="bg-red-50 border-red-200 mb-6">
            <CardContent className="pt-6">
              <p className="text-red-800">{error}</p>
            </CardContent>
          </Card>
        )}

        {recommendations.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600 mb-4">
                {student ? 'No internships match your profile yet.' : 'Please complete your profile to get recommendations.'}
              </p>
              <Link href="/profile">
                <Button>Complete Your Profile</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900">{rec.title}</h2>
                      <p className="text-lg text-gray-600">{rec.company}</p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{rec.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{rec.match_score}%</div>
                        <p className="text-xs text-gray-500">Match Score</p>
                      </div>
                      <Progress value={rec.match_score} className="w-32 mt-2" />
                    </div>
                  </div>

                  {/* Match Reasons */}
                  {rec.match_reasons && rec.match_reasons.length > 0 && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-semibold text-blue-900 mb-2">Why this matches:</p>
                      <ul className="space-y-1">
                        {rec.match_reasons.map((reason, idx) => (
                          <li key={idx} className="text-sm text-blue-800">
                            • {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 py-4 border-y border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900">{rec.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-semibold text-gray-900">{rec.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Stipend</p>
                      <p className="font-semibold text-gray-900">${rec.stipend.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="font-semibold text-gray-900">{rec.internship_type}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  {rec.skills && rec.skills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-900 mb-2">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {rec.skills.slice(0, 5).map((skill, idx) => (
                          <Badge key={idx} variant="secondary">{skill}</Badge>
                        ))}
                        {rec.skills.length > 5 && (
                          <Badge variant="outline">+{rec.skills.length - 5} more</Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="flex gap-2">
                    <Link href={`/internships/details/${rec.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">View Details</Button>
                    </Link>
                    <Link href={`/internships/details/${rec.id}`} className="flex-1">
                      <Button className="w-full">Apply Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Browse All */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Want to see more opportunities?</p>
          <Link href="/internships">
            <Button variant="outline" size="lg">Browse All Internships</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
