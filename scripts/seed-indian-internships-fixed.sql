-- Seed Indian Companies Internships and Applications
-- This script adds 15 Indian tech company internships with sample student applications

-- Insert internship opportunities from Indian companies
INSERT INTO internships (
  id, title, company, location, description, requirements, 
  skills, duration, stipend, positions_available, status, created_at, created_by
) VALUES
-- TCS
(
  gen_random_uuid(), 'Software Developer Intern', 'Tata Consultancy Services', 'Bangalore',
  'Build scalable software solutions at India''s largest IT company',
  'B.Tech in CS/IT',
  ARRAY['Java', 'Python', 'SQL'],
  '3 months', 15000, 5, 'active', NOW(), 
  (SELECT id FROM users WHERE email = 'tcs@internships.com' LIMIT 1)
),
-- Infosys
(
  gen_random_uuid(), 'Backend Engineer Intern', 'Infosys', 'Pune',
  'Work on cloud-based solutions and microservices',
  'B.Tech/M.Tech in IT',
  ARRAY['Python', 'Node.js', 'MongoDB'],
  '3 months', 18000, 3, 'active', NOW(),
  (SELECT id FROM users WHERE email = 'infosys@internships.com' LIMIT 1)
),
-- Flipkart
(
  gen_random_uuid(), 'Frontend Engineer Intern', 'Flipkart', 'Bangalore',
  'Build user-facing features for India''s largest e-commerce platform',
  'B.Tech in CS',
  ARRAY['React', 'JavaScript', 'CSS'],
  '4 months', 25000, 8, 'active', NOW(),
  (SELECT id FROM users WHERE email = 'flipkart@internships.com' LIMIT 1)
),
-- OYO
(
  gen_random_uuid(), 'Product Manager Intern', 'OYO', 'Gurgaon',
  'Own product strategy for hospitality tech startup',
  'B.Tech/MBA',
  ARRAY['Data Analysis', 'Excel', 'Communication'],
  '3 months', 20000, 2, 'active', NOW(),
  (SELECT id FROM users WHERE email = 'oyo@internships.com' LIMIT 1)
),
-- Swiggy
(
  gen_random_uuid(), 'Data Science Intern', 'Swiggy', 'Bangalore',
  'Work on recommendation systems and analytics',
  'B.Tech/B.Sc in relevant field',
  ARRAY['Python', 'Machine Learning', 'SQL'],
  '3 months', 22000, 4, 'active', NOW(),
  (SELECT id FROM users WHERE email = 'swiggy@internships.com' LIMIT 1)
),
-- PhonePe
(
  gen_random_uuid(), 'Full Stack Engineer Intern', 'PhonePe', 'Bangalore',
  'Build payment solutions for millions of users',
  'B.Tech in CS',
  ARRAY['Java', 'React', 'AWS'],
  '4 months', 28000, 5, 'active', NOW(),
  (SELECT id FROM users WHERE email = 'phonepe@internships.com' LIMIT 1)
),
-- Amazon India
(
  gen_random_uuid(), 'Cloud Infrastructure Intern', 'Amazon India', 'Bangalore',
  'Work on AWS infrastructure and cloud services',
  'B.Tech in CS/IT',
  ARRAY['AWS', 'Linux', 'Python'],
  '3 months', 30000, 6, 'active', NOW(),
  (SELECT id FROM users WHERE email = 'amazon@internships.com' LIMIT 1)
),
-- Google India
(
  gen_random_uuid(), 'Software Engineer Intern', 'Google India', 'Bangalore',
  'Work on products used by billions of users',
  'B.Tech in CS',
  ARRAY['C++', 'Java', 'Algorithms'],
  '3 months', 35000, 3, 'active', NOW(),
  (SELECT id FROM users WHERE email = 'google@internships.com' LIMIT 1)
),
-- Microsoft India
(
  gen_random_uuid(), 'Cloud Solution Architect Intern', 'Microsoft India', 'Hyderabad',
  'Design cloud solutions for enterprise clients',
  'B.Tech/M.Tech',
  ARRAY['Azure', 'Cloud Architecture', 'PowerPoint'],
  '4 months', 32000, 4, 'active', NOW(),
  (SELECT id FROM users WHERE email = 'microsoft@internships.com' LIMIT 1)
),
-- Paytm
(
  gen_random_uuid(), 'Mobile App Developer Intern', 'Paytm', 'Noida',
  'Build mobile features for India''s leading fintech platform',
  'B.Tech in CS',
  ARRAY['Flutter', 'Android', 'Kotlin'],
  '3 months', 20000, 5, 'active', NOW(),
  (SELECT id FROM users WHERE email = 'paytm@internships.com' LIMIT 1)
),
-- HCL Technologies
(
  gen_random_uuid(), 'DevOps Engineer Intern', 'HCL Technologies', 'Noida',
  'Work on CI/CD pipelines and infrastructure automation',
  'B.Tech in IT',
  ARRAY['Docker', 'Kubernetes', 'Jenkins'],
  '3 months', 16000, 3, 'active', NOW(),
  (SELECT id FROM users WHERE email = 'hcl@internships.com' LIMIT 1)
),
-- Accenture India
(
  gen_random_uuid(), 'Business Analyst Intern', 'Accenture', 'Bangalore',
  'Analyze business requirements and provide solutions',
  'B.Tech/B.Com',
  ARRAY['Communication', 'Excel', 'Analysis'],
  '3 months', 17000, 4, 'active', NOW(),
  (SELECT id FROM users WHERE email = 'accenture@internships.com' LIMIT 1)
),
-- Unacademy
(
  gen_random_uuid(), 'Content Creator Intern', 'Unacademy', 'Bangalore',
  'Create educational content for India''s largest learning platform',
  'B.Tech/B.A in relevant field',
  ARRAY['Video Production', 'Communication', 'Subject Expertise'],
  '2 months', 12000, 6, 'active', NOW(),
  (SELECT id FROM users WHERE email = 'unacademy@internships.com' LIMIT 1)
),
-- Dunzo
(
  gen_random_uuid(), 'Operations Manager Intern', 'Dunzo', 'Bangalore',
  'Manage last-mile delivery and logistics',
  'B.Tech/B.Com',
  ARRAY['Operations', 'Excel', 'Communication'],
  '3 months', 13000, 3, 'active', NOW(),
  (SELECT id FROM users WHERE email = 'dunzo@internships.com' LIMIT 1)
),
-- Nykaa
(
  gen_random_uuid(), 'Digital Marketing Intern', 'Nykaa', 'Mumbai',
  'Work on digital marketing campaigns for India''s largest beauty e-commerce',
  'B.Tech/BBA',
  ARRAY['Social Media', 'Content Writing', 'Analytics'],
  '3 months', 14000, 4, 'active', NOW(),
  (SELECT id FROM users WHERE email = 'nykaa@internships.com' LIMIT 1)
);

