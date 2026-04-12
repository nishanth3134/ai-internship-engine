-- Seed Indian Tech Companies' Internships

-- Step 1: Create recruiter users for Indian companies
INSERT INTO users (id, email, password_hash, name, role, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'recruiter@tcs.com', 'hashed_password', 'TCS Recruitment', 'recruiter', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'recruiter@infosys.com', 'hashed_password', 'Infosys Recruitment', 'recruiter', NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'recruiter@flipkart.com', 'hashed_password', 'Flipkart Recruitment', 'recruiter', NOW()),
('550e8400-e29b-41d4-a716-446655440004', 'recruiter@oyo.com', 'hashed_password', 'OYO Recruitment', 'recruiter', NOW()),
('550e8400-e29b-41d4-a716-446655440005', 'recruiter@swiggy.com', 'hashed_password', 'Swiggy Recruitment', 'recruiter', NOW()),
('550e8400-e29b-41d4-a716-446655440006', 'recruiter@phonepe.com', 'hashed_password', 'PhonePe Recruitment', 'recruiter', NOW()),
('550e8400-e29b-41d4-a716-446655440007', 'recruiter@amazon.com', 'hashed_password', 'Amazon India Recruitment', 'recruiter', NOW()),
('550e8400-e29b-41d4-a716-446655440008', 'recruiter@google.com', 'hashed_password', 'Google India Recruitment', 'recruiter', NOW()),
('550e8400-e29b-41d4-a716-446655440009', 'recruiter@microsoft.com', 'hashed_password', 'Microsoft India Recruitment', 'recruiter', NOW()),
('550e8400-e29b-41d4-a716-446655440010', 'recruiter@paytm.com', 'hashed_password', 'Paytm Recruitment', 'recruiter', NOW())
ON CONFLICT (email) DO NOTHING;

-- Step 2: Insert Indian Tech Company Internships
INSERT INTO internships (id, title, company, location, description, requirements, skills, duration, stipend, positions_available, status, created_by, created_at) VALUES

-- TCS Internships
('650e8400-e29b-41d4-a716-446655440001', 'Software Development Engineer - Intern', 'Tata Consultancy Services (TCS)', 'Bangalore, India', 'Join TCS as a Software Development Engineer intern. Work on cutting-edge technologies including cloud, AI, and DevOps. Learn from industry experts and gain hands-on experience.', 'B.Tech/M.Tech in CS/IT, CGPA >= 6.5, Communication skills', ARRAY['Java', 'Python', 'SQL', 'Cloud Computing'], '6 months', 40000, 20, 'active', '550e8400-e29b-41d4-a716-446655440001', NOW()),

-- Infosys Internships
('650e8400-e29b-41d4-a716-446655440002', 'Systems Engineer Trainee', 'Infosys', 'Pune, India', 'Be part of Infosys innovation journey. Work on enterprise software development and digital transformation projects. Get mentorship from senior engineers.', 'B.Tech/BE in CS/IT, CGPA >= 6.0, Problem-solving skills', ARRAY['Java', 'Spring Boot', 'Microservices', 'AWS'], '6 months', 35000, 25, 'active', '550e8400-e29b-41d4-a716-446655440002', NOW()),

-- Flipkart Internships
('650e8400-e29b-41d4-a716-446655440003', 'Full Stack Developer Intern', 'Flipkart', 'Bangalore, India', 'Build next-generation e-commerce features at Flipkart. Work with modern tech stack including React, Node.js, and scalable databases. Impact millions of customers.', 'B.Tech in CS, CGPA >= 7.0, Web development knowledge', ARRAY['React', 'Node.js', 'MongoDB', 'JavaScript'], '3-6 months', 50000, 15, 'active', '550e8400-e29b-41d4-a716-446655440003', NOW()),

-- OYO Internships
('650e8400-e29b-41d4-a716-446655440004', 'Data Analytics Intern', 'OYO Rooms', 'Gurugram, India', 'Analyze massive hospitality datasets. Build dashboards and insights to drive business decisions. Learn advanced analytics and data science techniques.', 'B.Tech in Any branch, CGPA >= 6.0, SQL knowledge', ARRAY['Python', 'SQL', 'Tableau', 'Data Analysis'], '4-6 months', 30000, 10, 'active', '550e8400-e29b-41d4-a716-446655440004', NOW()),

-- Swiggy Internships
('650e8400-e29b-41d4-a716-446655440005', 'Backend Engineer Intern', 'Swiggy', 'Bangalore, India', 'Build scalable backend systems handling millions of orders. Work with microservices, real-time processing, and distributed systems at Swiggy.', 'B.Tech in CS, CGPA >= 6.5, System design basics', ARRAY['Java', 'Kafka', 'PostgreSQL', 'Distributed Systems'], '6 months', 45000, 12, 'active', '550e8400-e29b-41d4-a716-446655440005', NOW()),

