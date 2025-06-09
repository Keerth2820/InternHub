import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { User, Book, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentProfilePage: React.FC = () => {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [university, setUniversity] = useState('University of Technology'); // Mock
    const [skills, setSkills] = useState('React, TypeScript, Node.js'); // Mock

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        console.log("Updating profile:", { name, university, skills });

        // TODO: Create a real API call to PUT /api/me/profile
        setTimeout(() => {
            setIsLoading(false);
            setMessage('Profile updated successfully!');
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Your Profile</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Keep your information up to date.</p>
            </motion.div>

            <Card className="mt-8">
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <Input 
                        label="Full Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        icon={<User />}
                        fullWidth
                    />
                    <Input 
                        label="University" 
                        value={university} 
                        onChange={(e) => setUniversity(e.target.value)} 
                        icon={<Book />}
                        fullWidth
                    />
                    <Input 
                        label="Skills (comma-separated)" 
                        value={skills} 
                        onChange={(e) => setSkills(e.target.value)} 
                        icon={<BrainCircuit />}
                        fullWidth
                    />
                    
                    <div className="flex justify-end pt-4">
                        <Button type="submit" loading={isLoading} glow>
                            Save Changes
                        </Button>
                    </div>

                    {message && <p className="text-center text-green-500 mt-4">{message}</p>}
                </form>
            </Card>
        </div>
    );
};

export default StudentProfilePage;