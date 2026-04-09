'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';

interface Application {
  id: string;
  internship_id: any;
  student_id: {
    id: string;
    user_id: {
      name: string;
      email: string;
    };
    skills: string[];
    experience: string;
    university: string;
    gpa: number;
  };
  status: string;
  created_at: string;
  match_score: number;
  resume?: string;
  cover_letter?: string;
}

export default function ApplicationsReviewPage() {
  const params = useParams();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [internship, setInternship] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/login');
      return;
    }

    setToken(storedToken);
  }, [router]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchData();
    }
  }, [status, router]);

  const fetchData = async () => {
    try {
      // Fetch internship details
      const internshipRes = await fetch(`/api/internships/${params.internshipId}`);
      if (internshipRes.ok) {
        setInternship(await internshipRes.ok);
      }

      // Fetch applications - in a real app, create a dedicated endpoint
      // For now, fetch all and filter
      const applicationsRes = await fetch(`/api/applications?internshipId=${params.internshipId}`);
      if (applicationsRes.ok) {
        setApplications(await applicationsRes.json());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updated = await response.json();
        setApplications(
          applications.map((app) => (app._id === applicationId ? updated : app))
        );
      }
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const filteredApplications =
    selectedStatus === 'all'
      ? applications
      : applications.filter((app) => app.status === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'shortlisted':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Applications Review</h1>
          <Button variant="outline" onClick={() => router.push('/recruiter/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex gap-2">
          <Button
            variant={selectedStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedStatus('all')}
          >
            All ({applications.length})
          </Button>
          <Button
            variant={selectedStatus === 'applied' ? 'default' : 'outline'}
            onClick={() => setSelectedStatus('applied')}
          >
            Applied ({applications.filter((a) => a.status === 'applied').length})
          </Button>
          <Button
            variant={selectedStatus === 'shortlisted' ? 'default' : 'outline'}
            onClick={() => setSelectedStatus('shortlisted')}
          >
            Shortlisted ({applications.filter((a) => a.status === 'shortlisted').length})
          </Button>
          <Button
            variant={selectedStatus === 'accepted' ? 'default' : 'outline'}
            onClick={() => setSelectedStatus('accepted')}
          >
            Accepted ({applications.filter((a) => a.status === 'accepted').length})
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Spinner />
          </div>
        ) : filteredApplications.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600">No applications found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredApplications.sort((a, b) => b.matchScore - a.matchScore).map((app) => (
              <Card key={app._id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle>{app.studentId.userId.name}</CardTitle>
                      <CardDescription>{app.studentId.userId.email}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {app.matchScore}%
                      </div>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">University</p>
                      <p className="font-medium">{app.studentId.university || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">GPA</p>
                      <p className="font-medium">{app.studentId.gpa || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-medium">{app.studentId.experience}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {app.studentId.skills?.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={app.status === 'shortlisted' ? 'default' : 'outline'}
                      onClick={() => handleStatusChange(app._id, 'shortlisted')}
                    >
                      Shortlist
                    </Button>
                    <Button
                      size="sm"
                      variant={app.status === 'accepted' ? 'default' : 'outline'}
                      onClick={() => handleStatusChange(app._id, 'accepted')}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant={app.status === 'rejected' ? 'destructive' : 'outline'}
                      onClick={() => handleStatusChange(app._id, 'rejected')}
                    >
                      Reject
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
