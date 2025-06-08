import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, Calendar, Users, Send } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const PostInternship: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '', // Using comma-separated string for simplicity
    domain: '',
    locationType: 'remote',
    city: '',
    country: '',
    duration: '',
    stipendAmount: '',
    applicationDeadline: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Submitting Internship Data:', formData);

    // Simulate POST request to /api/internships
    await new Promise(r => setTimeout(r, 1500));
    
    setIsLoading(false);
    // On success, navigate to the company dashboard
    navigate('/company/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <Briefcase className="mx-auto h-12 w-12 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Post a New Internship</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Fill out the details below to find the best talent.</p>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <Input name="title" label="Internship Title" placeholder="e.g., Frontend Developer Intern" onChange={handleInputChange} fullWidth required />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea name="description" rows={5} placeholder="Describe the role and responsibilities..." onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800" required />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input name="domain" label="Domain" placeholder="e.g., Software Development" onChange={handleInputChange} fullWidth required />
              <Input name="skills" label="Skills (comma-separated)" placeholder="e.g., React, Python, Figma" onChange={handleInputChange} fullWidth required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location Type</label>
              <select name="locationType" onChange={handleInputChange} value={formData.locationType} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800">
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            
            {formData.locationType !== 'remote' && (
              <div className="grid md:grid-cols-2 gap-6">
                <Input name="city" label="City" placeholder="e.g., New York" onChange={handleInputChange} fullWidth />
                <Input name="country" label="Country" placeholder="e.g., USA" onChange={handleInputChange} fullWidth />
              </div>
            )}
            
            <div className="grid md:grid-cols-3 gap-6">
              <Input name="duration" label="Duration" placeholder="e.g., 3 Months" onChange={handleInputChange} fullWidth />
              <Input name="stipendAmount" label="Stipend ($/month)" type="number" placeholder="e.g., 2000" onChange={handleInputChange} icon={<DollarSign/>} fullWidth />
              <Input name="applicationDeadline" label="Application Deadline" type="date" onChange={handleInputChange} icon={<Calendar/>} fullWidth required />
            </div>
            
            <div className="pt-4">
              <Button type="submit" size="lg" loading={isLoading} fullWidth glow>
                <Send className="h-5 w-5 mr-2" />
                Post Internship
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default PostInternship;
