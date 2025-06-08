import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, Building2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const Signup: React.FC = () => {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'company',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      await signup(formData);
      navigate('/login', { 
        state: { message: 'Account created successfully! Please log in.' } 
      });
    } catch (err: any) {
      console.error("Signup page caught an error:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already registered.');
      } else {
        setError('Failed to create an account. Please try again.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (role: 'student' | 'company') => {
    setFormData(prev => ({ ...prev, role }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
        <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-8">
                <Briefcase className="h-8 w-8 text-white bg-primary-600 p-1 rounded-lg" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">InternHub</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
            <p className="text-gray-600 dark:text-gray-400">Join thousands on InternHub.</p>
        </div>
        <Card>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => handleRoleChange('student')} className={`role-button ${formData.role === 'student' ? 'active' : ''}`}><User className="h-5 w-5 mr-2" /> Student</button>
                <button type="button" onClick={() => handleRoleChange('company')} className={`role-button ${formData.role === 'company' ? 'active' : ''}`}><Building2 className="h-5 w-5 mr-2" /> Company</button>
              </div>
            </div>
            <Input name="name" label={formData.role === 'student' ? 'Full name' : 'Company name'} value={formData.name} onChange={handleInputChange} icon={formData.role === 'student' ? <User /> : <Building2 />} fullWidth required />
            <Input name="email" type="email" label="Email address" value={formData.email} onChange={handleInputChange} icon={<Mail />} fullWidth required />
            <Input name="password" type="password" label="Password" value={formData.password} onChange={handleInputChange} icon={<Lock />} fullWidth required />
            <Input name="confirmPassword" type="password" label="Confirm password" value={formData.confirmPassword} onChange={handleInputChange} icon={<Lock />} fullWidth required />
            <Button type="submit" loading={isLoading} fullWidth size="lg" glow>Create Account</Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">Sign in</Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
