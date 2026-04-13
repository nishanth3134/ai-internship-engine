-- Clear existing data (optional - comment out to keep existing data)
-- DELETE FROM applications;
-- DELETE FROM internships;
-- DELETE FROM students;

-- Insert Indian-based internships
INSERT INTO internships (
  id, title, company, location, duration, stipend, internship_type, 
  description, requirements, skills, status, created_by, 
  positions_available, work_mode, company_website,
  key_responsibilities, selection_process, perks, tags,
  created_at, updated_at
) VALUES
-- TCS (Tata Consultancy Services)
('550e8400-e29b-41d4-a716-446655440001', 'Software Developer Intern', 'TCS - Tata Consultancy Services', 'Bangalore, India', '6 months', '₹15,000', 'Full-time',
  'Join TCS as a Software Developer Intern and work on cutting-edge technologies. You will be exposed to real-world projects and work with experienced mentors.',
  ARRAY['B.Tech CSE/IT', 'GPA >= 7.0', 'Good communication skills'],
  ARRAY['Java', 'Python', 'SQL', 'REST APIs'],
  'active', '550e8400-e29b-41d4-a716-446655550000', 50, 'Hybrid',
  'https://www.tcs.com',
  'Develop and maintain software applications, Debug code and optimize performance, Collaborate with team members',
  'Online Test (Aptitude + Technical) -> Technical Interview -> HR Round',
  ARRAY['Free meals', 'Mentorship', 'Project exposure', 'Letter of recommendation'],
  ARRAY['IT', 'India', 'Bangalore', 'Popular'],
  NOW(), NOW()
),

-- Infosys
('550e8400-e29b-41d4-a716-446655440002', 'Data Analytics Intern', 'Infosys', 'Pune, India', '6 months', '₹12,000', 'Full-time',
  'Work with Infosys''s analytics team to derive insights from complex datasets. Exposure to Tableau, Python, and Big Data technologies.',
  ARRAY['B.Tech/M.Tech in CSE/Statistics', 'GPA >= 7.5', 'Data analysis experience'],
  ARRAY['Python', 'SQL', 'Tableau', 'Excel', 'Statistics'],
  'active', '550e8400-e29b-41d4-a716-446655550000', 30, 'Hybrid',
  'https://www.infosys.com',
  'Analyze large datasets, Create interactive dashboards, Document insights and recommendations',
  'Online Assessment -> Technical Round -> Manager Round',
  ARRAY['Training modules', 'Internship certificate', 'Potential full-time offer', 'Health insurance'],
  ARRAY['Data Analytics', 'India', 'Pune', 'Analytics'],
  NOW(), NOW()
),

-- HCL Technologies
('550e8400-e29b-41d4-a716-446655440003', 'Cloud Engineering Intern', 'HCL Technologies', 'Noida, India', '4 months', '₹18,000', 'Full-time',
  'Participate in HCL''s cloud transformation projects. Work with AWS, Azure, and DevOps tools in production environments.',
  ARRAY['B.Tech CSE', 'GPA >= 7.0', 'Cloud interest'],
  ARRAY['AWS', 'Azure', 'Docker', 'Kubernetes', 'Linux'],
  'active', '550e8400-e29b-41d4-a716-446655550000', 25, 'On-site',
  'https://www.hcltech.com',
  'Deploy cloud infrastructure, Configure CI/CD pipelines, Document technical solutions',
  'Coding Round -> Technical Interview -> HR Discussion',
  ARRAY['Certification reimbursement', 'Laptop provided', 'Commute allowance', 'Project ownership'],
  ARRAY['Cloud', 'India', 'Noida', 'DevOps'],
  NOW(), NOW()
),

-- Flipkart
('550e8400-e29b-41d4-a716-446655440004', 'Backend Engineering Intern', 'Flipkart', 'Bangalore, India', '3 months', '₹25,000', 'Full-time',
  'Build scalable backend systems for India''s leading e-commerce platform. Work on microservices, APIs, and distributed systems.',
  ARRAY['B.Tech CSE/IT', 'GPA >= 8.0', 'Strong programming skills'],
  ARRAY['Java', 'Spring Boot', 'MySQL', 'Redis', 'Microservices'],
  'active', '550e8400-e29b-41d4-a716-446655550000', 15, 'On-site',
  'https://www.flipkart.com',
  'Design API endpoints, Optimize database queries, Implement caching strategies',
  'Problem Solving (HackerRank) -> System Design -> Behavioral Round',
  ARRAY['Free lunch & snacks', 'Performance bonus', 'Full-time offer potential', 'Tech talks access'],
  ARRAY['Backend', 'India', 'Bangalore', 'Startup-like'],
  NOW(), NOW()
),

