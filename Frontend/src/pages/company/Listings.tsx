import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Briefcase, Users, Eye, Edit, Trash2, Calendar, MapPin, DollarSign, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Internship } from '../../types';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import { mockInternships } from '../../data/mockData';

const CompanyListings: React.FC = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching company's own listings
    setIsLoading(true);
    const timer = setTimeout(() => {
      // In a real app, you'd fetch from /api/company/listings
      // For now, we'll show a subset as if this company posted them
      setListings(mockInternships.slice(0, 8));
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDeleteListing = (id: string) => {
    if (window.confirm('Are you sure you want to delete this internship listing?')) {
      setListings(prev => prev.filter(listing => listing.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getLocationText = (location: Internship['location']) => {
    if (location.type === 'remote') return 'Remote';
    if (location.type === 'hybrid') return `Hybrid • ${location.city}`;
    return `${location.city}, ${location.country}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center"
        >
          <Link to="/company/dashboard">
            <Button variant="outline" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Internship Listings</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Manage all your posted internships in one place
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/company/post">
            <Button size="lg" className="mt-4 md:mt-0" glow>
              <Plus className="h-5 w-5 mr-2" />
              Post New Internship
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.1 }}
        >
          <Card hover className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Listings</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {isLoading ? '...' : listings.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                <Briefcase className="h-8 w-8" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.2 }}
        >
          <Card hover className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Active Listings</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {isLoading ? '...' : listings.filter(l => l.isActive).length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <Eye className="h-8 w-8" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.3 }}
        >
          <Card hover className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {isLoading ? '...' : listings.reduce((sum, l) => sum + l.applicationsCount, 0)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400">
                <Users className="h-8 w-8" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.4 }}
        >
          <Card hover className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg. Applications</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {isLoading ? '...' : Math.round(listings.reduce((sum, l) => sum + l.applicationsCount, 0) / (listings.length || 1))}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400">
                <Calendar className="h-8 w-8" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Listings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {isLoading ? (
          <div className="space-y-6">
            <SkeletonLoader variant="card" count={4} />
          </div>
        ) : listings.length > 0 ? (
          <div className="space-y-6">
            {listings.map((internship, index) => (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                            {internship.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {getLocationText(internship.location)}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Apply by {formatDate(internship.applicationDeadline)}
                            </span>
                            {internship.stipend && (
                              <span className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" />
                                {internship.stipend.currency}{internship.stipend.amount}/{internship.stipend.period}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            internship.isActive 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }`}>
                            {internship.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {internship.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {internship.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300"
                          >
                            {skill}
                          </span>
                        ))}
                        {internship.skills.length > 4 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                            +{internship.skills.length - 4} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{internship.applicationsCount} applications received</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 lg:ml-6">
                      <Link to={`/internships/${internship.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      <Link to={`/company/edit/${internship.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteListing(internship.id)}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Briefcase className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No internships posted yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start by posting your first internship to attract talented students.
            </p>
            <Link to="/company/post">
              <Button glow>
                <Plus className="h-5 w-5 mr-2" />
                Post Your First Internship
              </Button>
            </Link>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default CompanyListings;