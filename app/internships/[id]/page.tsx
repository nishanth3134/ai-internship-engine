'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

interface Internship {
  _id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  skills: string[];
  location: string;
  duration: string;
  stipend?: number;
  startDate: string;
  endDate: string;
  positionsAvailable: number;
  internshipType: string;
}

export default function InternshipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInternship();
  }, [params.id]);

  const fetchInternship = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/internships/${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setInternship(data);
    } catch (err) {
      setError('Failed to load internship');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setApplying(true);
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          internshipId: params.id,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to apply');
      }

      setApplied(true);
      setTimeout(() => router.push('/applications'), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Internship not found</p>
          <Button onClick={() => router.push('/internships')}>Back to Internships</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="outline" onClick={() => router.push('/internships')}>
            ← Back to Internships
          </Button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{internship.title}</CardTitle>
            <CardDescription className="text-lg">{internship.company}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {applied && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                Application submitted successfully!
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium text-lg">{internship.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium text-lg">{internship.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-medium text-lg">{internship.internshipType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Positions Available</p>
                <p className="font-medium text-lg">{internship.positionsAvailable}</p>
              </div>
              {internship.stipend && (
                <div>
                  <p className="text-sm text-gray-600">Stipend</p>
                  <p className="font-medium text-lg">₹{internship.stipend}/month</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">About the Internship</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{internship.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {internship.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <ul className="list-disc list-inside space-y-2">
                {internship.requirements.map((req, idx) => (
                  <li key={idx} className="text-gray-700">
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded border">
              <p className="text-sm text-gray-600 mb-2">
                Start: {new Date(internship.startDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                End: {new Date(internship.endDate).toLocaleDateString()}
              </p>
            </div>

            <div className="pt-6 border-t">
              <Button
                size="lg"
                onClick={handleApply}
                disabled={applying || applied}
                className="w-full"
              >
                {applying ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Applying...
                  </>
                ) : applied ? (
                  'Applied!'
                ) : (
                  'Apply Now'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