-- PhonePe Internships
('650e8400-e29b-41d4-a716-446655440006', 'Mobile App Developer Intern', 'PhonePe', 'Bangalore, India', 'Develop mobile applications for millions of users. Work on fintech features using Flutter or React Native. Get exposure to mobile security and payment systems.', 'B.Tech in CS/IT, CGPA >= 6.5, Mobile dev experience', ARRAY['Flutter', 'React Native', 'Dart', 'Swift'], '6 months', 48000, 10, 'active', '550e8400-e29b-41d4-a716-446655440006', NOW()),

-- Amazon India Internships
('650e8400-e29b-41d4-a716-446655440007', 'SDE Intern', 'Amazon India', 'Bangalore, India', 'Work on Amazon''s core systems and services. Solve complex scalability challenges. Learn software development best practices from experienced engineers.', 'B.Tech in CS/IT, CGPA >= 7.0, DSA knowledge', ARRAY['C++', 'Java', 'Python', 'AWS'], '3 months', 55000, 8, 'active', '550e8400-e29b-41d4-a716-446655440007', NOW()),

-- Google India Internships
('650e8400-e29b-41d4-a716-446655440008', 'Engineering Intern', 'Google India', 'Bangalore/Hyderabad, India', 'Join Google and work on products used by billions. Contribute to open-source projects. Get mentored by senior engineers at Google.', 'B.Tech in CS, CGPA >= 7.5, Strong DSA', ARRAY['Python', 'C++', 'JavaScript', 'System Design'], '3 months', 60000, 5, 'active', '550e8400-e29b-41d4-a716-446655440008', NOW()),

-- Microsoft India Internships
('650e8400-e29b-41d4-a716-446655440009', 'Software Engineer Intern', 'Microsoft India', 'Bangalore/Hyderabad, India', 'Build intelligent cloud solutions at Microsoft. Work on Azure and AI/ML technologies. Collaborate with talented engineers worldwide.', 'B.Tech in CS/IT, CGPA >= 7.0, C++ or C# knowledge', ARRAY['C#', 'Azure', 'Python', 'Cloud Computing'], '3-6 months', 58000, 6, 'active', '550e8400-e29b-41d4-a716-446655440009', NOW()),

-- Paytm Internships
('650e8400-e29b-41d4-a716-446655440010', 'QA Engineer Intern', 'Paytm', 'Noida, India', 'Ensure quality of fintech products. Learn testing automation, performance testing, and quality assurance. Work on payment systems affecting millions.', 'B.Tech in CS, CGPA >= 6.0, Testing knowledge', ARRAY['Python', 'Selenium', 'SQL', 'Testing'], '3-4 months', 28000, 8, 'active', '550e8400-e29b-41d4-a716-446655440010', NOW()),

-- HCL Technologies
('650e8400-e29b-41d4-a716-446655440011', 'Associate Software Engineer - Intern', 'HCL Technologies', 'Delhi, India', 'Start your IT career with HCL. Work on enterprise solutions and digital transformation. Get certified in industry technologies.', 'B.Tech/BE in CS, CGPA >= 6.0', ARRAY['Java', 'HTML', 'CSS', 'Database'], '6 months', 32000, 18, 'active', '550e8400-e29b-41d4-a716-446655440002', NOW()),

-- Accenture India
('650e8400-e29b-41d4-a716-446655440012', 'Analyst Development Program', 'Accenture India', 'Mumbai, India', 'Launch your consulting career. Work on global projects. Develop business and technical consulting skills.', 'Any B.Tech/B.E, CGPA >= 6.5, Analytical skills', ARRAY['SAP', 'Java', 'Business Analysis'], '6 months', 38000, 20, 'active', '550e8400-e29b-41d4-a716-446655440001', NOW()),

-- Unacademy
('650e8400-e29b-41d4-a716-446655440013', 'Product Engineer Intern', 'Unacademy', 'Bangalore, India', 'Build educational technology products. Work on learning platforms. Impact millions of students across India.', 'B.Tech in CS/IT, CGPA >= 6.5, Web dev basics', ARRAY['React', 'Node.js', 'Python', 'Education Tech'], '4-6 months', 42000, 8, 'active', '550e8400-e29b-41d4-a716-446655440003', NOW()),

-- Dunzo
('650e8400-e29b-41d4-a716-446655440014', 'Backend Engineer Intern', 'Dunzo', 'Bangalore, India', 'Build logistics and delivery systems. Work on real-time order tracking. Scale systems for rapid growth.', 'B.Tech in CS, CGPA >= 6.5, Backend development', ARRAY['Node.js', 'Python', 'MongoDB', 'Redis'], '3-6 months', 44000, 6, 'active', '550e8400-e29b-41d4-a716-446655440005', NOW()),

