-- Seed Indian-based companies with internship opportunities
-- This script adds 15 Indian companies with internship listings and sample applications

-- First, create recruiter users for Indian companies
WITH recruiters AS (
  INSERT INTO users (id, email, name, role, password_hash, created_at)
  VALUES
    (gen_random_uuid(), 'hr@tcs.com', 'TCS Recruitment', 'recruiter', '$2a$10$mock', now()),
    (gen_random_uuid(), 'careers@infosys.com', 'Infosys Careers', 'recruiter', '$2a$10$mock', now()),
    (gen_random_uuid(), 'recruitment@flipkart.com', 'Flipkart HR', 'recruiter', '$2a$10$mock', now()),
    (gen_random_uuid(), 'jobs@oyo.com', 'OYO Recruitment', 'recruiter', '$2a$10$mock', now()),
    (gen_random_uuid(), 'careers@swiggy.com', 'Swiggy HR', 'recruiter', '$2a$10$mock', now())
  RETURNING id
)
-- Insert internships for each company
INSERT INTO internships (
  title, company, description, requirements, skills, location, 
  duration, stipend, positions_available, internship_type, status, created_by, created_at
)
SELECT 
  'Software Development Intern', 'TCS', 
  'Join TCS as a Software Development Intern and work on enterprise applications. Gain hands-on experience with latest technologies and mentorship from industry experts.',
  ARRAY['B.Tech/B.Sc in Computer Science', 'Strong OOPS concepts', '60% aggregate'],
  ARRAY['Java', 'SQL', 'Core Java', 'Problem Solving'],
  'Bangalore, India', '3 months', 25000, 50, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1), now()
UNION ALL
SELECT 
  'Data Analytics Intern', 'TCS',
  'Work with TCS Analytics team on data-driven projects. Learn SQL, Python, and data visualization tools.',
  ARRAY['Knowledge of SQL', 'Python basics', 'Statistics background helpful'],
  ARRAY['SQL', 'Python', 'Tableau', 'Excel'],
  'Pune, India', '3 months', 22000, 30, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1), now()
UNION ALL
SELECT 
  'Cloud Infrastructure Intern', 'Infosys',
  'Get trained on AWS and Azure cloud platforms. Work on cloud migration projects and infrastructure automation.',
  ARRAY['Linux basics', 'Networking fundamentals', '65% aggregate'],
  ARRAY['AWS', 'Linux', 'Docker', 'Kubernetes', 'Networking'],
  'Hyderabad, India', '6 months', 30000, 25, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1 OFFSET 1), now()
UNION ALL
SELECT 
  'Full Stack Development Intern', 'Infosys',
  'Develop end-to-end web applications using React, Node.js, and MongoDB. Work in agile teams with experienced mentors.',
  ARRAY['HTML, CSS, JavaScript', 'Basic backend knowledge', 'Git experience'],
  ARRAY['React', 'Node.js', 'MongoDB', 'JavaScript', 'REST APIs'],
  'Bangalore, India', '3 months', 25000, 40, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1 OFFSET 1), now()
UNION ALL
SELECT 
  'Product Management Intern', 'Flipkart',
  'Work on Flipkart''s e-commerce platform. Manage features from conception to launch. Collaborate with engineering and design teams.',
  ARRAY['Strong analytical skills', 'Case study experience', '70% aggregate'],
  ARRAY['Product Strategy', 'Data Analysis', 'User Research', 'Leadership'],
  'Bangalore, India', '6 months', 35000, 20, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1 OFFSET 2), now()
UNION ALL
SELECT 
  'Backend Engineering Intern', 'Flipkart',
  'Build scalable backend systems for India''s largest e-commerce platform. Work with cutting-edge technologies.',
  ARRAY['Strong in DSA', 'System design basics', 'Java/Python experience'],
  ARRAY['Java', 'Microservices', 'System Design', 'Databases'],
  'Bangalore, India', '6 months', 32000, 35, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1 OFFSET 2), now()
UNION ALL
SELECT 
  'Operations & Strategy Intern', 'OYO',
  'Work on business strategy and hotel operations. Analyze market trends and optimize operational efficiency.',
  ARRAY['Business acumen', 'Excel proficiency', 'Communication skills'],
  ARRAY['Business Analysis', 'Excel', 'Data Analysis', 'Strategic Thinking'],
  'Gurgaon, India', '3 months', 20000, 15, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1 OFFSET 3), now()
