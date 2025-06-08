import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {Briefcase } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  description: string;
  openingsCount: number;
}

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <motion.div whileHover={{ y: -5 }} className="h-full">
      <Card className="flex flex-col h-full p-6">
        <div className="flex items-start space-x-4 mb-4">
          <img src={company.logo} alt={`${company.name} logo`} className="w-16 h-16 rounded-lg object-cover" />
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{company.name}</h3>
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{company.industry}</p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
          {company.description}
        </p>
        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
          <div className="flex justify-between items-center">
             <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Briefcase className="h-4 w-4" />
                <span>{company.openingsCount} open internships</span>
             </div>
             <Link to={`/search?q=${encodeURIComponent(company.name)}`}>
                <Button variant="outline" size="sm">View Jobs</Button>
             </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CompanyCard;