-- Create sample student users and profiles
INSERT INTO users (id, email, password_hash, name, role, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440001'::uuid, 'student1@example.com', 'hashed_password', 'Rajesh Kumar', 'student', NOW()),
('550e8400-e29b-41d4-a716-446655440002'::uuid, 'student2@example.com', 'hashed_password', 'Priya Singh', 'student', NOW()),
('550e8400-e29b-41d4-a716-446655440003'::uuid, 'student3@example.com', 'hashed_password', 'Aman Patel', 'student', NOW()),
('550e8400-e29b-41d4-a716-446655440004'::uuid, 'student4@example.com', 'hashed_password', 'Neha Sharma', 'student', NOW()),
('550e8400-e29b-41d4-a716-446655440005'::uuid, 'student5@example.com', 'hashed_password', 'Vikram Gupta', 'student', NOW())
ON CONFLICT DO NOTHING;

-- Create student profiles
INSERT INTO students (id, user_id, skills, interests) VALUES
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001'::uuid, ARRAY['Java', 'Python', 'SQL'], ARRAY['Backend', 'Databases']),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440002'::uuid, ARRAY['React', 'JavaScript', 'CSS'], ARRAY['Frontend', 'UI/UX']),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440003'::uuid, ARRAY['Python', 'Machine Learning', 'Analytics'], ARRAY['Data Science', 'AI']),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440004'::uuid, ARRAY['Communication', 'Leadership', 'Analysis'], ARRAY['Product Management', 'Strategy']),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440005'::uuid, ARRAY['Java', 'Spring Boot', 'Microservices'], ARRAY['Backend', 'Cloud'])
ON CONFLICT DO NOTHING;
