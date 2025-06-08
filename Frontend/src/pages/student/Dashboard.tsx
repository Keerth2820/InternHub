import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Bookmark } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Internship } from '../../types';
import InternshipCard from '../../components/internships/InternshipCard';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import { mockInternships } from '../../data/mockData';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [applied, setApplied] = useState<Internship[]>([]);
  const [saved, setSaved] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user-specific data
    setIsLoading(true);
    const timer = setTimeout(() => {
      // In a real app, you'd fetch from /api/me/applications and /api/me/saved
      setApplied([mockInternships[0]]); // Mock: Applied to the first internship
      setSaved([mockInternships[1], mockInternships[2]]); // Mock: Saved the other two
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderInternshipList = (internships: Internship[], emptyMessage: string) => {
    if (isLoading) {
      return <div className="grid md:grid-cols-2 gap-6"><SkeletonLoader variant="card" count={2} /></div>;
    }
    if (internships.length === 0) {
      return <p className="text-gray-500 dark:text-gray-400 text-center py-8">{emptyMessage}</p>;
    }
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {internships.map(internship => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome, {user?.name}!</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Here's a summary of your internship search.</p>
      </motion.div>

      <div className="mt-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center mb-6">
            <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">My Applications</h2>
          </div>
          {renderInternshipList(applied, "You haven't applied to any internships yet.")}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-12">
          <div className="flex items-center mb-6">
            <Bookmark className="h-6 w-6 text-secondary-600 dark:text-secondary-400 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Saved Internships</h2>
          </div>
          {renderInternshipList(saved, "You haven't saved any internships yet.")}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;