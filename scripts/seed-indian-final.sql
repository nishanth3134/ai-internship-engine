-- Seed Indian Internship Companies and Data

-- First, create recruiter users for Indian companies
INSERT INTO users (email, password_hash, name, role, created_at)
VALUES 
  ('tcs@tcs.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i', 'TCS Recruiting', 'recruiter', NOW()),
  ('infosys@infosys.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i', 'Infosys HR', 'recruiter', NOW()),
  ('flipkart@flipkart.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i', 'Flipkart Careers', 'recruiter', NOW()),
  ('oyo@oyo.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i', 'OYO Internships', 'recruiter', NOW()),
  ('swiggy@swiggy.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i', 'Swiggy Talent', 'recruiter', NOW()),
  ('phonepe@phonepe.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i', 'PhonePe Recruitment', 'recruiter', NOW()),
  ('amazon@amazon.in', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i', 'Amazon India', 'recruiter', NOW()),
  ('google@google.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i', 'Google India', 'recruiter', NOW()),
  ('microsoft@microsoft.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i', 'Microsoft India', 'recruiter', NOW()),
  ('paytm@paytm.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i', 'Paytm Careers', 'recruiter', NOW())
ON CONFLICT (email) DO NOTHING;

-- Create student users for demo applications
INSERT INTO users (email, password_hash, name, role, created_at)
VALUES 
  ('student1@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i', 'Arjun Sharma', 'student', NOW()),
  ('student2@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i', 'Priya Verma', 'student', NOW()),
  ('student3@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i', 'Rajesh Kumar', 'student', NOW()),
  ('student4@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i', 'Neha Patel', 'student', NOW()),
  ('student5@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i', 'Vikas Singh', 'student', NOW())
ON CONFLICT (email) DO NOTHING;

-- Create student profiles
INSERT INTO students (user_id, skills, interests, gpa, experience)
SELECT id, ARRAY['Python', 'Java', 'Data Structures'], ARRAY['Finance', 'Analytics'], 3.8, 'Intermediate'
FROM users WHERE email = 'student1@email.com'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO students (user_id, skills, interests, gpa, experience)
SELECT id, ARRAY['JavaScript', 'React', 'Node.js'], ARRAY['Web Development', 'UI/UX'], 3.9, 'Advanced'
FROM users WHERE email = 'student2@email.com'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO students (user_id, skills, interests, gpa, experience)
SELECT id, ARRAY['Machine Learning', 'Python', 'TensorFlow'], ARRAY['AI', 'Data Science'], 3.7, 'Intermediate'
FROM users WHERE email = 'student3@email.com'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO students (user_id, skills, interests, gpa, experience)
SELECT id, ARRAY['Product Management', 'Analytics', 'SQL'], ARRAY['Product', 'Strategy'], 3.6, 'Beginner'
FROM users WHERE email = 'student4@email.com'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO students (user_id, skills, interests, gpa, experience)
SELECT id, ARRAY['Mobile Development', 'Android', 'Kotlin'], ARRAY['Mobile Apps', 'Backend'], 3.8, 'Intermediate'
FROM users WHERE email = 'student5@email.com'
ON CONFLICT (user_id) DO NOTHING;

-- Now insert internships using recruiter user IDs
-- TCS Internships
INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Software Developer Intern', 'TCS', 'Develop and maintain Java applications for enterprise clients', 'B.Tech/M.Tech in CS/IT', ARRAY['Java', 'SQL', 'Spring Boot'], 'Pune, India', '6 months', 50000, 20, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'tcs@tcs.com';

INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Data Analytics Intern', 'TCS', 'Analyze business data and create insights for clients', 'B.Tech/B.Sc in any field', ARRAY['SQL', 'Python', 'Tableau'], 'Mumbai, India', '3 months', 40000, 15, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'tcs@tcs.com';

-- Infosys Internships
INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Systems Engineer Intern', 'Infosys', 'Work on cloud and infrastructure projects', 'B.Tech in CS/IT/ECE', ARRAY['AWS', 'Linux', 'DevOps'], 'Bangalore, India', '6 months', 55000, 25, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'infosys@infosys.com';

INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Testing Intern', 'Infosys', 'QA and testing of enterprise applications', 'Any B.Tech/B.Sc', ARRAY['Manual Testing', 'Selenium', 'Java'], 'Hyderabad, India', '3 months', 35000, 20, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'infosys@infosys.com';

-- Flipkart Internships
INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Backend Engineer Intern', 'Flipkart', 'Build scalable backend systems for e-commerce platform', 'B.Tech CS/IT', ARRAY['Java', 'Spring', 'Microservices'], 'Bangalore, India', '6 months', 75000, 15, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'flipkart@flipkart.com';

INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Product Manager Intern', 'Flipkart', 'Work on product strategy and development', 'Any graduate', ARRAY['Product Management', 'Analytics', 'Communication'], 'Bangalore, India', '4 months', 60000, 8, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'flipkart@flipkart.com';

-- OYO Internships
INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Full Stack Developer Intern', 'OYO', 'Build web applications for hotel management', 'B.Tech CS/IT', ARRAY['React', 'Node.js', 'MongoDB'], 'Gurugram, India', '5 months', 65000, 12, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'oyo@oyo.com';

INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Business Analytics Intern', 'OYO', 'Analyze market trends and business metrics', 'Any graduate', ARRAY['Excel', 'SQL', 'Tableau'], 'Gurugram, India', '3 months', 45000, 10, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'oyo@oyo.com';

-- Swiggy Internships
INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Android Developer Intern', 'Swiggy', 'Develop Android features for food delivery app', 'B.Tech CS/IT', ARRAY['Android', 'Kotlin', 'Java'], 'Bangalore, India', '6 months', 70000, 10, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'swiggy@swiggy.com';

INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Supply Chain Intern', 'Swiggy', 'Optimize logistics and supply chain operations', 'Any B.Tech/MBA', ARRAY['Logistics', 'Analytics', 'SAP'], 'Bangalore, India', '4 months', 50000, 8, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'swiggy@swiggy.com';

-- PhonePe Internships
INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Machine Learning Intern', 'PhonePe', 'Build ML models for fraud detection and recommendation systems', 'B.Tech CS/IT or M.Tech', ARRAY['Python', 'TensorFlow', 'ML'], 'Bangalore, India', '6 months', 80000, 8, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'phonepe@phonepe.com';

INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Data Engineer Intern', 'PhonePe', 'Work with big data and data pipeline infrastructure', 'B.Tech CS/IT', ARRAY['Spark', 'Hadoop', 'Python'], 'Bangalore, India', '5 months', 75000, 6, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'phonepe@phonepe.com';

-- Amazon Internships
INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Software Development Engineer Intern', 'Amazon', 'Build scalable distributed systems on AWS', 'B.Tech CS/IT', ARRAY['Java', 'AWS', 'System Design'], 'Bangalore, India', '6 months', 100000, 20, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'amazon@amazon.in';

-- Google Internships
INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Software Engineer Intern', 'Google', 'Work on Google Cloud and infrastructure projects', 'B.Tech CS/IT', ARRAY['C++', 'Python', 'Algorithms'], 'Bangalore, India', '6 months', 120000, 15, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'google@google.com';

-- Microsoft Internships
INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Cloud Solutions Architect Intern', 'Microsoft', 'Design Azure cloud solutions for enterprise clients', 'B.Tech CS/IT', ARRAY['Azure', '.NET', 'Cloud Architecture'], 'Hyderabad, India', '6 months', 110000, 10, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'microsoft@microsoft.com';

-- Paytm Internships
INSERT INTO internships (title, company, description, requirements, skills, location, duration, stipend, positions_available, internship_type, status, created_by, created_at)
SELECT 'Backend Developer Intern', 'Paytm', 'Develop payment processing and fintech backend systems', 'B.Tech CS/IT', ARRAY['Java', 'Microservices', 'Payment APIs'], 'Noida, India', '6 months', 70000, 12, 'Full-time', 'active', id, NOW()
FROM users WHERE email = 'paytm@paytm.com';

-- Create sample applications
INSERT INTO applications (student_id, internship_id, status, created_at)
SELECT s.id, i.id, 'applied', NOW()
FROM students s
JOIN users su ON s.user_id = su.id
JOIN internships i ON i.company = 'TCS'
WHERE su.email = 'student1@email.com'
LIMIT 1;

INSERT INTO applications (student_id, internship_id, status, created_at)
SELECT s.id, i.id, 'shortlisted', NOW()
FROM students s
JOIN users su ON s.user_id = su.id
JOIN internships i ON i.company = 'Flipkart'
WHERE su.email = 'student2@email.com'
LIMIT 1;

INSERT INTO applications (student_id, internship_id, status, created_at)
SELECT s.id, i.id, 'accepted', NOW()
FROM students s
JOIN users su ON s.user_id = su.id
JOIN internships i ON i.company = 'PhonePe'
WHERE su.email = 'student3@email.com'
LIMIT 1;

INSERT INTO applications (student_id, internship_id, status, created_at)
SELECT s.id, i.id, 'applied', NOW()
FROM students s
JOIN users su ON s.user_id = su.id
JOIN internships i ON i.company = 'Amazon'
WHERE su.email = 'student4@email.com'
LIMIT 1;

INSERT INTO applications (student_id, internship_id, status, created_at)
SELECT s.id, i.id, 'shortlisted', NOW()
FROM students s
JOIN users su ON s.user_id = su.id
JOIN internships i ON i.company = 'Google'
WHERE su.email = 'student5@email.com'
LIMIT 1;
