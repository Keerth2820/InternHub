import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Internship } from '../../types';
import { mockInternships } from '../../data/mockData'; // We'll use this until the API is ready
import SkeletonLoader from '../../components/common/SkeletonLoader';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { UploadCloud, MessageSquare, Send } from 'lucide-react';

const ApplyFlow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [internship, setInternship] = useState<Internship | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for the form fields
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => {
    // In a real app, you would fetch from `/api/internships/:id`
    // For now, we simulate this by finding the internship in our mock data.
    setIsLoading(true);
    setTimeout(() => {
      const foundInternship = mockInternships.find(i => i.id === id);
      setInternship(foundInternship || null);
      setIsLoading(false);
    }, 500); // Simulate network delay
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile || !coverLetter) {
        alert("Please upload a CV and write a cover letter.");
        return;
    }

    setIsSubmitting(true);
    console.log("Submitting application for internship:", id, { cvFile, coverLetter });
    
    // TODO: In a real app, you would use fetch() to send this data
    // as FormData to your backend API: /api/internships/:id/apply
    
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    
    setIsSubmitting(false);
    alert('Application submitted successfully! (This is a simulation)');
    // Navigate to the "My Applications" page after success
    navigate('/student/applied');
  };

  // State 1: Loading
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <SkeletonLoader variant="text" count={1} className="h-10 mb-4" />
        <SkeletonLoader variant="text" count={1} className="w-1/2 h-6 mb-8" />
        <SkeletonLoader variant="card" count={1} className="h-96" />
      </div>
    );
  }

  // State 2: Internship Not Found
  if (!internship) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Internship Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">The internship you are looking for may have been closed or the link is incorrect.</p>
        <Link to="/search">
            <Button className="mt-6">Back to Search</Button>
        </Link>
      </div>
    );
  }

  // State 3: Success - Show the Form
  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto py-12 px-4"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Apply for {internship.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          at {internship.company.name}
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* CV Upload Section */}
            <div>
                <h2 className="text-xl font-semibold flex items-center mb-4">
                    <UploadCloud className="mr-3 h-6 w-6 text-primary-500" />
                    <span>Step 1: Upload Your CV/Resume</span>
                </h2>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => setCvFile(e.target.files ? e.target.files[0] : null)} accept=".pdf,.doc,.docx" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                </div>
                {cvFile && <p className="mt-2 text-sm text-green-600 dark:text-green-400">Selected file: {cvFile.name}</p>}
            </div>

            {/* Questions Section */}
            <div>
                <h2 className="text-xl font-semibold flex items-center mb-4">
                    <MessageSquare className="mr-3 h-6 w-6 text-primary-500" />
                    <span>Step 2: Cover Letter</span>
                </h2>
                <textarea
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder={`Why are you a good fit for the ${internship.title} role at ${internship.company.name}?`}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    required
                />
            </div>
            
            {/* Submission Section */}
            <div className="pt-5">
                <div className="flex justify-end items-center gap-4">
                    <Link to={`/internships/${id}`} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        Cancel
                    </Link>
                    <Button type="submit" size="lg" glow loading={isSubmitting}>
                        <Send className="h-5 w-5 mr-2" />
                        Submit Application
                    </Button>
                </div>
            </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default ApplyFlow;
