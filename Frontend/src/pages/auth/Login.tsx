import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Briefcase, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    try {
      await login(email, password);
      navigate('/student/dashboard');
    } catch (err) {
      console.error("Login page error:", err);
      setError('Failed to log in. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <Briefcase className="h-8 w-8 text-white bg-primary-600 p-1 rounded-lg" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">InternHub</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-400">Sign in to continue your journey.</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {successMessage && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-200 px-4 py-3 rounded-md text-sm">
                <CheckCircle className="h-5 w-5 mr-3" /> {successMessage}
              </motion.div>
            )}
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300 px-4 py-3 rounded-md text-sm">
                {error}
              </motion.div>
            )}

            <Input name="email" type="email" placeholder="Enter your email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail />} fullWidth required />
            <Input name="password" type="password" placeholder="Enter your password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} icon={<Lock />} fullWidth required />
            
            <Button type="submit" loading={isLoading} fullWidth size="lg" glow>Sign In</Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">Sign up</Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
