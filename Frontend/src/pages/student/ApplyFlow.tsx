import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Internship } from '../../types';
import { mockInternships, applyToInternship } from '../../data/mockData.ts';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { UploadCloud, MessageSquare, Send, CheckCircle, ArrowLeft } from 'lucide-react';

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
    setIsLoading(true);
    setTimeout(() => {
      const foundInternship = mockInternships.find(i => i.id === id);
      setInternship(foundInternship || null);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile || !coverLetter.trim()) {
        alert("Please upload a CV and write a cover letter.");
        return;
    }

    setIsSubmitting(true);
    console.log("Submitting application for internship:", id, { cvFile, coverLetter });
    
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    
    // Add to applied internships
    if (id) {
      applyToInternship(id);
    }
    
    setIsSubmitting(false);
    
    // Show success and navigate
    navigate('/student/applied', { 
      state: { 
        message: `Application submitted successfully for ${internship?.title}!` 
      }
    });
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
        <Card className="p-12 text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Internship Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The internship you are looking for may have been closed or the link is incorrect.</p>
          <Link to="/search">
            <Button>Back to Search</Button>
          </Link>
        </Card>
      </div>
    );
  }

  // State 3: Success - Show the Form
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
            <Link to={`/internships/${id}`}>
              <Button variant="outline" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Apply for {internship.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                at {internship.company.name}
              </p>
            </div>
          </div>
          <motion.div
            className="hidden md:block p-4 bg-primary-100 dark:bg-primary-900/30 rounded-2xl"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Send className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </motion.div>
        </div>

        {/* Internship Summary */}
        <Card className="mb-8 p-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
              {internship.company.logo ? (
                <img 
                  src={internship.company.logo} 
                  alt={internship.company.name}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {internship.company.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{internship.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{internship.company.name}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{internship.location.type === 'remote' ? 'Remote' : `${internship.location.city}, ${internship.location.country}`}</span>
                <span>•</span>
                <span>{internship.duration}</span>
                {internship.stipend && (
                  <>
                    <span>•</span>
                    <span>{internship.stipend.currency}{internship.stipend.amount}/{internship.stipend.period}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* CV Upload Section */}
            <div>
              <h2 className="text-xl font-semibold flex items-center mb-4">
                <UploadCloud className="mr-3 h-6 w-6 text-primary-500" />
                <span>Step 1: Upload Your Resume/CV</span>
              </h2>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md hover:border-primary-400 dark:hover:border-primary-500 transition-colors">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                      <span>Upload a file</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only" 
                        onChange={(e) => setCvFile(e.target.files ? e.target.files[0] : null)} 
                        accept=".pdf,.doc,.docx" 
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>
              {cvFile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center text-sm text-green-600 dark:text-green-400"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Selected file: {cvFile.name}
                </motion.div>
              )}
            </div>

            {/* Cover Letter Section */}
            <div>
              <h2 className="text-xl font-semibold flex items-center mb-4">
                <MessageSquare className="mr-3 h-6 w-6 text-primary-500" />
                <span>Step 2: Write Your Cover Letter</span>
              </h2>
              <textarea
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-200"
                placeholder={`Dear ${internship.company.name} Team,

I am writing to express my strong interest in the ${internship.title} position. I believe my skills and passion make me an ideal candidate for this role.

Please explain why you're interested in this internship and how your background aligns with the requirements...`}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                required
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Tip: Mention specific skills from the job description and explain why you're excited about this opportunity.
              </p>
            </div>
            
            {/* Submission Section */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>By submitting this application, you agree to our terms and conditions.</p>
                </div>
                <div className="flex items-center gap-4">
                  <Link to={`/internships/${id}`} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Cancel
                  </Link>
                  <Button type="submit" size="lg" glow loading={isSubmitting}>
                    <Send className="h-5 w-5 mr-2" />
                    Submit Application
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default ApplyFlow;
