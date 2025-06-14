import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Bookmark, User, Mail, Book, BrainCircuit, Edit, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Internship } from '../../types';
import InternshipCard from '../../components/internships/InternshipCard';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import { mockInternships, getSavedInternships, getAppliedInternships } from '../../data/mockData';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [applied, setApplied] = useState<Internship[]>([]);
  const [saved, setSaved] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [studentProfile, setStudentProfile] = useState({
    university: 'University of Technology',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Figma'],
    bio: "Passionate computer science student with a focus on full-stack web development. Eager to apply my skills in a real-world setting and contribute to innovative projects.",
    major: 'Computer Science',
    graduationYear: '2025'
  });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Load student profile from localStorage
      const savedProfile = localStorage.getItem(`student_profile_${user?.uid}`);
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        setStudentProfile({
          university: profileData.university || 'University of Technology',
          skills: profileData.skills || ['React', 'TypeScript', 'Node.js', 'Python', 'Figma'],
          bio: profileData.bio || "Passionate computer science student with a focus on full-stack web development. Eager to apply my skills in a real-world setting and contribute to innovative projects.",
          major: profileData.major || 'Computer Science',
          graduationYear: profileData.graduationYear || '2025'
        });
      }

      // Get applied and saved internships from localStorage
      const appliedIds = getAppliedInternships();
      const savedIds = getSavedInternships();
      
      const appliedInternships = mockInternships.filter(internship => appliedIds.includes(internship.id));
      const savedInternships = mockInternships.filter(internship => savedIds.includes(internship.id));
      
      setApplied(appliedInternships.slice(0, 2)); // Show only 2 recent
      setSaved(savedInternships.slice(0, 2)); // Show only 2 recent
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [user]);

  const renderInternshipList = (internships: Internship[], emptyMessage: string, variant: 'applied' | 'saved', viewAllLink: string) => {
    if (isLoading) {
      return <div className="grid md:grid-cols-2 gap-6"><SkeletonLoader variant="card" count={2} /></div>;
    }
    if (internships.length === 0) {
      return (
        <Card className="p-8 text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            {variant === 'applied' ? <FileText className="h-12 w-12 mx-auto" /> : <Bookmark className="h-12 w-12 mx-auto" />}
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{emptyMessage}</p>
          <Link to="/search">
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Browse Internships
            </Button>
          </Link>
        </Card>
      );
    }
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {internships.map(internship => (
            <InternshipCard key={`${variant}-${internship.id}`} internship={internship} />
          ))}
        </div>
        {internships.length >= 2 && (
          <div className="text-center">
            <Link to={viewAllLink}>
              <Button variant="outline">
                View All {variant === 'applied' ? 'Applications' : 'Saved Internships'}
              </Button>
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.name}!</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Here's your personal dashboard to track your internship journey.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Profile Details */}
          <motion.div 
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card padding="lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">My Profile</h2>
                <Link to="/student/profile">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Student</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-4" />
                  <span className="text-gray-900 dark:text-gray-100">{user?.email}</span>
                </div>
                <div className="flex items-center">
                  <Book className="h-5 w-5 text-gray-500 mr-4" />
                  <div>
                    <span className="text-gray-900 dark:text-gray-100">{studentProfile.university}</span>
                    {studentProfile.major && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{studentProfile.major} • Class of {studentProfile.graduationYear}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="border-t dark:border-gray-700 my-6"></div>
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <BrainCircuit className="h-5 w-5 mr-3 text-primary-500" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {studentProfile.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t dark:border-gray-700 my-6"></div>
              <div>
                <h3 className="text-lg font-semibold mb-3">About</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {studentProfile.bio}
                </p>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card padding="lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Applications</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{getAppliedInternships().length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Saved</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{getSavedInternships().length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Profile Views</span>
                  <span className="font-semibold text-gray-900 dark:text-white">24</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right Column: Internship Activity */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Recent Applications</h2>
                </div>
                <Link to="/student/applied">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              {renderInternshipList(applied, "You haven't applied to any internships yet.", 'applied', '/student/applied')}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Bookmark className="h-6 w-6 text-secondary-600 dark:text-secondary-400 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Saved Internships</h2>
                </div>
                <Link to="/student/saved">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              {renderInternshipList(saved, "You haven't saved any internships yet.", 'saved', '/student/saved')}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