-- Nykaa
('650e8400-e29b-41d4-a716-446655440015', 'Digital Marketing Intern', 'Nykaa', 'Mumbai, India', 'Work in digital marketing for India''s largest beauty e-commerce platform. Learn social media, content, and data-driven marketing.', 'Any graduate, CGPA >= 6.0, Marketing interest', ARRAY['Digital Marketing', 'Social Media', 'Analytics'], '3 months', 25000, 5, 'active', '550e8400-e29b-41d4-a716-446655440004', NOW())

ON CONFLICT (id) DO NOTHING;

-- Step 3: Create sample student users
INSERT INTO users (id, email, password_hash, name, role, created_at) VALUES
('650e8400-e29b-41d4-a716-446655440101', 'student1@example.com', 'hashed_password', 'Arjun Sharma', 'student', NOW()),
('650e8400-e29b-41d4-a716-446655440102', 'student2@example.com', 'hashed_password', 'Priya Patel', 'student', NOW()),
('650e8400-e29b-41d4-a716-446655440103', 'student3@example.com', 'hashed_password', 'Rohit Kumar', 'student', NOW()),
('650e8400-e29b-41d4-a716-446655440104', 'student4@example.com', 'hashed_password', 'Neha Gupta', 'student', NOW()),
('650e8400-e29b-41d4-a716-446655440105', 'student5@example.com', 'hashed_password', 'Vikram Singh', 'student', NOW())
ON CONFLICT (email) DO NOTHING;

-- Step 4: Create student profiles
INSERT INTO students (id, user_id, skills, interests, gpa) VALUES
('650e8400-e29b-41d4-a716-446655440201', '650e8400-e29b-41d4-a716-446655440101', ARRAY['Java', 'Python', 'SQL', 'Spring Boot'], ARRAY['Backend Development', 'Scalability'], 7.8),
('650e8400-e29b-41d4-a716-446655440202', '650e8400-e29b-41d4-a716-446655440102', ARRAY['React', 'JavaScript', 'CSS', 'Node.js'], ARRAY['Frontend Development', 'UX Design'], 7.5),
('650e8400-e29b-41d4-a716-446655440203', '650e8400-e29b-41d4-a716-446655440103', ARRAY['Python', 'Machine Learning', 'TensorFlow', 'SQL'], ARRAY['Data Science', 'AI/ML'], 8.2),
('650e8400-e29b-41d4-a716-446655440204', '650e8400-e29b-41d4-a716-446655440104', ARRAY['Java', 'C++', 'DSA', 'System Design'], ARRAY['System Architecture', 'Core Engineering'], 7.9),
('650e8400-e29b-41d4-a716-446655440205', '650e8400-e29b-41d4-a716-446655440105', ARRAY['Python', 'Data Analysis', 'Tableau', 'SQL'], ARRAY['Analytics', 'Business Intelligence'], 7.3)
ON CONFLICT (id) DO NOTHING;

-- Step 5: Create sample applications
INSERT INTO applications (id, student_id, internship_id, status, created_at) VALUES
('650e8400-e29b-41d4-a716-446655440301', '650e8400-e29b-41d4-a716-446655440201', '650e8400-e29b-41d4-a716-446655440005', 'applied', NOW()),
('650e8400-e29b-41d4-a716-446655440302', '650e8400-e29b-41d4-a716-446655440201', '650e8400-e29b-41d4-a716-446655440001', 'shortlisted', NOW()),
('650e8400-e29b-41d4-a716-446655440303', '650e8400-e29b-41d4-a716-446655440202', '650e8400-e29b-41d4-a716-446655440003', 'applied', NOW()),
('650e8400-e29b-41d4-a716-446655440304', '650e8400-e29b-41d4-a716-446655440203', '650e8400-e29b-41d4-a716-446655440004', 'accepted', NOW()),
('650e8400-e29b-41d4-a716-446655440305', '650e8400-e29b-41d4-a716-446655440204', '650e8400-e29b-41d4-a716-446655440007', 'shortlisted', NOW()),
('650e8400-e29b-41d4-a716-446655440306', '650e8400-e29b-41d4-a716-446655440204', '650e8400-e29b-41d4-a716-446655440008', 'applied', NOW()),
('650e8400-e29b-41d4-a716-446655440307', '650e8400-e29b-41d4-a716-446655440205', '650e8400-e29b-41d4-a716-446655440004', 'applied', NOW()),
('650e8400-e29b-41d4-a716-446655440308', '650e8400-e29b-41d4-a716-446655440205', '650e8400-e29b-41d4-a716-446655440010', 'accepted', NOW())
ON CONFLICT (id) DO NOTHING;
