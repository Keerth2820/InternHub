import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, Calendar, Users, Send, ArrowLeft, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockInternships } from '../../data/mockData';
import { Internship } from '../../types';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import SkillsInput from '../../components/common/SkillsInput';
import SkeletonLoader from '../../components/common/SkeletonLoader';

const EditInternship: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    skills: [] as string[],
    domain: '',
    locationType: 'remote',
    city: '',
    country: '',
    duration: '',
    stipendAmount: '',
    stipendCurrency: 'USD',
    applicationDeadline: '',
    startDate: ''
  });

  useEffect(() => {
    // Simulate fetching internship data
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundInternship = mockInternships.find(i => i.id === id);
      if (foundInternship) {
        setInternship(foundInternship);
        setFormData({
          title: foundInternship.title,
          description: foundInternship.description,
          requirements: foundInternship.requirements.join('\n'),
          skills: foundInternship.skills,
          domain: foundInternship.domain,
          locationType: foundInternship.location.type,
          city: foundInternship.location.city || '',
          country: foundInternship.location.country || '',
          duration: foundInternship.duration,
          stipendAmount: foundInternship.stipend?.amount.toString() || '',
          stipendCurrency: foundInternship.stipend?.currency || 'USD',
          applicationDeadline: foundInternship.applicationDeadline.split('T')[0],
          startDate: foundInternship.startDate.split('T')[0]
        });
      }
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    console.log('Updating Internship Data:', formData);
    await new Promise(r => setTimeout(r, 2000));
    
    setIsSaving(false);
    // Show success message and navigate
    alert('Internship updated successfully!');
    navigate('/company/listings');
  };

  const domains = [
    'Software Development', 'Data Science', 'Design', 'Marketing', 'Sales', 
    'Finance', 'Human Resources', 'Content Writing', 'Business Development', 
    'Product Management', 'Research'
  ];

  const durations = [
    '1-2 months', '3-4 months', '5-6 months', '6+ months', 'Part-time', 'Full-time'
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <SkeletonLoader variant="text" count={1} className="h-10 mb-4" />
          <SkeletonLoader variant="text" count={1} className="w-1/2 h-6 mb-8" />
          <SkeletonLoader variant="card" count={1} className="h-96" />
        </div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
        <Card className="p-12 text-center max-w-md">
          <div className="text-red-500 mb-4">
            <Briefcase className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Internship Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The internship you are trying to edit does not exist.</p>
          <Link to="/company/listings">
            <Button>Back to Listings</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/company/listings">
              <Button variant="outline" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Listings
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Internship</h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                Update your internship details to attract the best candidates.
              </p>
            </div>
          </div>
          <motion.div
            className="hidden md:block p-4 bg-primary-100 dark:bg-primary-900/30 rounded-2xl"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Briefcase className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </motion.div>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-3 text-primary-600" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  name="title" 
                  label="Internship Title" 
                  placeholder="e.g., Frontend Developer Intern" 
                  value={formData.title}
                  onChange={handleInputChange} 
                  fullWidth 
                  required 
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Domain
                  </label>
                  <select 
                    name="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  >
                    <option value="">Select a domain</option>
                    {domains.map(domain => (
                      <option key={domain} value={domain}>{domain}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Description & Requirements */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="h-5 w-5 mr-3 text-primary-600" />
                Job Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Description
                  </label>
                  <textarea 
                    name="description" 
                    rows={5} 
                    placeholder="Describe the role, responsibilities, and what the intern will learn..."
                    value={formData.description}
                    onChange={handleInputChange} 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Requirements
                  </label>
                  <textarea 
                    name="requirements" 
                    rows={4} 
                    placeholder="List the qualifications, experience, and skills required..."
                    value={formData.requirements}
                    onChange={handleInputChange} 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Required Skills
                  </label>
                  <SkillsInput skills={formData.skills} setSkills={(skills) => setFormData(prev => ({ ...prev, skills }))} />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-primary-600" />
                Location
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Work Type
                  </label>
                  <select 
                    name="locationType" 
                    value={formData.locationType}
                    onChange={handleInputChange} 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="remote">Remote</option>
                    <option value="onsite">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                
                {formData.locationType !== 'remote' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input 
                      name="city" 
                      label="City" 
                      placeholder="e.g., New York" 
                      value={formData.city}
                      onChange={handleInputChange} 
                      fullWidth 
                    />
                    <Input 
                      name="country" 
                      label="Country" 
                      placeholder="e.g., USA" 
                      value={formData.country}
                      onChange={handleInputChange} 
                      fullWidth 
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Duration & Compensation */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-3 text-primary-600" />
                Duration & Compensation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duration
                  </label>
                  <select 
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  >
                    <option value="">Select duration</option>
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Currency
                  </label>
                  <select 
                    name="stipendCurrency"
                    value={formData.stipendCurrency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <Input 
                  name="stipendAmount" 
                  label="Monthly Stipend" 
                  type="number" 
                  placeholder="e.g., 2000" 
                  value={formData.stipendAmount}
                  onChange={handleInputChange} 
                  icon={<DollarSign/>} 
                  fullWidth 
                />
              </div>
            </div>

            {/* Dates */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-primary-600" />
                Important Dates
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Input 
                  name="applicationDeadline" 
                  label="Application Deadline" 
                  type="date" 
                  value={formData.applicationDeadline}
                  onChange={handleInputChange} 
                  icon={<Calendar/>} 
                  fullWidth 
                  required 
                />
                <Input 
                  name="startDate" 
                  label="Expected Start Date" 
                  type="date" 
                  value={formData.startDate}
                  onChange={handleInputChange} 
                  icon={<Calendar/>} 
                  fullWidth 
                  required 
                />
              </div>
            </div>
            
            {/* Submit */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-end space-x-4">
                <Link to="/company/listings">
                  <Button variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" size="lg" loading={isSaving} glow>
                  <Send className="h-5 w-5 mr-2" />
                  Update Internship
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default EditInternship;