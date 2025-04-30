import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Loader } from 'lucide-react'; 
import Input from '../components/InputField';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { User, Mail, Lock } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState("");
    
    const { signup, error, isLoading, setVerificationEmail, clearError } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        clearError();
    }, [clearError]);

    const handleSignUp = async (e) => {
        e.preventDefault();

          // Clear previous errors
          setFormError("");
    
        if (!name || !email || !password) {
            setFormError("All fields are required");
            return;
        }
    
        try {
            await signup(email, password, name);
            setVerificationEmail(email); // ✅ Store email for verification
            navigate("/verify-email",  { state: { email } });
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 flex flex-col md:flex-row items-center gap-8">
                {/* Left Section */}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl font-bold mb-4 text-purple-800">Book Appointment</h2>
                    <p className="text-gray-600 mb-6">
                        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <img
                            src="https://randomuser.me/api/portraits/men/75.jpg"
                            alt="User 1"
                            className="w-10 h-10 rounded-full border-2 border-purple-300"
                        />
                        <img
                            src="https://randomuser.me/api/portraits/women/65.jpg"
                            alt="User 2"
                            className="w-10 h-10 rounded-full border-2 border-purple-300"
                        />
                        <img
                            src="https://randomuser.me/api/portraits/men/85.jpg"
                            alt="User 3"
                            className="w-10 h-10 rounded-full border-2 border-purple-300"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 max-w-md bg-purple-100 rounded-lg p-8 shadow-lg"
                >
                    <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">
                        Create Account
                    </h2>
                    <form onSubmit={handleSignUp}>
                        <Input
                            icon={User}
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Form Validation Error */}
                        {formError && <p className="text-red-500 font-semibold mt-2">{formError}</p>}
                        
                       {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                        <PasswordStrengthMeter password={password} />
                        <motion.button
                            className="mt-6 w-full py-3 px-4 bg-purple-500 text-white font-bold rounded-lg shadow-lg hover:bg-purple-600 
                            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className='animate-spin mx-auto' size={24}/> : "Sign Up"}
                        </motion.button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link to={"/login"} className="text-purple-600 font-semibold hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SignUp;
