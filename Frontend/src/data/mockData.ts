import { Internship } from '../types';

// --- EXPANDED DATA SETS ---
const companyNames = [
  'TechCorp Inc.', 'DataMinds Analytics', 'DesignStudio Pro', 'Innovatech Solutions', 'QuantumLeap AI',
  'DataSphere India', 'NextGen Fintech', 'Synergy Labs Global', 'Apex Innovations', 'Future-Proof Tech',
  'CodeCrafters', 'PixelPerfect Studios', 'MarketGurus Digital', 'FinSecure Capital', 'HealthWell Pharma',
  'InfraBuild Ltd', 'EduGrowth Online', 'EcoSustain Projects'
];

const domains = [
    'Software Development', 'Data Science', 'Design', 'Marketing', 'Sales', 'Finance', 
    'Human Resources', 'Content Writing', 'Business Development', 'Product Management', 'Research'
];

// Realistic skills per domain
const domainToSkills: { [key: string]: string[] } = {
    'Software Development': ['React', 'Node.js', 'Python', 'Go', 'AWS', 'Docker', 'Kubernetes', 'Java'],
    'Data Science': ['Python', 'R', 'TensorFlow', 'PyTorch', 'SQL', 'Tableau', 'Power BI'],
    'Design': ['Figma', 'Adobe XD', 'Sketch', 'UI/UX', 'Prototyping', 'User Research'],
    'Marketing': ['SEO', 'SEM', 'Google Analytics', 'Content Marketing', 'Social Media'],
    'Sales': ['CRM', 'Salesforce', 'Negotiation', 'Communication'],
    'Finance': ['Excel', 'Financial Modeling', 'Accounting', 'Valuation'],
    'Human Resources': ['Recruiting', 'HRIS', 'Employee Relations', 'Onboarding'],
    'Content Writing': ['Copywriting', 'Blogging', 'Creative Writing', 'Grammar'],
    'Business Development': ['Lead Generation', 'Market Research', 'Strategy'],
    'Product Management': ['Agile', 'JIRA', 'Roadmapping', 'User Stories'],
    'Research': ['Data Analysis', 'Literature Review', 'Statistical Analysis']
};

// Expanded locations including India
const locations = [
    { type: 'remote' as const },
    { type: 'hybrid' as const, city: 'San Francisco', country: 'USA' },
    { type: 'onsite' as const, city: 'New York', country: 'USA' },
    { type: 'onsite' as const, city: 'Bangalore', country: 'India' },
    { type: 'hybrid' as const, city: 'Mumbai', country: 'India' },
    { type: 'onsite' as const, city: 'Delhi', country: 'India' },
    { type: 'remote' as const },
    { type: 'onsite' as const, city: 'Hyderabad', country: 'India' },
    { type: 'onsite' as const, city: 'Austin', country: 'USA' },
    { type: 'hybrid' as const, city: 'Pune', country: 'India' },
    { type: 'onsite' as const, city: 'Seattle', country: 'USA' }
];

const durations = ['1-2 months', '3-4 months', '5-6 months', '6+ months', 'Part-time', 'Full-time'];

// --- DYNAMIC DATA GENERATION ---
export const mockInternships: Internship[] = Array.from({ length: 80 }, (_, i) => {
    const domain = domains[i % domains.length];
    const companyName = companyNames[i % companyNames.length];
    const location = locations[i % locations.length];
    const skillsForDomain = domainToSkills[domain];
    const date = new Date();
    date.setDate(date.getDate() - i * 2);

    return {
        id: `internship-${i + 1}`,
        title: `${domain} Intern`,
        company: {
            id: `company-${i % companyNames.length + 1}`,
            name: companyName,
            logo: `https://ui-avatars.com/api/?name=${companyName.replace(/ /g, '+')}&background=random&color=fff`,
            industry: domain
        },
        description: `An exciting opportunity for a motivated ${domain} Intern at ${companyName}. You will work on real-world projects and gain valuable industry experience.`,
        requirements: [`Basic understanding of ${domain}`, 'Strong communication skills', 'Eagerness to learn'],
        skills: skillsForDomain.slice(0, Math.floor(Math.random() * 3) + 2),
        domain: domain,
        location: location,
        duration: durations[i % durations.length],
        stipend: Math.random() > 0.2 ? { 
            amount: 500 + Math.floor(Math.random() * 300) * 5, 
            currency: location.country === 'India' ? '₹' : '$', 
            period: 'monthly' 
        } : undefined,
        applicationDeadline: new Date(new Date().getTime() + (30 - i) * 24 * 60 * 60 * 1000).toISOString(),
        startDate: new Date(new Date().getTime() + (45 - i) * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true,
        applicationsCount: Math.floor(Math.random() * 150),
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
    };
});

export const mockCompanies = companyNames.map((name, i) => ({
  id: `company-${i + 1}`,
  name: name,
  logo: `https://ui-avatars.com/api/?name=${name.replace(/ /g, '+')}&background=random&color=fff`,
  industry: domains[i % domains.length],
  description: `A leading company in the ${domains[i % domains.length]} industry, focused on innovation and growth.`,
  openingsCount: mockInternships.filter(internship => internship.company.name === name).length,
}));