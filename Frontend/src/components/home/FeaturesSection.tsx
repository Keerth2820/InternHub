import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Target, 
  Users, 
  Shield, 
  Zap, 
  Award,
  BookOpen,
  MessageSquare
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Matching',
      description: 'Our AI-powered algorithm matches you with internships based on your skills, interests, and career goals.'
    },
    {
      icon: Target,
      title: 'Personalized Recommendations',
      description: 'Get curated internship suggestions tailored to your profile and preferences.'
    },
    {
      icon: Users,
      title: 'Top Companies',
      description: 'Access opportunities from leading companies across various industries and domains.'
    },
    {
      icon: Shield,
      title: 'Verified Opportunities',
      description: 'All internships are verified and screened to ensure quality and legitimacy.'
    },
    {
      icon: Zap,
      title: 'Quick Applications',
      description: 'Apply to multiple internships with one click using your saved profile and resume.'
    },
    {
      icon: Award,
      title: 'Skill Development',
      description: 'Find internships that help you develop new skills and advance your career.'
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description: 'Access guides, tips, and resources to help you succeed in your internship search.'
    },
    {
      icon: MessageSquare,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our dedicated support team.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose InternHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to find and secure the perfect internship that launches your career.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6 group-hover:bg-primary-200 transition-colors">
                <feature.icon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;