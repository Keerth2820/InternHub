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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await signup(formData);
      navigate('/search');
    } catch (error) {
      setErrors({ general: 'Failed to create account. Please try again.' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleChange = (role: 'student' | 'company') => {
    setFormData(prev => ({ ...prev, role }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">InternHub</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create your account
          </h2>
          <p className="text-gray-600">
            Join thousands of students and companies on InternHub
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-error-50 border border-error-200 text-error-800 px-4 py-3 rounded-md text-sm"
              >
                {errors.general}
              </motion.div>
            )}

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleChange('student')}
                  className={`flex items-center justify-center p-3 border-2 rounded-lg transition-all ${
                    formData.role === 'student'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <User className="h-5 w-5 mr-2" />
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('company')}
                  className={`flex items-center justify-center p-3 border-2 rounded-lg transition-all ${
                    formData.role === 'company'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Building2 className="h-5 w-5 mr-2" />
                  Company
                </button>
              </div>
            </div>

            <Input
              name="name"
              type="text"
              placeholder={formData.role === 'student' ? 'Enter your full name' : 'Enter company name'}
              label={formData.role === 'student' ? 'Full name' : 'Company name'}
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
              icon={formData.role === 'student' ? <User /> : <Building2 />}
              fullWidth
            />

            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              label="Email address"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              icon={<Mail />}
              fullWidth
            />

            <Input
              name="password"
              type="password"
              placeholder="Create a password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              icon={<Lock />}
              fullWidth
            />

            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              label="Confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              icon={<Lock />}
              fullWidth
            />

            <div className="flex items-start">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                required
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </span>
            </div>

            <Button
              type="submit"
              loading={isLoading}
              fullWidth
              size="lg"
            >
              Create account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;