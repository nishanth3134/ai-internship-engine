'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, CheckCircle, BookOpen, Lightbulb, FileText } from 'lucide-react';
import Link from 'next/link';

const FAQs = [
  {
    question: 'How do I find internships on this platform?',
    answer:
      'Navigate to the Internships section to browse available opportunities. Use filters for location, company, and skills. Save internships you like, and apply directly through the platform.',
    category: 'Getting Started',
  },
  {
    question: 'How does the AI recommendation system work?',
    answer:
      'Our AI analyzes your skills, interests, GPA, and preferences to match you with internships. The matching score is based on skill alignment (40%), GPA requirements (20%), location (15%), internship type (15%), and interests (10%).',
    category: 'AI & Recommendations',
  },
  {
    question: 'How can I improve my match score?',
    answer:
      'Complete your profile with accurate skills, interests, and preferences. Add certifications, update your GPA, and specify your preferred work location and company types. Use the AI Assistant to get personalized guidance.',
    category: 'Profile & Matching',
  },
  {
    question: 'What should I include in my resume for internships?',
    answer:
      'Include relevant skills, projects, coursework, certifications, and any previous internship or work experience. Keep it concise (1 page), use clear formatting, and highlight accomplishments with metrics when possible.',
    category: 'Resume Tips',
  },
  {
    question: 'How do I prepare for internship interviews?',
    answer:
      'Research the company thoroughly, practice common interview questions, prepare 2-3 questions to ask, review your resume, and use the STAR method (Situation, Task, Action, Result) to answer behavioral questions.',
    category: 'Interview Prep',
  },
  {
    question: 'Can I track my applications?',
    answer:
      'Yes! Visit your Applications dashboard to see all internships you&apos;ve applied to, their current status (applied, shortlisted, accepted, rejected), and any feedback from recruiters.',
    category: 'Applications',
  },
];

const TUTORIALS = [
  {
    title: 'Complete Your Profile',
    description: 'Set up your profile to unlock personalized recommendations',
    steps: [
      'Go to Profile Settings',
      'Add your skills (use keywords from job descriptions)',
      'Enter your GPA and university',
      'List your interests and career goals',
      'Specify location and company preferences',
      'Upload or link your resume',
    ],
    icon: FileText,
  },
  {
    title: 'Get AI Recommendations',
    description: 'Let AI find the best internships for you',
    steps: [
      'Visit the Recommendations page',
      'Review AI-matched internships ranked by fit',
      'Read match explanations to understand why',
      'Click on internships to learn more',
      'Apply to opportunities that interest you',
      'Chat with the AI Assistant for more guidance',
    ],
    icon: Lightbulb,
  },
  {
    title: 'Apply Successfully',
    description: 'Maximize your chances with strong applications',
    steps: [
      'Research the company and role thoroughly',
      'Tailor your resume to the job description',
      'Write a compelling cover letter',
      'Apply early - earlier applications often get more attention',
      'Track your application status',
      'Follow up after 1-2 weeks if no response',
    ],
    icon: CheckCircle,
  },
];

const SKILLS_GUIDE = [
  {
    category: 'Technical Skills',
    items: [
      'Programming Languages (Python, JavaScript, Java, C++)',
      'Data Analysis Tools (Excel, SQL, Tableau, Power BI)',
      'Web Development (HTML, CSS, React, Node.js)',
      'Cloud Platforms (AWS, Google Cloud, Azure)',
      'Version Control (Git, GitHub)',
    ],
  },
  {
    category: 'Soft Skills',
    items: [
      'Communication and Presentation',
      'Teamwork and Collaboration',
      'Problem-Solving and Critical Thinking',
      'Time Management',
      'Adaptability and Learning Agility',
    ],
  },
  {
    category: 'Finance-Specific Skills',
    items: [
      'Financial Modeling and Valuation',
      'Excel Advanced Functions',
      'Bloomberg Terminal',
      'Market Analysis',
      'Regulatory Knowledge',
    ],
  },
  {
    category: 'Consulting-Specific Skills',
    items: [
      'Case Interview Preparation',
      'Business Acumen',
      'Analytical Framework',
      'Client Management',
      'Business Writing',
    ],
  },
];

export default function GuidanceHubPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [expandedTutorial, setExpandedTutorial] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Internship Guidance Hub</h1>
          <p className="text-lg text-blue-100">
            Learn how to find, apply, and succeed in internships
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Tabs defaultValue="faqs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="skills">Skills Guide</TabsTrigger>
          </TabsList>

          {/* FAQs Tab */}
          <TabsContent value="faqs" className="space-y-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Find answers to common questions about internships and our platform
              </p>
            </div>

            <div className="space-y-3">
              {FAQs.map((faq, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === index ? null : index)
                  }
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-blue-600 mb-1">
                          {faq.category}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          expandedFAQ === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </CardHeader>
                  {expandedFAQ === index && (
                    <CardContent>
                      <p className="text-gray-700">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tutorials Tab */}
          <TabsContent value="tutorials" className="space-y-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Step-by-Step Tutorials
              </h2>
              <p className="text-gray-600">
                Learn how to make the most of the platform
              </p>
            </div>

            <div className="grid gap-6">
              {TUTORIALS.map((tutorial, index) => {
                const IconComponent = tutorial.icon;
                return (
                  <Card
                    key={index}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() =>
                      setExpandedTutorial(
                        expandedTutorial === index ? null : index
                      )
                    }
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="bg-blue-100 p-3 rounded-lg mt-1">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {tutorial.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {tutorial.description}
                            </p>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                            expandedTutorial === index ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </CardHeader>
                    {expandedTutorial === index && (
                      <CardContent>
                        <ol className="space-y-3">
                          {tutorial.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex gap-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                {stepIndex + 1}
                              </span>
                              <span className="text-gray-700 pt-0.5">
                                {step}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <p className="text-gray-800 mb-4">
                  Need more personalized help? Chat with our AI Assistant!
                </p>
                <Link href="/ai-assistant">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Talk to AI Assistant
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Guide Tab */}
          <TabsContent value="skills" className="space-y-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Skills Development Guide
              </h2>
              <p className="text-gray-600">
                Key skills employers look for in interns
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {SKILLS_GUIDE.map((skillGroup, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      {skillGroup.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <li key={skillIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle>Development Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Months 1-2: Foundation
                  </h4>
                  <p className="text-gray-700">
                    Learn fundamental concepts and soft skills. Take free online courses.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Months 3-4: Build Projects
                  </h4>
                  <p className="text-gray-700">
                    Create practical projects to showcase skills on your resume and portfolio.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Months 5-6: Interview Prep
                  </h4>
                  <p className="text-gray-700">
                    Practice interviews, refine resume, and apply to internships strategically.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
