-- First, create recruiter/admin users if they don't exist
INSERT INTO users (id, email, name, role, password_hash, created_at)
VALUES 
  ('recruiter-001', 'recruiter@tcs.com', 'TCS Recruiter', 'recruiter', '$2a$10$dummyhash', NOW()),
  ('recruiter-002', 'recruiter@infosys.com', 'Infosys Recruiter', 'recruiter', '$2a$10$dummyhash', NOW()),
  ('recruiter-003', 'recruiter@flipkart.com', 'Flipkart Recruiter', 'recruiter', '$2a$10$dummyhash', NOW()),
  ('recruiter-004', 'recruiter@oyo.com', 'OYO Recruiter', 'recruiter', '$2a$10$dummyhash', NOW()),
  ('recruiter-005', 'recruiter@swiggy.com', 'Swiggy Recruiter', 'recruiter', '$2a$10$dummyhash', NOW()),
  ('recruiter-006', 'recruiter@phonepe.com', 'PhonePe Recruiter', 'recruiter', '$2a$10$dummyhash', NOW()),
  ('recruiter-007', 'recruiter@amazon.com', 'Amazon Recruiter', 'recruiter', '$2a$10$dummyhash', NOW()),
  ('recruiter-008', 'recruiter@google.com', 'Google Recruiter', 'recruiter', '$2a$10$dummyhash', NOW())
ON CONFLICT (email) DO NOTHING;

