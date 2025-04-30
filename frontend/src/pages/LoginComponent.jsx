import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../components/InputField.jsx';
import { useAuthStore } from '../store/authStore.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error,  setVerificationEmail, clearError, clearVerificationEmail } = useAuthStore();
  const [countdown, setCountdown] = useState(8);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
    clearVerificationEmail();
  }, [clearError, clearVerificationEmail]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(email, password);

    if(response?.user && !response.user.isVerified) {
      setVerificationEmail(email); // Store email for verification
      setShowVerificationMessage(true);
      setCountdown(8);
      setTimeout(() => {
        navigate("/verify-email", { state: { email } }); // ✅ Redirects to verification page
      }, 8000);
    }else {
      clearVerificationEmail();
    }
  };

  useEffect(() => {
    if (showVerificationMessage) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            navigate("/verify-email" , {state : {email}}); // Redirect when countdown reaches 0
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [showVerificationMessage, navigate]);
  

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden mb-40">
        {/* Left Panel */}
        <div className="hidden md:flex flex-1 flex-col justify-center items-center p-10 bg-purple-100">
          <h2 className="text-4xl font-bold text-purple-700 mb-4">Welcome Back</h2>
          <p className="text-lg text-purple-600 mb-6 text-center">
            Log in to manage your appointments, connect with trusted doctors, and take charge of your health journey.
          </p>
        </div>

        {/* Right Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Login</h2>
          <form onSubmit={handleLogin}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <div className="flex items-center justify-between mb-6">
              <Link to="/forgot-password" className="text-sm text-purple-500 hover:underline">
                Forgot password?
              </Link>
            </div>
            
      {showVerificationMessage ? (
        <div className="text-center text-red-500 font font-semibold mb-2 ">
          Your email is not verified. Redirecting to verification page in {countdown} seconds...
        </div>
     
      ) : (
            error && <p className="text-red-500 font-semibold mb-2">{error}</p>
          )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold rounded-lg shadow-lg
                           hover:from-purple-600 hover:to-purple-800 focus:outline-none focus:ring-2
                           focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-purple-50 transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : 'Login'}
            </motion.button>
          </form>
          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <Link to="/signUp" className="text-purple-500 hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginComponent;
