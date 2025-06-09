import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  Building2,
  BookmarkIcon,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Internship } from '../../types';
import Button from '../common/Button';

interface InternshipCardProps {
  internship: Internship;
  onSave?: (id: string) => void;
  isSaved?: boolean;
  variant?: 'default' | 'compact';
}

const InternshipCard: React.FC<InternshipCardProps> = ({
  internship,
  onSave,
  isSaved = false,
  variant = 'default'
}) => {
  const {
    id,
    title,
    company,
    description,
    skills,
    domain,
    location,
    duration,
    stipend,
    applicationDeadline,
    applicationsCount
  } = internship;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getLocationText = () => {
    if (location.type === 'remote') return 'Remote';
    if (location.type === 'hybrid') return `Hybrid • ${location.city}`;
    return `${location.city}, ${location.country}`;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: { 
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  const glowVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        variants={glowVariants}
        className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"
      />
      
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start space-x-3 flex-1">
            <motion.div 
              className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              {company.logo ? (
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <Building2 className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              )}
            </motion.div>
            <div className="flex-1 min-w-0">
              <Link 
                to={`/internships/${id}`}
                className="block group"
              >
                <motion.h3 
                  className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  {title}
                </motion.h3>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{company.name}</p>
              <div className="flex items-center space-x-2 mt-2">
                <motion.span 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {domain}
                </motion.span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {applicationsCount} applications
                </span>
              </div>
            </div>
          </div>
          
          {onSave && (
            <motion.button
              onClick={() => onSave(id)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isSaved 
                  ? 'text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30' 
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <BookmarkIcon className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
            </motion.button>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {skills.slice(0, 3).map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {skill}
            </motion.span>
          ))}
          {skills.length > 3 && (
            <motion.span 
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              whileHover={{ scale: 1.05 }}
            >
              +{skills.length - 3} more
            </motion.span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ x: 2 }}
          >
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{getLocationText()}</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ x: 2 }}
          >
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{duration}</span>
          </motion.div>
          {stipend && (
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ x: 2 }}
            >
              <DollarSign className="h-4 w-4 flex-shrink-0" />
              <span>
                {stipend.currency}{stipend.amount.toLocaleString()}/{stipend.period}
              </span>
            </motion.div>
          )}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ x: 2 }}
          >
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>Apply by {formatDate(applicationDeadline)}</span>
          </motion.div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
          <Link to={`/internships/${id}`}>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
          <Link to={`/internships/${id}/apply`}>
            <Button size="sm" glow>
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default InternshipCard;