-- OYO Rooms
('550e8400-e29b-41d4-a716-446655440005', 'Full Stack Web Development Intern', 'OYO Rooms', 'Gurgaon, India', '3 months', '₹20,000', 'Full-time',
  'Build customer-facing features for OYO''s platform. Work with React, Node.js, and MongoDB to create amazing user experiences.',
  ARRAY['B.Tech CSE', 'Portfolio link', 'React/Vue experience'],
  ARRAY['React', 'Node.js', 'MongoDB', 'CSS', 'Git'],
  'active', '550e8400-e29b-41d4-a716-446655550000', 20, 'Hybrid',
  'https://www.oyorooms.com',
  'Develop UI components, Integrate backend APIs, Write unit tests',
  'Portfolio Review -> Coding Round -> Take-home Assignment',
  ARRAY['Flexible hours', 'Hostel provided', 'Gym access', 'Learning budget'],
  ARRAY['Full Stack', 'India', 'Gurgaon', 'Web'],
  NOW(), NOW()
),

-- Swiggy
('550e8400-e29b-41d4-a716-446655440006', 'Mobile App Development Intern', 'Swiggy', 'Bangalore, India', '3 months', '₹22,000', 'Full-time',
  'Develop mobile features for Swiggy''s Android/iOS app. Work on real-world problems affecting millions of users.',
  ARRAY['B.Tech CSE', 'Android/iOS experience', 'GPA >= 7.5'],
  ARRAY['Android/iOS', 'Java/Kotlin/Swift', 'Firebase', 'REST APIs'],
  'active', '550e8400-e29b-41d4-a716-446655550000', 12, 'On-site',
  'https://www.swiggy.com',
  'Build app features, Debug and optimize performance, Conduct code reviews',
  'Portfolio Review -> Technical Round -> System Design Round',
  ARRAY['Free food & beverages', 'Mentorship', 'Product launch credit', 'Pre-placement offer'],
  ARRAY['Mobile', 'India', 'Bangalore', 'App'],
  NOW(), NOW()
),

-- PhonePe
('550e8400-e29b-41d4-a716-446655440007', 'Machine Learning Intern', 'PhonePe', 'Bangalore, India', '4 months', '₹24,000', 'Full-time',
  'Work on ML models for fraud detection and recommendation systems. Access to millions of transactions for learning.',
  ARRAY['B.Tech CSE/Math', 'ML projects', 'GPA >= 8.0'],
  ARRAY['Python', 'TensorFlow', 'Scikit-learn', 'SQL', 'Statistics'],
  'active', '550e8400-e29b-41d4-a716-446655550000', 10, 'On-site',
  'https://www.phonepe.com',
  'Build ML pipelines, Analyze datasets, A/B test models',
  'Machine Learning Test -> Research Round -> Presentation',
  ARRAY['Highest internship stipend', 'Research publication', 'GPU access', 'Full-time conversion'],
  ARRAY['ML/AI', 'India', 'Bangalore', 'Finance'],
  NOW(), NOW()
),

-- Paytm
('550e8400-e29b-41d4-a716-446655440008', 'Business Analytics Intern', 'Paytm', 'Noida, India', '3 months', '₹16,000', 'Full-time',
  'Analyze payment trends and user behavior. Create dashboards and reports for business decisions.',
  ARRAY['B.Tech/B.Com/M.Tech', 'Excel advanced', 'Analytical mindset'],
  ARRAY['Excel', 'SQL', 'Python', 'Tableau', 'Data visualization'],
  'active', '550e8400-e29b-41d4-a716-446655550000', 18, 'Hybrid',
  'https://www.paytm.com',
  'Perform data analysis, Create business reports, Present insights to stakeholders',
  'Case Study -> Excel Test -> Analytics Round',
  ARRAY['Performance bonus', 'Certificate', 'Mentorship', 'Potential offer'],
  ARRAY['Analytics', 'India', 'Noida', 'Finance'],
  NOW(), NOW()
),

