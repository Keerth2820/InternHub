export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'company';
  avatar?: string;
  createdAt: string;
}

export interface Student extends User {
  role: 'student';
  skills: string[];
  bio?: string;
  university?: string;
  graduation?: string;
  resume?: string;
}

export interface Company extends User {
  role: 'company';
  companyName: string;
  industry: string;
  website?: string;
  description?: string;
  logo?: string;
}

export interface Internship {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
    logo?: string;
    industry: string;
  };
  description: string;
  requirements: string[];
  skills: string[];
  domain: string;
  location: {
    type: 'onsite' | 'remote' | 'hybrid';
    city?: string;
    country?: string;
  };
  duration: string;
  stipend?: {
    amount: number;
    currency: string;
    period: 'monthly' | 'total';
  };
  applicationDeadline: string;
  startDate: string;
  isActive: boolean;
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  internshipId: string;
  studentId: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: string;
  coverLetter?: string;
  resumeUrl?: string;
}

export interface FilterState {
  domain: string;
  skills: string[];
  locationType: 'any' | 'remote' | 'onsite' | 'hybrid'; // New
  locationQuery: string; // New
  duration: string;
  sortBy: 'recent' | 'stipend' | 'deadline';
  searchQuery: string;
}