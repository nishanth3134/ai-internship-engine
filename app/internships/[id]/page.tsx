'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  skills: string[];
  location: string;
  duration: string;
  type: string;
  stipend: string;
  deadline: string;
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
      console.log('[v0] Fetched internship:', data);
      setInternship(data);
    } catch (err) {
      console.error('[v0] Error fetching internship:', err);
      setError('Failed to load internship');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setApplying(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login to apply');
        return;
      }

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          internship_id: params.id,
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <Spinner />
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <p className="text-lg mb-4 text-gray-700">Internship not found</p>
          <Button onClick={() => router.push('/internships')}>Back to Internships</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => router.push('/internships')} className="text-gray-700">
            ← Back to Internships
          </Button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-10">
            <h1 className="text-3xl font-bold text-white mb-2">{internship.title}</h1>
            <p className="text-blue-100 text-lg">{internship.company}</p>
          </div>

          <div className="px-8 py-8 space-y-8">
            {/* Error Messages */}
            {applied && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                ✓ Application submitted successfully! Redirecting...
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Key Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-200">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Location</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{internship.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Duration</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{internship.duration}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Type</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{internship.type || 'Full-time'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Stipend</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{internship.stipend}</p>
              </div>
            </div>

            {/* About Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Internship</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{internship.description}</p>
            </div>

            {/* Required Skills */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-3">
                {internship.skills && internship.skills.length > 0 ? (
                  internship.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills specified</p>
                )}
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-2">
                {internship.requirements && internship.requirements.length > 0 ? (
                  internship.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <span className="text-blue-600 mr-3 font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No specific requirements</p>
                )}
              </ul>
            </div>

            {/* Deadline */}
            {internship.deadline && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-600">APPLICATION DEADLINE</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {new Date(internship.deadline).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}

            {/* Apply Button */}
            <div className="pt-6 border-t border-gray-200">
              <Button
                size="lg"
                onClick={handleApply}
                disabled={applying || applied}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                {applying ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Applying...
                  </>
                ) : applied ? (
                  '✓ Applied Successfully!'
                ) : (
                  'Apply Now'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
