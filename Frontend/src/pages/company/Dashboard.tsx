import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Briefcase, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Internship } from '../../types';
import InternshipCard from '../../components/internships/InternshipCard';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import { mockInternships } from '../../data/mockData';

const CompanyDashboard: React.FC = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching company's own listings
    setIsLoading(true);
    const timer = setTimeout(() => {
      // In a real app, you'd fetch from /api/company/listings
      setListings(mockInternships); // Mock: This company posted all internships
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const totalApplications = listings.reduce((sum, i) => sum + i.applicationsCount, 0);

  const stats = [
    { name: 'Active Listings', value: listings.length, icon: Briefcase },
    { name: 'Total Applicants', value: totalApplications, icon: Users },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Company Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Manage your internships and applicants.</p>
        </div>
        <Link to="/company/post">
          <Button size="lg" className="mt-4 md:mt-0">
            <Plus className="h-5 w-5 mr-2" />
            Post New Internship
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {stats.map((stat, index) => (
          <motion.div key={stat.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
            <Card>
              <div className="flex items-center">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-4">
                  <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{isLoading ? '...' : stat.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Listings */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">My Listings</h2>
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6"><SkeletonLoader variant="card" count={4} /></div>
        ) : listings.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {listings.map(internship => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">You haven't posted any internships yet.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;