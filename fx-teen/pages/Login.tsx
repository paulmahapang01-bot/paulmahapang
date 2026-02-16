import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import Button from '../components/Button';
import { Link, useNavigate } from '../constants';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
      if (email === 'demo@fxteen.com' && password === 'password') {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Hint: use demo@fxteen.com / password');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <AuthLayout title="Log In">
      <form className="space-y-6" onSubmit={handleLogin}>
        {error && (
          <MotionDiv 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg flex items-center gap-2 text-sm"
          >
            <AlertTriangle size={16} />
            {error}
          </MotionDiv>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-silver">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="demo@fxteen.com"
            className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green focus:shadow-[0_0_10px_rgba(0,255,163,0.2)] transition-all placeholder:text-gray-600"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-silver">Password</label>
            <a href="#" className="text-xs text-neon-green hover:underline">Forgot password?</a>
          </div>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green focus:shadow-[0_0_10px_rgba(0,255,163,0.2)] transition-all placeholder:text-gray-600"
          />
        </div>
        
        <div className="bg-navy-800/50 p-3 rounded border border-white/5 text-xs text-silver font-mono">
           <div className="flex justify-between"><span>Demo Email:</span> <span className="text-white">demo@fxteen.com</span></div>
           <div className="flex justify-between"><span>Demo Pass:</span> <span className="text-white">password</span></div>
        </div>

        <Button fullWidth className="mt-4 py-4 text-base" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-navy-900 border-t-transparent rounded-full animate-spin"></span>
              Authenticating...
            </div>
          ) : (
            "Sign In"
          )}
        </Button>

        <div className="text-center text-sm text-silver mt-8">
          Don't have an account? <Link to="/register" className="text-neon-green font-bold hover:underline">Apply Now</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;