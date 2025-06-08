import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { mockInternships } from '../../data/mockData';
import InternshipCard from '../../components/internships/InternshipCard';
import SkeletonLoader from '../../components/common/SkeletonLoader';

const Applied: React.FC = () => {
  const [appliedInternships] = useState(mockInternships.slice(0, 5)); // Mock: student applied to first 5
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div className="flex items-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-4" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Applications</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {isLoading ? 'Loading...' : `You have applied to ${appliedInternships.length} internships.`}
          </p>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6"><SkeletonLoader variant="card" count={4} /></div>
      ) : appliedInternships.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-16">You haven't applied to any internships yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appliedInternships.map(internship => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Applied;