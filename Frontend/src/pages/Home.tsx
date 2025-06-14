import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorks from '../components/home/HowItWorks';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
    </div>
  );
};

export default Home;