-- Now insert Indian-based internships
INSERT INTO internships (
  title, company, description, requirements, skills, location, 
  duration, stipend, positions_available, internship_type, status, created_by, created_at
) VALUES
  -- TCS Internships
  ('Software Development Intern', 'Tata Consultancy Services (TCS)', 
   'Join TCS India to develop enterprise-level software solutions. Work on real projects with mentorship from senior engineers. Opportunity to work across cloud, AI, and digital transformation technologies.',
   'B.Tech in CS/IT, 7+ CGPA, Strong problem-solving skills',
   ARRAY['Java', 'Python', 'Cloud AWS', 'SQL', 'Problem Solving'],
   'Pune, India', '3-6 months', 25000, 50, 'Full-time', 'active', 'recruiter-001', NOW()),

  ('Data Analytics Intern', 'Tata Consultancy Services (TCS)',
   'Analyze complex datasets and create actionable insights. Learn advanced analytics tools and techniques used in TCS projects across various industries.',
   'B.Tech/M.Tech in any stream, Knowledge of databases, Analytical mindset',
   ARRAY['SQL', 'Python', 'Tableau', 'Excel', 'Statistics', 'Data Analysis'],
   'Bangalore, India', '3-6 months', 22000, 30, 'Full-time', 'active', 'recruiter-001', NOW()),

  -- Infosys Internships
  ('Full Stack Development Intern', 'Infosys',
   'Build modern web applications using latest tech stack. Contribute to production systems and learn enterprise development practices at Infosys, a global IT services leader.',
   'B.Tech in CS/IT, 6+ CGPA, Knowledge of web technologies',
   ARRAY['React', 'Node.js', 'MongoDB', 'JavaScript', 'REST APIs'],
   'Hyderabad, India', '3-6 months', 24000, 40, 'Full-time', 'active', 'recruiter-002', NOW()),

  ('Cloud Engineer Intern', 'Infosys',
   'Learn cloud infrastructure and DevOps practices. Work on cloud migration projects and containerization using Docker and Kubernetes.',
   'B.Tech/M.Tech, Knowledge of Linux and networking',
   ARRAY['AWS', 'Azure', 'Docker', 'Kubernetes', 'Linux', 'CI/CD'],
   'Pune, India', '3-6 months', 26000, 25, 'Full-time', 'active', 'recruiter-002', NOW()),

  -- Flipkart Internships
  ('Backend Engineer Intern', 'Flipkart',
   'Work on Flipkart''s high-traffic backend systems. Build scalable microservices handling millions of transactions daily. Learn from world-class engineers.',
   'B.Tech in CS/IT, Strong DSA fundamentals, 7+ CGPA',
   ARRAY['Java', 'Spring Boot', 'Microservices', 'SQL', 'System Design', 'DSA'],
   'Bangalore, India', '3-6 months', 30000, 35, 'Full-time', 'active', 'recruiter-003', NOW()),

  ('Product Manager Intern', 'Flipkart',
   'Shape the future of Indias largest e-commerce platform. Work on product strategy, feature development, and data-driven decisions.',
   'Any engineering background, Analytical skills, Product sense',
   ARRAY['Product Strategy', 'Data Analysis', 'User Research', 'SQL', 'Analytics'],
   'Bangalore, India', '3-6 months', 28000, 15, 'Full-time', 'active', 'recruiter-003', NOW()),

  -- OYO Internships
  ('Software Engineer Intern', 'OYO Rooms',
   'Join India''s leading hospitality tech company. Build features for millions of users across accommodation and travel services.',
   'B.Tech in CS/IT, Problem-solving skills, Eager to learn',
   ARRAY['Python', 'JavaScript', 'React', 'PostgreSQL', 'Git'],
   'Gurgaon, India', '3-6 months', 20000, 30, 'Full-time', 'active', 'recruiter-004', NOW()),

  ('Data Science Intern', 'OYO Rooms',
   'Work with real-world hospitality data. Build ML models for demand prediction, pricing optimization, and customer behavior analysis.',
   'B.Tech/M.Tech, Python proficiency, Statistics knowledge',
   ARRAY['Python', 'Machine Learning', 'SQL', 'Pandas', 'Statistics', 'Data Visualization'],
   'Bangalore, India', '3-6 months', 23000, 20, 'Full-time', 'active', 'recruiter-004', NOW()),

  -- Swiggy Internships
  ('Android Developer Intern', 'Swiggy',
   'Build mobile apps used by millions of food delivery users. Work on real-time features and smooth user experiences.',
   'B.Tech in CS/IT, Android or mobile development experience',
   ARRAY['Kotlin', 'Android', 'Firebase', 'REST APIs', 'Git'],
   'Bangalore, India', '3-6 months', 25000, 25, 'Full-time', 'active', 'recruiter-005', NOW()),

  ('Operations Analytics Intern', 'Swiggy',
   'Analyze food delivery operations and optimize delivery networks. Work with real-time data from thousands of restaurants and delivery partners.',
   'Any engineering background, Excel expertise, SQL knowledge',
   ARRAY['SQL', 'Excel', 'Python', 'Data Analysis', 'Tableau'],
   'Bangalore, India', '3-6 months', 21000, 20, 'Full-time', 'active', 'recruiter-005', NOW()),

  -- PhonePe Internships
  ('Machine Learning Engineer Intern', 'PhonePe',
   'Work on fraud detection, recommendation systems, and payment intelligence. PhonePe processes billions of transactions monthly.',
   'B.Tech/M.Tech in CS/Math, Strong ML fundamentals, Python',
   ARRAY['Python', 'Machine Learning', 'Deep Learning', 'SQL', 'TensorFlow', 'Spark'],
   'Bangalore, India', '3-6 months', 28000, 20, 'Full-time', 'active', 'recruiter-006', NOW()),

  ('Platform Engineer Intern', 'PhonePe',
   'Build infrastructure and platforms handling India''s fastest growing fintech ecosystem. Work with high-availability systems.',
   'B.Tech in CS/IT, Java or Go experience',
   ARRAY['Java', 'Go', 'Kubernetes', 'Microservices', 'System Design'],
   'Bangalore, India', '3-6 months', 27000, 18, 'Full-time', 'active', 'recruiter-006', NOW()),

  -- Amazon India Internships
  ('Software Development Engineer Intern', 'Amazon India',
   'Work on Amazon''s core services and customer-facing products. Solve real-world problems at Amazon scale.',
   'B.Tech in CS/IT, 7+ CGPA, Strong programming skills',
   ARRAY['Java', 'C++', 'Python', 'AWS', 'System Design', 'DSA'],
   'Bangalore, India', '3-6 months', 32000, 45, 'Full-time', 'active', 'recruiter-007', NOW()),

  ('Data Engineer Intern', 'Amazon India',
   'Build data pipelines and ETL systems for Amazon''s analytics. Work with massive datasets and cutting-edge data technologies.',
   'B.Tech/M.Tech, SQL, Python, Data engineering knowledge',
   ARRAY['Python', 'SQL', 'Spark', 'Airflow', 'Data Warehousing', 'AWS'],
   'Bangalore, India', '3-6 months', 29000, 25, 'Full-time', 'active', 'recruiter-007', NOW()),

  -- Google India Internships
  ('Software Engineer Intern - India', 'Google India',
   'Work on Google''s products used by billions worldwide. Contribute to world-class engineering with mentorship from Google engineers.',
   'B.Tech in CS/related field, Strong CS fundamentals',
   ARRAY['Python', 'Java', 'C++', 'JavaScript', 'System Design', 'Algorithms'],
   'Bangalore, India', '3-6 months', 35000, 30, 'Full-time', 'active', 'recruiter-008', NOW()),

  ('UX Design Intern', 'Google India',
   'Design user experiences for Google''s products. Learn design thinking and prototyping at one of the world''s best design teams.',
   'Background in design/HCI, Portfolio showing design work',
   ARRAY['UI Design', 'UX Design', 'Figma', 'User Research', 'Prototyping'],
   'Bangalore, India', '3-6 months', 26000, 15, 'Full-time', 'active', 'recruiter-008', NOW());

