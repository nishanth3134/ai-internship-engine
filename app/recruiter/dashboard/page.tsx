'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  positions_available: number;
  applicants: any[];
  status: string;
  created_at: string;
}

export default function RecruiterDashboardPage() {
  const router = useRouter();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/login');
      return;
    }

    setToken(storedToken);
    fetchInternships(storedToken);
  }, [router]);

  const fetchInternships = async (token: string) => {
    try {
      const response = await fetch('/api/internships?limit=100');
      if (response.ok) {
        const data = await response.json();
        // Filter to show only recruiter's postings (in a real app, add a separate endpoint)
        setInternships(data.internships || []);
      }
    } catch (error) {
      console.error('Error fetching internships:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'filled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/internships/create">
              <Button>Post New Internship</Button>
            </Link>
            <Button variant="outline" onClick={() => router.push('/')}>
              Back Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Internship Postings</h2>
          <p className="text-gray-600">Manage your internship opportunities and track applications</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p>Loading internships...</p>
          </div>
        ) : internships.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600 mb-4">You haven&apos;t posted any internships yet</p>
              <Link href="/internships/create">
                <Button>Post Your First Internship</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {internships.map((internship) => (
              <Card key={internship._id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{internship.title}</CardTitle>
                      <CardDescription>{internship.company}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(internship.status)}>
                      {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{internship.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Positions</p>
                      <p className="font-medium">{internship.positionsAvailable}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Applications</p>
                      <p className="font-medium">{internship.applicants?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Posted</p>
                      <p className="font-medium">{new Date(internship.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/recruiter/applications/${internship._id}`}>
                      <Button variant="outline" size="sm">
                        View Applications
                      </Button>
                    </Link>
                    <Link href={`/internships/${internship._id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => {
                      // TODO: Edit internship
                    }}>
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
