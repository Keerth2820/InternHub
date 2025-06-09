import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Bookmark, User, Mail, Book, BrainCircuit, Edit } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Internship } from '../../types';
import InternshipCard from '../../components/internships/InternshipCard';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import { mockInternships } from '../../data/mockData';
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
    bio: "Passionate computer science student with a focus on full-stack web development. Eager to apply my skills in a real-world setting and contribute to innovative projects."
  });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setApplied(mockInternships.slice(0, 2));
      setSaved(mockInternships.slice(2, 4));
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderInternshipList = (internships: Internship[], emptyMessage: string, variant: 'applied' | 'saved') => {
    if (isLoading) {
      return <div className="grid md:grid-cols-2 gap-6"><SkeletonLoader variant="card" count={2} /></div>;
    }
    if (internships.length === 0) {
      return <p className="text-gray-500 dark:text-gray-400 text-center py-8">{emptyMessage}</p>;
    }
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {internships.map(internship => (
          <InternshipCard key={`${variant}-${internship.id}`} internship={internship} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome, {user?.name}!</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Here's your personal dashboard.</p>
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
                  <User className="h-5 w-5 text-gray-500 mr-4" />
                  <span className="text-gray-900 dark:text-gray-100">{user?.name}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-4" />
                  <span className="text-gray-900 dark:text-gray-100">{user?.email}</span>
                </div>
                <div className="flex items-center">
                  <Book className="h-5 w-5 text-gray-500 mr-4" />
                  <span className="text-gray-900 dark:text-gray-100">{studentProfile.university}</span>
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
            </Card>
          </motion.div>

          {/* Right Column: Internship Activity */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Recent Applications</h2>
              </div>
              {renderInternshipList(applied, "You haven't applied to any internships yet.", 'applied')}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <Bookmark className="h-6 w-6 text-secondary-600 dark:text-secondary-400 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Saved Internships</h2>
              </div>
              {renderInternshipList(saved, "You haven't saved any internships yet.", 'saved')}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
