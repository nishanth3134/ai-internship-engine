'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function InternshipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [internship, setInternship] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await fetch(`/api/internships/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch internship');
        const data = await response.json();
        setInternship(data);
      } catch (error) {
        console.error('[v0] Error fetching internship:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [params.id]);

  const handleApply = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    setApplying(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          internshipId: params.id,
        }),
      });

      if (!response.ok) throw new Error('Failed to apply');
      alert('Application submitted successfully!');
      router.push('/applications');
    } catch (error) {
      console.error('[v0] Error applying:', error);
      alert('Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading internship details...</p>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p>Internship not found</p>
        <Link href="/internships">
          <Button>Back to Internships</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{internship.title}</h1>
              <p className="text-xl text-gray-600 mt-1">{internship.company}</p>
              <div className="flex gap-2 mt-4">
                <Badge variant="default">{internship.internship_type}</Badge>
                <Badge variant="secondary">{internship.duration}</Badge>
                <Badge variant="secondary">{internship.location}</Badge>
              </div>
            </div>
            <Button onClick={handleApply} disabled={applying} size="lg">
              {applying ? 'Applying...' : 'Apply Now'}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About this Internship</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{internship.description}</p>
                </div>

                {internship.learning_outcomes && internship.learning_outcomes.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">What You'll Learn</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {internship.learning_outcomes.map((outcome: string, idx: number) => (
                        <li key={idx}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* About Company */}
            {internship.about_company && (
              <Card>
                <CardHeader>
                  <CardTitle>About {internship.company}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{internship.about_company}</p>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {internship.requirements && internship.requirements.map((req: string, idx: number) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Skills */}
            {internship.skills && internship.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((skill: string, idx: number) => (
                      <Badge key={idx} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Position Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Stipend</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${internship.stipend.toLocaleString()}
                  </p>
                </div>

                {internship.salary_min && internship.salary_max && (
                  <div>
                    <p className="text-sm text-gray-500">Salary Range</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${internship.salary_min.toLocaleString()} - ${internship.salary_max.toLocaleString()}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500">Positions Available</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {internship.positions_available}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="text-lg font-semibold text-gray-900">{internship.duration}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Dates</p>
                  <p className="text-sm text-gray-900">
                    {new Date(internship.start_date).toLocaleDateString()} - {new Date(internship.end_date).toLocaleDateString()}
                  </p>
                </div>

                {internship.min_gpa && (
                  <div>
                    <p className="text-sm text-gray-500">Minimum GPA</p>
                    <p className="text-lg font-semibold text-gray-900">{internship.min_gpa}</p>
                  </div>
                )}

                {internship.work_schedule && (
                  <div>
                    <p className="text-sm text-gray-500">Schedule</p>
                    <p className="text-sm text-gray-900">{internship.work_schedule}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Perks */}
            {internship.perks && internship.perks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Perks & Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {internship.perks.map((perk: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-500 mt-1">✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {internship.host_name && (
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-sm font-semibold text-gray-900">{internship.host_name}</p>
                  </div>
                )}
                {internship.host_email && (
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${internship.host_email}`} className="text-sm text-blue-600 hover:underline">
                      {internship.host_email}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
