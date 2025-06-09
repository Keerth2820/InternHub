import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, FileText, Briefcase } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create Your Profile',
      description: 'Sign up and build a comprehensive profile showcasing your skills, education, and interests.',
      color: 'bg-primary-100 text-primary-600'
    },
    {
      icon: Search,
      title: 'Discover Opportunities',
      description: 'Browse and search through thousands of internships from top companies worldwide.',
      color: 'bg-secondary-100 text-secondary-600'
    },
    {
      icon: FileText,
      title: 'Apply with Ease',
      description: 'Submit applications with your saved profile and get matched with relevant opportunities.',
      color: 'bg-accent-100 text-accent-600'
    },
    {
      icon: Briefcase,
      title: 'Start Your Journey',
      description: 'Get selected, start your internship, and launch your professional career.',
      color: 'bg-success-100 text-success-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get started with your internship journey in just four simple steps.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${step.color} mx-auto`}>
                    <step.icon className="h-10 w-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-700 rounded-full border-4 border-gray-200 dark:border-gray-600 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-200">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
