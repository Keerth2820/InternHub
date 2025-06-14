import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockInternships, getSavedInternships, unsaveInternship } from '../../data/mockData.ts';
import { Internship } from '../../types';
import InternshipCard from '../../components/internships/InternshipCard';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Saved: React.FC = () => {
  const [savedInternships, setSavedInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      const savedIds = getSavedInternships();
      const saved = mockInternships.filter(internship => savedIds.includes(internship.id));
      setSavedInternships(saved);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleUnsave = (internshipId: string) => {
    unsaveInternship(internshipId);
    setSavedInternships(prev => prev.filter(internship => internship.id !== internshipId));
  };

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
        <div className="p-3 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg mr-4">
          <Bookmark className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Saved Internships</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {isLoading ? 'Loading...' : `You have ${savedInternships.length} saved internships.`}
          </p>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          <SkeletonLoader variant="card" count={4} />
        </div>
      ) : savedInternships.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-12 text-center">
            <Bookmark className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No saved internships yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Save internships you're interested in to easily find them later.
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
          {savedInternships.map((internship) => (
            <motion.div key={internship.id} variants={itemVariants}>
              <InternshipCard 
                internship={internship} 
                onSave={handleUnsave}
                isSaved={true}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Saved;
