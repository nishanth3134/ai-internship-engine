'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
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
            <span className="text-sm">{session?.user?.name}</span>
            <Button
              variant="outline"
              onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-semibold mb-6">Welcome, {session?.user?.name}!</h2>

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

          {(session?.user as any)?.role === 'recruiter' && (
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
