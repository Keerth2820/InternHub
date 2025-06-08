import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {Calendar, Clock, DollarSign, MapPin, CheckCircle, Building2 } from 'lucide-react';
import { Internship } from '../types';
import { mockInternships } from '../data/mockData';
import SkeletonLoader from '../components/common/SkeletonLoader';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const InternshipDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from an API
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundInternship = mockInternships.find(i => i.id === id);
      setInternship(foundInternship || null);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <SkeletonLoader variant="text" count={1} className="h-10 mb-4" />
        <SkeletonLoader variant="text" count={3} className="mb-8" />
        <SkeletonLoader variant="card" count={1} />
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Internship Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400">The internship you are looking for does not exist.</p>
      </div>
    );
  }

  const detailItems = [
    { icon: MapPin, label: 'Location', value: internship.location.type === 'remote' ? 'Remote' : `${internship.location.city}, ${internship.location.country}` },
    { icon: Clock, label: 'Duration', value: internship.duration },
    { icon: DollarSign, label: 'Stipend', value: internship.stipend ? `${internship.stipend.currency}${internship.stipend.amount}/${internship.stipend.period}` : 'Unpaid' },
    { icon: Calendar, label: 'Apply By', value: new Date(internship.applicationDeadline).toLocaleDateString() },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <Card className="mb-8 p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="h-10 w-10 text-gray-500" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{internship.title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{internship.company.name}</p>
              <span className="mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300">
                {internship.domain}
              </span>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
                <Button size="lg" glow>Apply Now</Button>
                <Button variant="outline">Save Internship</Button>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Job Description</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{internship.description}</p>
              
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Requirements</h2>
              <ul className="space-y-2">
                {internship.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Skills Required</h2>
              <div className="flex flex-wrap gap-2">
                {internship.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">{skill}</span>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Internship Details</h3>
              <ul className="space-y-4">
                {detailItems.map(item => (
                  <li key={item.label} className="flex items-center">
                    <item.icon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                      <p className="font-medium text-gray-800 dark:text-white">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InternshipDetail;