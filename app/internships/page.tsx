'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend?: number;
  skills: string[];
  match_score?: number;
}

export default function InternshipsPage() {
  const router = useRouter();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showRecommended, setShowRecommended] = useState(false);

  useEffect(() => {
    fetchInternships();
  }, [search]);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const url = new URL('/api/internships', window.location.origin);
      if (search) url.searchParams.set('search', search);
      
      const response = await fetch(url);
      const data = await response.json();
      setInternships(data.internships || []);
    } catch (error) {
      console.error('Error fetching internships:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/recommendations');
      if (response.ok) {
        const data = await response.json();
        setInternships(data);
        setShowRecommended(true);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Internship Scheme</h1>
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">
            {showRecommended ? 'Recommended Internships' : 'All Internships'}
          </h2>

          <div className="flex gap-4 mb-6">
            <Input
              type="search"
              placeholder="Search internships..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
            <Button onClick={fetchRecommendations} variant="outline">
              Get Recommendations
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p>Loading internships...</p>
          </div>
        ) : internships.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No internships found</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {internships.map((internship) => (
              <Card key={internship.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{internship.title}</CardTitle>
                      <CardDescription>{internship.company}</CardDescription>
                    </div>
                    {internship.match_score !== undefined && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {internship.match_score}%
                        </div>
                        <div className="text-xs text-gray-500">Match Score</div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{internship.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-medium">{internship.duration}</p>
                    </div>
                    {internship.stipend && (
                      <div>
                        <p className="text-sm text-gray-600">Stipend</p>
                        <p className="font-medium">₹{internship.stipend}/month</p>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {internship.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href={`/internships/${internship.id}`}>
                    <Button className="w-full">View Details & Apply</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