UNION ALL
SELECT 
  'Technology Intern', 'OYO',
  'Develop features for OYO''s mobile and web platforms. Work on scalability and user experience improvements.',
  ARRAY['Web development experience', 'Mobile app basics', 'Database knowledge'],
  ARRAY['React Native', 'JavaScript', 'MongoDB', 'API Development'],
  'Gurgaon, India', '6 months', 28000, 25, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1 OFFSET 3), now()
UNION ALL
SELECT 
  'Data Science Intern', 'Swiggy',
  'Apply ML and data science to food delivery optimization. Work on recommendation systems and demand forecasting.',
  ARRAY['Python expertise', 'ML fundamentals', 'Statistics knowledge'],
  ARRAY['Python', 'Machine Learning', 'Statistics', 'SQL', 'TensorFlow'],
  'Bangalore, India', '6 months', 31000, 20, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1 OFFSET 4), now()
UNION ALL
SELECT 
  'Frontend Development Intern', 'Swiggy',
  'Build user interfaces for Swiggy''s mobile and web apps. Work on performance optimization and UX improvement.',
  ARRAY['React/Vue experience', 'CSS proficiency', 'JavaScript mastery'],
  ARRAY['React', 'JavaScript', 'CSS', 'UX/UI Basics', 'Redux'],
  'Bangalore, India', '3 months', 26000, 30, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1 OFFSET 4), now()
UNION ALL
SELECT 
  'Business Development Intern', 'PhonePe',
  'Help grow PhonePe''s digital payments ecosystem. Work on partnerships and market expansion strategies.',
  ARRAY['Business fundamentals', 'Communication skills', 'Sales orientation'],
  ARRAY['Business Analysis', 'Negotiation', 'Sales', 'Market Research'],
  'Bangalore, India', '6 months', 25000, 18, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1 OFFSET 4), now()
UNION ALL
SELECT 
  'DevOps Engineer Intern', 'Amazon India',
  'Work on AWS infrastructure for Amazon India. Learn CI/CD pipelines, containerization, and cloud deployment.',
  ARRAY['Linux proficiency', 'Scripting knowledge', 'Networking basics'],
  ARRAY['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Python'],
  'Bangalore, India', '6 months', 33000, 25, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1 OFFSET 2), now()
UNION ALL
SELECT 
  'Machine Learning Engineer Intern', 'Google India',
  'Work on ML projects at Google India. Apply cutting-edge algorithms to real-world problems.',
  ARRAY['ML expertise', 'TensorFlow/PyTorch', 'Algorithm knowledge'],
  ARRAY['Python', 'TensorFlow', 'Machine Learning', 'Deep Learning'],
  'Bangalore, India', '6 months', 40000, 15, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1 OFFSET 2), now()
UNION ALL
SELECT 
  'Android Development Intern', 'Microsoft India',
  'Build Android applications at Microsoft India. Work on Xamarin and native Android development.',
  ARRAY['Java/Kotlin experience', 'Android SDK knowledge', 'UI/UX basics'],
  ARRAY['Android', 'Java', 'Kotlin', 'Material Design', 'Firebase'],
  'Bangalore, India', '6 months', 32000, 20, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1 OFFSET 3), now()
UNION ALL
SELECT 
  'UX/UI Design Intern', 'Paytm',
  'Design user interfaces for Paytm''s financial products. Work on wireframing, prototyping, and user research.',
  ARRAY['Design portfolio', 'Figma/Adobe XD', 'UX principles'],
  ARRAY['Figma', 'UI Design', 'UX Design', 'Prototyping', 'User Research'],
  'Noida, India', '3 months', 22000, 15, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1 OFFSET 4), now()
UNION ALL
SELECT 
  'Cybersecurity Intern', 'Unacademy',
  'Work on security infrastructure for Unacademy''s learning platform. Perform penetration testing and vulnerability assessments.',
  ARRAY['Security fundamentals', 'Networking knowledge', 'Linux experience'],
  ARRAY['Cybersecurity', 'Penetration Testing', 'Network Security', 'Linux'],
  'Bangalore, India', '6 months', 28000, 12, 'Full-time', 'active',
  (SELECT id FROM recruiters LIMIT 1 OFFSET 3), now();

