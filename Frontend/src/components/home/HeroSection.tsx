import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, TrendingUp, Users, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (location) params.set('location', location);
    navigate(`/search?${params.toString()}`);
  };

  const stats = [
    { icon: Briefcase, value: '10,000+', label: 'Active Internships' },
    { icon: Building2, value: '2,500+', label: 'Partner Companies' },
    { icon: Users, value: '50,000+', label: 'Students Placed' },
    { icon: TrendingUp, value: '95%', label: 'Success Rate' }
  ];

  const popularSearches = [
    'Software Development',
    'Data Science',
    'UI/UX Design',
    'Digital Marketing',
    'Product Management',
    'Content Writing'
  ];

  return (
    <div className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-subtle"></div>
        <div className="absolute top-32 right-10 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-subtle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-32 left-32 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-subtle" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Launch Your Career with{' '}
              <span className="text-primary-600">
                Perfect Internships
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Connect with top companies, gain real-world experience, and kickstart your professional journey. 
              Find internships that match your skills, interests, and career goals.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-5">
                  <Input
                    type="text"
                    placeholder="Job title, skills, or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={<Search />}
                    fullWidth
                  />
                </div>
                <div className="md:col-span-4">
                  <Input
                    type="text"
                    placeholder="Location or remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    icon={<MapPin />}
                    fullWidth
                  />
                </div>
                <div className="md:col-span-3">
                  <Button type="submit" size="lg" fullWidth>
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {popularSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => {
                      setSearchQuery(search);
                      navigate(`/search?q=${encodeURIComponent(search)}`);
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;