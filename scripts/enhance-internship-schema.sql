-- Add more detailed fields to internships table
ALTER TABLE internships 
ADD COLUMN IF NOT EXISTS requirements TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS perks TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS salary_min INTEGER,
ADD COLUMN IF NOT EXISTS salary_max INTEGER,
ADD COLUMN IF NOT EXISTS application_deadline DATE,
ADD COLUMN IF NOT EXISTS positions_available INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS company_website VARCHAR,
ADD COLUMN IF NOT EXISTS company_logo_url TEXT,
ADD COLUMN IF NOT EXISTS work_mode VARCHAR DEFAULT 'hybrid',
ADD COLUMN IF NOT EXISTS key_responsibilities TEXT,
ADD COLUMN IF NOT EXISTS selection_process TEXT,
ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS applications_count INTEGER DEFAULT 0;

-- Rename skills_required to match naming convention
ALTER TABLE internships 
RENAME COLUMN skills_required TO skills;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_internships_status ON internships(status);
CREATE INDEX IF NOT EXISTS idx_internships_created_by ON internships(created_by);
CREATE INDEX IF NOT EXISTS idx_internships_created_at ON internships(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_internships_company ON internships(company);
CREATE INDEX IF NOT EXISTS idx_internships_location ON internships(location);

-- Add more detailed fields to students table
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS gpa DECIMAL(3,2),
ADD COLUMN IF NOT EXISTS graduation_date DATE,
ADD COLUMN IF NOT EXISTS linkedin_url VARCHAR,
ADD COLUMN IF NOT EXISTS github_url VARCHAR,
ADD COLUMN IF NOT EXISTS portfolio_url VARCHAR,
ADD COLUMN IF NOT EXISTS certifications TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS languages TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS preferred_companies TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS preferred_locations TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS profile_completion_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_open_to_opportunities BOOLEAN DEFAULT true;

-- Create indexes for student queries
CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_students_skills ON students USING GIN(skills);
CREATE INDEX IF NOT EXISTS idx_students_interests ON students USING GIN(interests);

-- Add enhanced fields to applications table
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS interview_date TIMESTAMP,
ADD COLUMN IF NOT EXISTS offer_details JSONB,
ADD COLUMN IF NOT EXISTS feedback TEXT,
ADD COLUMN IF NOT EXISTS rating_from_student INTEGER,
ADD COLUMN IF NOT EXISTS rating_from_recruiter INTEGER,
ADD COLUMN IF NOT EXISTS screening_score NUMERIC,
ADD COLUMN IF NOT EXISTS technical_score NUMERIC,
ADD COLUMN IF NOT EXISTS communication_score NUMERIC;

-- Create indexes for applications
CREATE INDEX IF NOT EXISTS idx_applications_student_id ON applications(student_id);
CREATE INDEX IF NOT EXISTS idx_applications_internship_id ON applications(internship_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);

-- Create a recommendations_cache table for storing pre-computed matches
CREATE TABLE IF NOT EXISTS recommendations_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id),
  internship_id UUID NOT NULL REFERENCES internships(id),
  match_score NUMERIC NOT NULL,
  match_breakdown JSONB,
  computed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  valid_until TIMESTAMP WITH TIME ZONE,
  UNIQUE(student_id, internship_id)
);

CREATE INDEX IF NOT EXISTS idx_recommendations_student ON recommendations_cache(student_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_valid_until ON recommendations_cache(valid_until);

-- Create saved_internships table for bookmarking
CREATE TABLE IF NOT EXISTS saved_internships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id),
  internship_id UUID NOT NULL REFERENCES internships(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  UNIQUE(student_id, internship_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_internships_student ON saved_internships(student_id);
CREATE INDEX IF NOT EXISTS idx_saved_internships_internship ON saved_internships(internship_id);
