import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Building2, Globe, Users, FileText, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';

const CompanyProfile: React.FC = () => {
    const { user } = useAuth();

    // Form state
    const [companyName, setCompanyName] = useState(user?.name || '');
    const [industry, setIndustry] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');
    const [foundedYear, setFoundedYear] = useState('');
    const [employeeCount, setEmployeeCount] = useState('');
    
    // UI state
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch existing profile data when the component loads
        const fetchProfile = async () => {
            if (!auth.currentUser) return;
            setIsLoading(true);
            try {
                const token = await auth.currentUser.getIdToken();
                const response = await fetch('http://127.0.0.1:5000/api/me/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCompanyName(data.company_name || user?.name || '');
                    setIndustry(data.industry || '');
                    setWebsite(data.website || '');
                    setDescription(data.description || '');
                    setFoundedYear(data.founded_year || '');
                    setEmployeeCount(data.employee_count || '');
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        try {
            if (!auth.currentUser) throw new Error("Not authenticated");
            const token = await auth.currentUser.getIdToken();
            const profileData = {
                company_name: companyName,
                industry,
                website,
                description,
                founded_year: foundedYear,
                employee_count: employeeCount,
            };

            const response = await fetch('http://127.0.0.1:5000/api/me/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(profileData)
            });

            if (!response.ok) throw new Error('Failed to update profile.');
            
            setMessage('Company profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);

        } catch (error: any) {
            setMessage(error.message || 'An error occurred.');
        } finally {
            setIsSaving(false);
        }
    };

    const industries = [
        'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing',
        'Consulting', 'Media & Entertainment', 'Real Estate', 'Transportation',
        'Energy', 'Non-profit', 'Government', 'Other'
    ];

    const employeeCounts = [
        '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'
    ];

    if (isLoading) {
        return <div className="text-center py-20">Loading profile...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <Link to="/company/dashboard">
                        <Button variant="outline" className="mr-4">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Company Profile</h1>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Manage your company information and settings.</p>
                    </div>
                </div>
                <motion.div
                    className="hidden md:block p-4 bg-primary-100 dark:bg-primary-900/30 rounded-2xl"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                >
                    <Building2 className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </motion.div>
            </motion.div>

            <Card>
                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Basic Information */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Building2 className="h-5 w-5 mr-3 text-primary-600" />
                            Basic Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input 
                                label="Company Name" 
                                value={companyName} 
                                onChange={(e) => setCompanyName(e.target.value)} 
                                icon={<Building2 />} 
                                fullWidth 
                                required
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Industry
                                </label>
                                <select 
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                    required
                                >
                                    <option value="">Select an industry</option>
                                    {industries.map(ind => (
                                        <option key={ind} value={ind}>{ind}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Company Details */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Globe className="h-5 w-5 mr-3 text-primary-600" />
                            Company Details
                        </h2>
                        <div className="space-y-6">
                            <Input 
                                label="Website" 
                                type="url"
                                placeholder="https://www.yourcompany.com"
                                value={website} 
                                onChange={(e) => setWebsite(e.target.value)} 
                                icon={<Globe />} 
                                fullWidth 
                            />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input 
                                    label="Founded Year" 
                                    type="number"
                                    placeholder="e.g., 2020"
                                    value={foundedYear} 
                                    onChange={(e) => setFoundedYear(e.target.value)} 
                                    fullWidth 
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Company Size
                                    </label>
                                    <select 
                                        value={employeeCount}
                                        onChange={(e) => setEmployeeCount(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                    >
                                        <option value="">Select company size</option>
                                        {employeeCounts.map(count => (
                                            <option key={count} value={count}>{count} employees</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Company Description
                                </label>
                                <textarea
                                    rows={5}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                    placeholder="Tell us about your company, mission, and what makes you unique..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end items-center pt-4">
                        {message && (
                            <p className={`mr-4 ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                                {message}
                            </p>
                        )}
                        <Button type="submit" loading={isSaving} glow>
                            <FileText className="h-4 w-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CompanyProfile;