-- Create sample student accounts
INSERT INTO users (id, email, name, role, password_hash, created_at)
VALUES 
  ('student-001', 'arjun.sharma@gmail.com', 'Arjun Sharma', 'student', '$2a$10$dummyhash', NOW()),
  ('student-002', 'priya.patel@gmail.com', 'Priya Patel', 'student', '$2a$10$dummyhash', NOW()),
  ('student-003', 'rajesh.kumar@gmail.com', 'Rajesh Kumar', 'student', '$2a$10$dummyhash', NOW()),
  ('student-004', 'neha.gupta@gmail.com', 'Neha Gupta', 'student', '$2a$10$dummyhash', NOW()),
  ('student-005', 'vikram.singh@gmail.com', 'Vikram Singh', 'student', '$2a$10$dummyhash', NOW())
ON CONFLICT (email) DO NOTHING;

-- Create student profiles
INSERT INTO students (user_id, skills, interests, experience, gpa, university, degree, created_at)
VALUES 
  ('student-001', ARRAY['Java', 'Python', 'Spring Boot', 'SQL'], ARRAY['Backend Development', 'System Design'], 'Intermediate', 8.2, 'IIT Delhi', 'B.Tech CS', NOW()),
  ('student-002', ARRAY['React', 'JavaScript', 'Node.js', 'UI Design'], ARRAY['Full Stack', 'Frontend'], 'Intermediate', 8.5, 'BITS Pilani', 'B.Tech IT', NOW()),
  ('student-003', ARRAY['Python', 'SQL', 'Tableau', 'Statistics'], ARRAY['Data Analysis', 'Analytics'], 'Beginner', 8.0, 'NIT Trichy', 'B.Tech CS', NOW()),
  ('student-004', ARRAY['Kotlin', 'Android', 'Java'], ARRAY['Mobile Development'], 'Beginner', 7.8, 'DTU Delhi', 'B.Tech IT', NOW()),
  ('student-005', ARRAY['Python', 'Machine Learning', 'TensorFlow'], ARRAY['ML/AI', 'Deep Learning'], 'Advanced', 8.8, 'IIT Bombay', 'M.Tech CS', NOW())
ON CONFLICT (user_id) DO NOTHING;

-- Create sample applications
INSERT INTO applications (internship_id, student_id, status, created_at)
SELECT 
  (SELECT id FROM internships WHERE title = 'Software Development Intern' AND company = 'Tata Consultancy Services (TCS)' LIMIT 1),
  (SELECT id FROM students WHERE user_id = 'student-001' LIMIT 1),
  'applied',
  NOW()
ON CONFLICT DO NOTHING;

INSERT INTO applications (internship_id, student_id, status, created_at)
SELECT 
  (SELECT id FROM internships WHERE title = 'Full Stack Development Intern' AND company = 'Infosys' LIMIT 1),
  (SELECT id FROM students WHERE user_id = 'student-002' LIMIT 1),
  'applied',
  NOW()
ON CONFLICT DO NOTHING;

INSERT INTO applications (internship_id, student_id, status, created_at)
SELECT 
  (SELECT id FROM internships WHERE title = 'Data Analytics Intern' AND company = 'Tata Consultancy Services (TCS)' LIMIT 1),
  (SELECT id FROM students WHERE user_id = 'student-003' LIMIT 1),
  'shortlisted',
  NOW()
ON CONFLICT DO NOTHING;

INSERT INTO applications (internship_id, student_id, status, created_at)
SELECT 
  (SELECT id FROM internships WHERE title = 'Android Developer Intern' AND company = 'Swiggy' LIMIT 1),
  (SELECT id FROM students WHERE user_id = 'student-004' LIMIT 1),
  'applied',
  NOW()
ON CONFLICT DO NOTHING;

INSERT INTO applications (internship_id, student_id, status, created_at)
SELECT 
  (SELECT id FROM internships WHERE title = 'Machine Learning Engineer Intern' AND company = 'PhonePe' LIMIT 1),
  (SELECT id FROM students WHERE user_id = 'student-005' LIMIT 1),
  'accepted',
  NOW()
ON CONFLICT DO NOTHING;
