import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockCompanies } from '../data/mockData';
import CompanyCard from '../components/companies/CompanyCard';
import SkeletonLoader from '../components/common/SkeletonLoader';

const Companies: React.FC = () => {
  const [companies] = useState(mockCompanies);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Explore Top Companies</h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Discover great companies and find your next opportunity.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonLoader variant="card" count={9} />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {companies.map(company => (
              <motion.div key={company.id} variants={itemVariants}>
                <CompanyCard company={company} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Companies;
