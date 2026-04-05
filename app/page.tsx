'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">Internship Scheme</h1>
          <div className="flex gap-4">
            {!session ? (
              <>
                <Link href="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-6">
            Find Your Perfect Internship with AI-Powered Matching
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Internship Scheme uses advanced AI algorithms to match students with internships that align perfectly with their skills, interests, and career goals.
          </p>
          <div className="flex gap-4 justify-center">
            {!session ? (
              <>
                <Link href="/register?role=student">
                  <Button size="lg" className="text-lg px-8 py-6">
                    Find Internships
                  </Button>
                </Link>
                <Link href="/register?role=recruiter">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                    Post Internship
                  </Button>
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose Internship Scheme?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our intelligent algorithm analyzes your profile and recommends internships that perfectly match your skills and interests.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Smart Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get personalized internship recommendations based on your experience, education, and career preferences.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Easy Application</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Apply to internships with a single click. Track all your applications in one place and get instant updates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>For Recruiters</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Post internship opportunities and connect with talented students. Our system helps you find the best matches.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resume Scoring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your resume is automatically analyzed and scored against job requirements to ensure the best matches.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join a community of students and professionals sharing experiences and opportunities.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Start Your Internship Journey?</h3>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students who have found their perfect internship through Internship Scheme.
          </p>
          {!session ? (
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Create Your Free Account
              </Button>
            </Link>
          ) : null}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Internship Scheme. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
