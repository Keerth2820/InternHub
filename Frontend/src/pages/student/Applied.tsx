import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, MapPin, Building2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockInternships, getAppliedInternships } from '../../data/mockData.ts';
import { Internship } from '../../types';
import InternshipCard from '../../components/internships/InternshipCard';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Applied: React.FC = () => {
  const [appliedInternships, setAppliedInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      const appliedIds = getAppliedInternships();
      const applied = mockInternships.filter(internship => appliedIds.includes(internship.id));
      setAppliedInternships(applied);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <motion.div 
        className="flex items-center mb-8" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-4">
          <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Applications</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {isLoading ? 'Loading...' : `You have applied to ${appliedInternships.length} internships.`}
          </p>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          <SkeletonLoader variant="card" count={4} />
        </div>
      ) : appliedInternships.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No applications yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start exploring internships and apply to opportunities that match your interests.
            </p>
            <Link to="/search">
              <Button glow>
                <ExternalLink className="h-5 w-5 mr-2" />
                Browse Internships
              </Button>
            </Link>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {appliedInternships.map((internship) => (
            <motion.div key={internship.id} variants={itemVariants}>
              <InternshipCard internship={internship} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Applied;
