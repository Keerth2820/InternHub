import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { User, Book, BrainCircuit, FileText, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SkillsInput from '../../components/common/SkillsInput.tsx';
import { auth } from '../../firebase'; // Needed for token

const StudentProfilePage: React.FC = () => {
    const { user } = useAuth();

    // Form state
    const [name, setName] = useState(user?.name || '');
    const [university, setUniversity] = useState('');
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    
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
                    setName(data.name || user?.name || '');
                    setUniversity(data.university || '');
                    setBio(data.bio || '');
                    setSkills(data.skills ? data.skills.split(',').filter(Boolean) : []);
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
                name,
                university,
                bio,
                skills: skills.join(','), // Convert array back to comma-separated string for DB
            };

            const response = await fetch('http://127.0.0.1:5000/api/me/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(profileData)
            });

            if (!response.ok) throw new Error('Failed to update profile.');
            
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds

        } catch (error: any) {
            setMessage(error.message || 'An error occurred.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="text-center py-20">Loading profile...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Your Profile</h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Keep your information up to date.</p>
                </div>
                <Link to="/student/dashboard">
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </Link>
            </motion.div>

            <Card>
                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} icon={<User />} fullWidth />
                    <Input label="University" value={university} onChange={(e) => setUniversity(e.target.value)} icon={<Book />} fullWidth />
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                        <textarea
                            rows={4}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800"
                            placeholder="Tell us a little about yourself..."
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                           <BrainCircuit className="inline h-5 w-5 mr-2" /> Skills
                        </label>
                        <SkillsInput skills={skills} setSkills={setSkills} />
                    </div>

                    <div className="flex justify-end items-center pt-4">
                        {message && <p className="text-green-500 mr-4">{message}</p>}
                        <Button type="submit" loading={isSaving} glow>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default StudentProfilePage;