-- Unacademy
('550e8400-e29b-41d4-a716-446655440009', 'Content Strategy Intern', 'Unacademy', 'Bangalore, India', '3 months', '₹12,000', 'Full-time',
  'Create educational content and learning strategies. Help millions of students learn through our platform.',
  ARRAY['Graduates/Final year', 'Strong communication', 'Teaching ability'],
  ARRAY['Content writing', 'Video creation', 'Subject expertise', 'Research'],
  'active', '550e8400-e29b-41d4-a716-446655550000', 25, 'Hybrid',
  'https://www.unacademy.com',
  'Create course content, Develop learning materials, Interact with users',
  'Writing Test -> Teaching Demo -> Cultural Fit',
  ARRAY['Flexible schedule', 'Royalty on content', 'Certificate', 'Product credit'],
  ARRAY['EdTech', 'India', 'Bangalore', 'Content'],
  NOW(), NOW()
),

-- Amazon Development Center India
('550e8400-e29b-41d4-a716-446655440010', 'AWS Solutions Architect Intern', 'Amazon', 'Bangalore, India', '6 months', '₹28,000', 'Full-time',
  'Work with AWS architects on cloud solutions. Learn enterprise-scale infrastructure design.',
  ARRAY['B.Tech CSE', 'AWS interest', 'GPA >= 7.5', 'Problem-solving'],
  ARRAY['AWS', 'Architecture', 'Python', 'Networking', 'Databases'],
  'active', '550e8400-e29b-41d4-a716-446655550000', 8, 'On-site',
  'https://www.amazon.com',
  'Design cloud solutions, Write architecture documents, Present to clients',
  'Online Assessment -> Architectural Round -> Leadership Principles',
  ARRAY['Highest stipend', 'Global exposure', 'Return offer', 'AWS certifications'],
  ARRAY['Cloud', 'India', 'Bangalore', 'AWS'],
  NOW(), NOW()
),

-- Google India
('550e8400-e29b-41d4-a716-446655440011', 'Software Engineering Intern', 'Google', 'Bangalore, India', '4 months', '₹30,000', 'Full-time',
  'Work on products used by billions. Contribute to Google''s core infrastructure and products.',
  ARRAY['B.Tech CSE', 'Competitive programming', 'GPA >= 8.5'],
  ARRAY['C++', 'Java', 'Python', 'Data Structures', 'Algorithms'],
  'active', '550e8400-e29b-41d4-a716-446655550000', 5, 'On-site',
  'https://www.google.com',
  'Develop features, Code reviews, Design discussions',
  'Online Code Test -> Technical Interviews (3 rounds) -> Hiring Committee',
  ARRAY['Premium salary', 'Global team', 'Stocks', 'Full-time conversion', 'Relocation package'],
  ARRAY['Tech', 'India', 'Bangalore', 'Top Tier'],
  NOW(), NOW()
),

-- Microsoft India
('550e8400-e29b-41d4-a716-446655440012', 'Cloud Solutions Architect Intern', 'Microsoft', 'Pune, India', '6 months', '₹26,000', 'Full-time',
  'Work on Azure platform development. Build solutions for enterprise clients worldwide.',
  ARRAY['B.Tech CSE/IT', 'Azure knowledge', 'GPA >= 8.0'],
  ARRAY['Azure', 'C#', '.NET', 'Cloud Architecture', 'SQL Server'],
  'active', '550e8400-e29b-41d4-a716-446655550000', 10, 'Hybrid',
  'https://www.microsoft.com',
  'Build Azure solutions, Create documentation, Conduct demos',
  'Online Assessment -> Technical Rounds -> Design Discussion',
  ARRAY['Internship certificate', 'Azure credits', 'Mentorship', 'Return offer'],
  ARRAY['Cloud', 'India', 'Pune', 'Enterprise'],
  NOW(), NOW()
),

-- Accenture India
('550e8400-e29b-41d4-a716-446655440013', 'Business Technology Analyst', 'Accenture', 'Hyderabad, India', '6 months', '₹14,000', 'Full-time',
  'Consulting role focused on technology solutions. Work with Fortune 500 companies on transformation projects.',
  ARRAY['B.Tech/B.Com', 'Problem-solving', 'Communication skills'],
  ARRAY['Salesforce', 'SAP', 'Java', 'Business Analysis', 'SQL'],
  'active', '550e8400-e29b-41d4-a716-446655550000', 35, 'Hybrid',
  'https://www.accenture.com',
  'Analyze business requirements, Develop solutions, Client interactions',
  'Online Test -> Technical Interview -> HR Round',
  ARRAY['Training program', 'Internship certification', 'Mentorship', 'Potential offer'],
  ARRAY['Consulting', 'India', 'Hyderabad', 'Enterprise'],
  NOW(), NOW()
),

