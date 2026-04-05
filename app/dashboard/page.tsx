'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Internship Scheme</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">{userData?.name || 'User'}</span>
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem('token');
                router.push('/login');
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-semibold mb-6">Welcome, {userData?.name || 'User'}!</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Browse Internships</CardTitle>
              <CardDescription>Find internships that match your skills</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push('/internships')}>
                View All Internships
              </Button>
            </CardContent>
          </Card>

          {userData?.role === 'recruiter' && (
            <Card>
              <CardHeader>
                <CardTitle>Post an Internship</CardTitle>
                <CardDescription>Create a new internship opportunity</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => router.push('/internships/create')}>
                  Post Internship
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push('/profile')}>
                View Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
              <CardDescription>Track your internship applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push('/applications')}>
                View Applications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