-- Create sample student users
WITH students AS (
  INSERT INTO users (id, email, name, role, password_hash, created_at)
  VALUES
    (gen_random_uuid(), 'student1@example.com', 'Rahul Kumar', 'student', '$2a$10$mock', now()),
    (gen_random_uuid(), 'student2@example.com', 'Priya Singh', 'student', '$2a$10$mock', now()),
    (gen_random_uuid(), 'student3@example.com', 'Arjun Patel', 'student', '$2a$10$mock', now()),
    (gen_random_uuid(), 'student4@example.com', 'Neha Sharma', 'student', '$2a$10$mock', now()),
    (gen_random_uuid(), 'student5@example.com', 'Rohan Gupta', 'student', '$2a$10$mock', now())
  RETURNING id
)
-- Create student profiles
INSERT INTO students (user_id, skills, interests, gpa, university, degree, preferred_location, created_at)
SELECT 
  (ARRAY(SELECT id FROM students))[1], 
  ARRAY['Java', 'Python', 'SQL', 'Problem Solving'], 
  ARRAY['Software Development', 'Backend Engineering'],
  3.8, 'IIT Delhi', 'B.Tech CSE', 'Bangalore, India', now()
UNION ALL
SELECT 
  (ARRAY(SELECT id FROM students))[2], 
  ARRAY['React', 'JavaScript', 'CSS', 'UX Design'], 
  ARRAY['Frontend Development', 'Product Design'],
  3.6, 'BITS Pilani', 'B.Tech CSE', 'Bangalore, India', now()
UNION ALL
SELECT 
  (ARRAY(SELECT id FROM students))[3], 
  ARRAY['Python', 'Machine Learning', 'Statistics', 'SQL'], 
  ARRAY['Data Science', 'AI/ML'],
  3.9, 'IIT Bombay', 'B.Tech Data Science', 'Bangalore, India', now()
UNION ALL
SELECT 
  (ARRAY(SELECT id FROM students))[4], 
  ARRAY['AWS', 'Linux', 'Docker', 'Networking'], 
  ARRAY['Cloud Infrastructure', 'DevOps'],
  3.7, 'NIT Trichy', 'B.Tech CSE', 'Hyderabad, India', now()
UNION ALL
SELECT 
  (ARRAY(SELECT id FROM students))[5], 
  ARRAY['Product Management', 'Analytics', 'Business', 'Communication'], 
  ARRAY['Product Management', 'Strategy'],
  3.5, 'Delhi University', 'B.A Economics', 'Bangalore, India', now();

-- Create sample applications
INSERT INTO applications (student_id, internship_id, status, created_at)
SELECT 
  s.id,
  i.id,
  'applied',
  now()
FROM 
  students s
  CROSS JOIN internships i
WHERE 
  (s.user_id = (SELECT id FROM users WHERE email = 'student1@example.com') AND i.title = 'Software Development Intern')
  OR (s.user_id = (SELECT id FROM users WHERE email = 'student2@example.com') AND i.title = 'Frontend Development Intern')
  OR (s.user_id = (SELECT id FROM users WHERE email = 'student3@example.com') AND i.title = 'Data Science Intern')
  OR (s.user_id = (SELECT id FROM users WHERE email = 'student4@example.com') AND i.title = 'Cloud Infrastructure Intern')
  OR (s.user_id = (SELECT id FROM users WHERE email = 'student5@example.com') AND i.title = 'Business Development Intern')
UNION ALL
SELECT 
  s.id,
  i.id,
  'shortlisted',
  now() - interval '5 days'
FROM 
  students s
  CROSS JOIN internships i
WHERE 
  (s.user_id = (SELECT id FROM users WHERE email = 'student1@example.com') AND i.title = 'Backend Engineering Intern')
UNION ALL
SELECT 
  s.id,
  i.id,
  'accepted',
  now() - interval '10 days'
FROM 
  students s
  CROSS JOIN internships i
WHERE 
  (s.user_id = (SELECT id FROM users WHERE email = 'student2@example.com') AND i.title = 'Frontend Development Intern' AND i.company = 'Swiggy');

SELECT 'Successfully seeded 15 Indian internships, 5 student profiles, and 8 applications!' as result;
