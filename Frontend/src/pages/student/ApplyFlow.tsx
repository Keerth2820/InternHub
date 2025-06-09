import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ApplyFlow: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">Apply for Internship #{id}</h1>
      <p className="text-gray-600 mb-8">This is where the multi-step application process will go.</p>

       <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Step 1: Upload CV</h2>
        <p className="my-4 text-gray-600 dark:text-gray-400">An input for file upload would go here.</p>
        
        <h2 className="text-xl font-semibold mt-8 text-gray-900 dark:text-white">Step 2: Answer Questions</h2>
        <p className="my-4 text-gray-600 dark:text-gray-400">Text areas for "Why should we hire you?" etc. would go here.</p>

        <div className="mt-8 flex justify-between">
            <Link to={`/internships/${id}`} className="text-gray-600 dark:text-gray-400 hover:text-primary-500">Cancel</Link>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700">
                Submit Application
            </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyFlow;