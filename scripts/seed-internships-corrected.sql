-- Seed internship data with valid created_by reference
-- First create a recruiter user if needed
INSERT INTO users (id, email, name, password_hash, role, created_at, updated_at)
VALUES (gen_random_uuid(), 'recruiter@internships.com', 'Internship Recruiter', 'hashed_password', 'recruiter', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Get the recruiter ID to use for created_by
WITH recruiter AS (
  SELECT id FROM users WHERE email = 'recruiter@internships.com' LIMIT 1
)
INSERT INTO internships (
  title, company, description, requirements, skills, location, duration, 
  stipend, positions_available, internship_type, status, created_by,
  created_at, updated_at
) 
SELECT 
  title, company, description, requirements, skills, location, duration, 
  stipend, positions_available, internship_type, status, recruiter.id,
  NOW(), NOW()
FROM recruiter,
(VALUES
('Investment Banking Analyst', 'Goldman Sachs', 'Work on M&A transactions and financial modeling. Exposure to capital markets and deal experience.', 
 ARRAY['Finance background', 'Excel expertise'], ARRAY['Excel', 'Financial Modeling', 'SQL', 'Python'],
 'New York, NY', '10 weeks', '8000', 8, 'full-time', 'active'),

('Quantitative Analysis Intern', 'Jane Street', 'Build trading strategies using machine learning and statistical analysis for algorithmic trading.',
 ARRAY['Math background', 'Programming'], ARRAY['Python', 'C++', 'Statistics', 'Machine Learning'],
 'New York, NY', '12 weeks', '7500', 12, 'full-time', 'active'),

('Financial Analyst Intern', 'JPMorgan Chase', 'Analyze financial statements and build forecasting models across business units.',
 ARRAY['Finance major', 'Analytical skills'], ARRAY['Excel', 'Financial Analysis', 'SQL', 'Python'],
 'Chicago, IL', '10 weeks', '6000', 20, 'full-time', 'active'),

('Management Consulting Intern', 'McKinsey & Company', 'Work on strategy projects and help clients solve complex business problems.',
 ARRAY['Analytical skills', 'Problem-solving'], ARRAY['Excel', 'Data Analysis', 'PowerPoint'],
 'Boston, MA', '10 weeks', '6500', 15, 'full-time', 'active'),

('Business Consulting Intern', 'Bain & Company', 'Identify growth opportunities and operational improvements for clients worldwide.',
 ARRAY['Quantitative skills', 'Problem-solving'], ARRAY['Excel', 'PowerPoint', 'Data Analysis'],
 'San Francisco, CA', '10 weeks', '6500', 12, 'full-time', 'active'),

('Marketing Intern', 'Coca-Cola', 'Execute marketing campaigns and support brand strategy for global consumer brands.',
 ARRAY['Marketing background', 'Creative thinking'], ARRAY['Marketing Analytics', 'Social Media', 'Content Creation'],
 'Atlanta, GA', '12 weeks', '4500', 10, 'full-time', 'active'),

('Business Development Intern', 'Airbnb', 'Expand market opportunities by analyzing trends and identifying strategic partnerships.',
 ARRAY['Business background', 'Analytical mindset'], ARRAY['Market Analysis', 'Data Analysis', 'Strategy', 'Excel'],
 'San Francisco, CA', '12 weeks', '5500', 8, 'full-time', 'active'),

('Mechanical Engineering Intern', 'Tesla', 'Design and analyze electric vehicle components with CAD and manufacturing processes.',
 ARRAY['Mechanical Engineering major', 'CAD proficiency'], ARRAY['CATIA', 'SolidWorks', 'MATLAB'],
 'Palo Alto, CA', '12 weeks', '6000', 10, 'full-time', 'active'),

('Civil Engineering Intern', 'Bechtel Corporation', 'Contribute to large-scale infrastructure projects including bridges and buildings.',
 ARRAY['Civil Engineering major', 'CAD experience'], ARRAY['AutoCAD', 'Revit', 'Project Management'],
 'San Francisco, CA', '12 weeks', '5500', 8, 'full-time', 'active'),

('Product Management Intern', 'Uber', 'Work on product strategy, user research, and feature launches impacting millions.',
 ARRAY['Analytical skills', 'Communication'], ARRAY['Product Strategy', 'User Research', 'Data Analysis', 'SQL'],
 'San Francisco, CA', '12 weeks', '6000', 6, 'full-time', 'active'),

('Product Operations Intern', 'Slack', 'Support product launches, analyze metrics, and optimize workflows across teams.',
 ARRAY['Technical background', 'Analytics'], ARRAY['Product Analytics', 'SQL', 'Data Visualization'],
 'San Francisco, CA', '12 weeks', '5500', 5, 'full-time', 'active'),

('UX/UI Design Intern', 'Adobe', 'Design user interfaces for creative software products with focus on user experience.',
 ARRAY['Design portfolio required', 'Figma experience'], ARRAY['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
 'San Francisco, CA', '12 weeks', '5500', 8, 'full-time', 'active'),

('Graphic Design Intern', 'IDEO', 'Create visual concepts and collaborate on innovative design solutions for clients.',
 ARRAY['Graphic Design background', 'Adobe Suite'], ARRAY['Adobe Creative Suite', 'Brand Design', 'Motion Graphics'],
 'San Francisco, CA', '10 weeks', '4500', 6, 'full-time', 'active'),

('Sales Development Rep Intern', 'Salesforce', 'Build sales pipeline through outreach and demos using industry-leading CRM.',
 ARRAY['Communication skills', 'Sales drive'], ARRAY['Sales', 'CRM Systems', 'Excel', 'Communication'],
 'San Francisco, CA', '12 weeks', '5000', 10, 'full-time', 'active'),

('Account Management Intern', 'HubSpot', 'Manage enterprise client accounts and identify expansion opportunities.',
 ARRAY['Customer service', 'Communication'], ARRAY['Account Management', 'CRM', 'Customer Success'],
 'Cambridge, MA', '12 weeks', '5000', 12, 'full-time', 'active'),

('Supply Chain Intern', 'Amazon', 'Optimize logistics networks and improve operations efficiency at scale.',
 ARRAY['Operations background', 'Analytics'], ARRAY['Supply Chain', 'Excel', 'Analytics', 'SQL'],
 'Seattle, WA', '12 weeks', '5500', 15, 'full-time', 'active'),

('Operations Analyst Intern', 'Delta Air Lines', 'Support flight operations and optimize airline efficiency in fast-paced environment.',
 ARRAY['Operations degree', 'Data analysis'], ARRAY['Operations', 'Data Analysis', 'Excel', 'Logistics'],
 'Atlanta, GA', '12 weeks', '5000', 8, 'full-time', 'active')
) AS data(title, company, description, requirements, skills, location, duration, 
         stipend, positions_available, internship_type, status);

SELECT COUNT(*) as total_internships, COUNT(DISTINCT company) as companies FROM internships;
