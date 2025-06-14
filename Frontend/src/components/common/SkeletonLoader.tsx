import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'avatar' | 'button';
  count?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'card',
  count = 1,
  className = ''
}) => {
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { x: '100%' },
  };

  const SkeletonCard = () => (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-start space-x-3 mb-4">
        <div className="relative w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="flex-1 space-y-2">
          <div className="relative h-4 bg-gray-200 rounded overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.1 }}
            />
          </div>
          <div className="relative h-3 bg-gray-200 rounded w-3/4 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="relative h-3 bg-gray-200 rounded overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
          />
        </div>
        <div className="relative h-3 bg-gray-200 rounded w-5/6 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.4 }}
          />
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative h-6 w-16 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 + i * 0.1 }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="relative h-8 w-24 bg-gray-200 rounded overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.8 }}
          />
        </div>
        <div className="relative h-8 w-20 bg-gray-200 rounded overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.9 }}
          />
        </div>
      </div>
    </div>
  );

  const SkeletonText = () => (
    <div className={`space-y-2 ${className}`}>
      <div className="relative h-4 bg-gray-200 rounded overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="relative h-4 bg-gray-200 rounded w-3/4 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.1 }}
        />
      </div>
    </div>
  );

  const SkeletonAvatar = () => (
    <div className={`relative w-10 h-10 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );

  const SkeletonButton = () => (
    <div className={`relative h-10 w-24 bg-gray-200 rounded-md overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );

  const renderSkeleton = () => {
    switch (variant) {
      case 'text':
        return <SkeletonText />;
      case 'avatar':
        return <SkeletonAvatar />;
      case 'button':
        return <SkeletonButton />;
      default:
        return <SkeletonCard />;
    }
  };
  
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
