import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { User, Book, BrainCircuit, FileText, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SkillsInput from '../../components/common/SkillsInput';

const StudentProfilePage: React.FC = () => {
    const { user } = useAuth();

    // Form state
    const [name, setName] = useState(user?.name || '');
    const [university, setUniversity] = useState('');
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [graduationYear, setGraduationYear] = useState('');
    const [major, setMajor] = useState('');
    const [gpa, setGpa] = useState('');
    
    // UI state
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Simulate loading existing profile data from localStorage
        const loadProfile = () => {
            setIsLoading(true);
            try {
                const savedProfile = localStorage.getItem(`student_profile_${user?.uid}`);
                if (savedProfile) {
                    const profileData = JSON.parse(savedProfile);
                    setName(profileData.name || user?.name || '');
                    setUniversity(profileData.university || '');
                    setBio(profileData.bio || '');
                    setSkills(profileData.skills || []);
                    setGraduationYear(profileData.graduationYear || '');
                    setMajor(profileData.major || '');
                    setGpa(profileData.gpa || '');
                } else {
                    // Set default values if no saved profile
                    setName(user?.name || '');
                    setUniversity('');
                    setBio('');
                    setSkills(['React', 'JavaScript', 'Python']); // Default skills
                    setGraduationYear('');
                    setMajor('');
                    setGpa('');
                }
            } catch (error) {
                console.error("Failed to load profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Simulate API delay
        setTimeout(loadProfile, 500);
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        try {
            const profileData = {
                name,
                university,
                bio,
                skills,
                graduationYear,
                major,
                gpa,
                updatedAt: new Date().toISOString()
            };

            // Save to localStorage (simulating backend)
            localStorage.setItem(`student_profile_${user?.uid}`, JSON.stringify(profileData));
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);

        } catch (error: any) {
            setMessage('Failed to update profile. Please try again.');
            setTimeout(() => setMessage(''), 3000);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="flex items-center justify-between mb-8"
            >
                <div className="flex items-center">
                    <Link to="/student/dashboard">
                        <Button variant="outline" className="mr-4">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Your Profile</h1>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                            Keep your information up to date to attract the best opportunities.
                        </p>
                    </div>
                </div>
                <motion.div
                    className="hidden md:block p-4 bg-primary-100 dark:bg-primary-900/30 rounded-2xl"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                >
                    <User className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </motion.div>
            </motion.div>

            <Card>
                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Personal Information */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <User className="h-5 w-5 mr-3 text-primary-600" />
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input 
                                label="Full Name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                icon={<User />} 
                                fullWidth 
                                required
                            />
                            <Input 
                                label="Email" 
                                value={user?.email || ''} 
                                disabled
                                icon={<User />} 
                                fullWidth 
                                className="bg-gray-50 dark:bg-gray-700"
                            />
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Book className="h-5 w-5 mr-3 text-primary-600" />
                            Education
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input 
                                label="University/College" 
                                value={university} 
                                onChange={(e) => setUniversity(e.target.value)} 
                                icon={<Book />} 
                                fullWidth 
                                placeholder="e.g., Stanford University"
                            />
                            <Input 
                                label="Major/Field of Study" 
                                value={major} 
                                onChange={(e) => setMajor(e.target.value)} 
                                icon={<Book />} 
                                fullWidth 
                                placeholder="e.g., Computer Science"
                            />
                            <Input 
                                label="Expected Graduation Year" 
                                type="number"
                                value={graduationYear} 
                                onChange={(e) => setGraduationYear(e.target.value)} 
                                fullWidth 
                                placeholder="e.g., 2025"
                                min="2020"
                                max="2030"
                            />
                            <Input 
                                label="GPA (Optional)" 
                                type="number"
                                step="0.01"
                                value={gpa} 
                                onChange={(e) => setGpa(e.target.value)} 
                                fullWidth 
                                placeholder="e.g., 3.8"
                                min="0"
                                max="4"
                            />
                        </div>
                    </div>

                    {/* About & Skills */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <BrainCircuit className="h-5 w-5 mr-3 text-primary-600" />
                            About & Skills
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Bio
                                </label>
                                <textarea
                                    rows={4}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                    placeholder="Tell us about yourself, your interests, and career goals..."
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Skills
                                </label>
                                <SkillsInput skills={skills} setSkills={setSkills} />
                            </div>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                <p>Your profile helps companies find and connect with you.</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                {message && (
                                    <motion.p 
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`text-sm ${
                                            message.includes('success') 
                                                ? 'text-green-600 dark:text-green-400' 
                                                : 'text-red-600 dark:text-red-400'
                                        }`}
                                    >
                                        {message}
                                    </motion.p>
                                )}
                                <Button type="submit" loading={isSaving} glow>
                                    <FileText className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default StudentProfilePage;