-- Goldman Sachs India
('550e8400-e29b-41d4-a716-446655440014', 'Quantitative Analysis Intern', 'Goldman Sachs', 'Bangalore, India', '3 months', '₹35,000', 'Full-time',
  'Work on financial models and trading systems. Exposure to high-frequency trading and algorithmic trading.',
  ARRAY['B.Tech/M.Tech in CSE/Math/Physics', 'GPA >= 8.5', 'Strong math background'],
  ARRAY['C++', 'Python', 'Finance', 'Algorithms', 'Linear Algebra'],
  'active', '550e8400-e29b-41d4-a716-446655550000', 6, 'On-site',
  'https://www.goldmansachs.com',
  'Build trading systems, Optimize algorithms, Analyze market data',
  'Online Assessment -> Quantitative Interview -> Behavioral Round',
  ARRAY['Highest stipend', 'Global placement', 'Trading floor access', 'Conversion offer'],
  ARRAY['Finance', 'India', 'Bangalore', 'Investment Banking'],
  NOW(), NOW()
),

-- McKinsey India
('550e8400-e29b-41d4-a716-446655440015', 'Business Analyst Intern', 'McKinsey & Company', 'Delhi, India', '3 months', '₹32,000', 'Full-time',
  'Solve complex business problems for global clients. Work on strategy, operations, and transformation projects.',
  ARRAY['Graduates/Final year', 'Analytical thinking', 'Communication'],
  ARRAY['Business Analysis', 'Data Analysis', 'Excel', 'Presentation', 'Problem-solving'],
  'active', '550e8400-e29b-41d4-a716-446655550000', 8, 'Hybrid',
  'https://www.mckinsey.com',
  'Conduct market research, Build analytical models, Present findings',
  'Case Interviews -> Problem Solving -> Final Round',
  ARRAY['Prestigious brand', 'Global exposure', 'Full-time conversion', 'Travel opportunities'],
  ARRAY['Consulting', 'India', 'Delhi', 'Strategy'],
  NOW(), NOW()
);

-- Insert sample users (recruiters)
INSERT INTO users (id, email, name, password_hash, role, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655550000', 'recruiter@company.com', 'HR Manager', '$2b$12$PLACEHOLDER', 'recruiter', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655550001', 'student1@example.com', 'Raj Kumar', '$2b$12$PLACEHOLDER', 'student', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655550002', 'student2@example.com', 'Priya Singh', '$2b$12$PLACEHOLDER', 'student', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655550003', 'student3@example.com', 'Amit Patel', '$2b$12$PLACEHOLDER', 'student', NOW(), NOW());

-- Insert sample student profiles
INSERT INTO students (id, user_id, skills, interests, experience, gpa, location, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655660001', '550e8400-e29b-41d4-a716-446655550001', 
  ARRAY['Java', 'Python', 'JavaScript', 'React', 'Node.js'],
  ARRAY['Web Development', 'Cloud Computing'],
  'Intermediate', 8.5, 'Bangalore', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655660002', '550e8400-e29b-41d4-a716-446655550002',
  ARRAY['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
  ARRAY['AI/ML', 'Data Science'],
  'Intermediate', 8.8, 'Pune', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655660003', '550e8400-e29b-41d4-a716-446655550003',
  ARRAY['Android', 'Kotlin', 'Firebase', 'UI/UX'],
  ARRAY['Mobile Development', 'Product'],
  'Beginner', 7.9, 'Hyderabad', NOW(), NOW());

-- Insert sample applications
INSERT INTO applications (id, internship_id, student_id, status, match_score, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655770001', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655660001', 'applied', 85.5, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655770002', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655660001', 'shortlisted', 92.3, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655770003', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655660002', 'applied', 88.7, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655770004', '550e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655660002', 'accepted', 95.2, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655770005', '550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655660003', 'applied', 80.1, NOW(), NOW());
