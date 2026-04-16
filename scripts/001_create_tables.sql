-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'recruiter')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create students table
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  skills TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  education TEXT DEFAULT '',
  gpa NUMERIC(3,2),
  preferred_location TEXT DEFAULT '',
  preferred_type TEXT DEFAULT '',
  preferred_duration TEXT DEFAULT '',
  resume_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create internships table
CREATE TABLE IF NOT EXISTS public.internships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  location TEXT,
  type TEXT,
  duration TEXT,
  requirements TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  stipend TEXT,
  deadline TIMESTAMPTZ,
  recruiter_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  internship_id UUID NOT NULL REFERENCES public.internships(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  cover_letter TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, internship_id)
);

-- Create recommendation_cache table
CREATE TABLE IF NOT EXISTS public.recommendation_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  recommendations JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  UNIQUE(student_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_cache ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (true);

-- RLS Policies for students table
CREATE POLICY "Students viewable by all" ON public.students
  FOR SELECT USING (true);

CREATE POLICY "Students can insert their own profile" ON public.students
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Students can update their own profile" ON public.students
  FOR UPDATE USING (true);

-- RLS Policies for internships table
CREATE POLICY "Internships viewable by all" ON public.internships
  FOR SELECT USING (true);

CREATE POLICY "Recruiters can insert internships" ON public.internships
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Recruiters can update their internships" ON public.internships
  FOR UPDATE USING (true);

CREATE POLICY "Recruiters can delete their internships" ON public.internships
  FOR DELETE USING (true);

-- RLS Policies for applications table
CREATE POLICY "Applications viewable by participants" ON public.applications
  FOR SELECT USING (true);

CREATE POLICY "Students can insert applications" ON public.applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Applications can be updated" ON public.applications
  FOR UPDATE USING (true);

-- RLS Policies for recommendation_cache table
CREATE POLICY "Cache viewable by student" ON public.recommendation_cache
  FOR SELECT USING (true);

CREATE POLICY "Cache can be inserted" ON public.recommendation_cache
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Cache can be updated" ON public.recommendation_cache
  FOR UPDATE USING (true);

CREATE POLICY "Cache can be deleted" ON public.recommendation_cache
  FOR DELETE USING (true);
