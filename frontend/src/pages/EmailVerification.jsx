import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore.js';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom'

const EmailVerification = () => {
  const [code, setCode] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { error, isLoading, verifyEmail, resendVerificationEmail, clearError, setVerificationEmail } = useAuthStore();
  const [resendLoading, setResendLoading] = useState(false);  
  const [timeLeft, setTimeLeft] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  
  const [recentTimeLeft, setRecentTimeLeft] = useState(0); // 10 min for resent verification
  const [cooldown, setCooldown] = useState(0); // 2 min cooldown

  const storedEmail = useAuthStore((state) => state.email); 

  // Retrieve email from navigation state
  const email = location.state?.email || storedEmail || "";

  useEffect(() => {
    clearError(); // ✅ Clears error when EmailVerification page loads
  }, [clearError])

  useEffect(() => {
    if (email) {
      setVerificationEmail(email); // ✅ Store the email in Zustand
    } else {
      toast.error("No email found for verification.");
      navigate("/signup");
    }
  }, [email, navigate, setVerificationEmail]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Countdown timer for resent verification code
    if (recentTimeLeft > 0) {
      const recentInterval = setInterval(() => {
        setRecentTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(recentInterval);
    }
  }, [recentTimeLeft]);

  useEffect(() => {
    // Cooldown timer for resending emails
    if (cooldown > 0) {
      const cooldownInterval = setInterval(() => {
        setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(cooldownInterval);
    }
  }, [cooldown]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  
  // const handleChange = (index, value) => {
  //   if (!/^[0-9]?$/.test(value)) return;
  //   const newCode = [...code];
  //   newCode[index] = value;
  //   setCode(newCode);
  //   if (value && index < 5) {
  //     inputRefs.current[index + 1]?.focus();
  //   }
  // };

  const handleChange = (index, value) => {
    if (value.length > 1) {
      const newCode = [...code];
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
  
      // Focus on next empty input after paste
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex]?.focus();
    } else {
      if (!/^[0-9]?$/.test(value)) return;
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
  
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };
  
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };



  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const verificationCode = code.join('');

    if (verificationCode.length < 6) {
      toast.error('Please enter the full verification code.');
      return;
    }

    try {
      const response = await verifyEmail(verificationCode);
      console.log("Verification Response:", response); // Debugging
      if (response?.success) {
        toast.success('Email verified successfully. Redirecting to login...');
        setTimeout(() => {
          navigate('/login'); // ✅ Ensures navigation works
        }, 2000);
      } else {
        toast.error(response?.message || 'Verification failed.');
      }
    } catch (error) {
      console.error("Verification Error:", error); // Debugging
      toast.error(error.response?.data?.message || 'Verification failed.');
    }
};


  const handleResendClick = async() => {
    if (isDisabled) return;
    if (!email) {
      toast.error("No email found for verification.");
      return;
    }
    
    setResendLoading(true);
    try {
      await resendVerificationEmail(email);
      toast.success("Verification email resent successfully.");
  
      setTimeLeft(180); // 3 minutes
      setCooldown(120); // 2 minutes cooldown before allowing resend
      setIsDisabled(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend verification email.");
    } finally {
      setResendLoading(false);
    }
  };
  useEffect(() => {
    if (timeLeft === 0) {
      setIsDisabled(false);
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);
  useEffect(() => {
    if (code.every((digit) => digit !== '')) {
      handleSubmit();
    }
  }, [code]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='max-w-md w-full rounded-2xl shadow-xl p-8 border border-purple-500 bg-white'>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md'
        >
          <h2 className='text-3xl font-bold mb-6 text-center text-purple-700'>
            Verify Your Email
          </h2>
          <p className='text-center text-purple-500 mb-6'>
            Enter the 6-digit code sent to your email address.
          </p>
          {/* <div className='text-center font-semibold text-purple-700 flex justify-center items-center space-x-2'>
            <span>{email}</span>
            <button 
              onClick={() => navigate('/signup')}
              className='text-blue-600 underline hover:text-blue-800 text-sm'>
              Edit
            </button>
          </div> */}

          {/* <p className="text-center text-red-600 font-semibold">
            Code expires in: {formatTime(recentTimeLeft > 0 ? recentTimeLeft : timeLeft)}
          </p> */}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='flex justify-between'>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type='text'
                  maxLength='1'
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className='w-12 h-12 text-center text-2xl font-bold border-2 border-purple-700 rounded-lg focus:border-purple-500 focus:outline-none bg-white'
                />
              ))}
            </div>
            {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type='submit'
              disabled={isLoading || code.some((digit) => !digit)}
              className='w-full bg-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 disabled:opacity-50'
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </motion.button>
         {/* {recentTimeLeft > 0 ? (
           <p className="text-center text-gray-600 mt-4">
           A verification email was recently sent. You can resend after {formatTime(cooldown)}.
         </p>
         ) : ( <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleResendVerification}
          disabled={resendLoading}
          className="w-full bg-gray-300 text-purple-700 font-bold py-2 px-4 rounded-lg mt-4"
        >
           <div>
      <p>{isDisabled ? `Please wait ${timeLeft} seconds before requesting a new code.` : ""}</p>
      <button onClick={handleResendClick} disabled={isDisabled}>
        {isDisabled ? "Wait..." : "Resend Verification"}
      </button>
    </div>
  {resendLoading ? "Resending..." : "Resend Verification Email"}

        </motion.button>
        ) */}

{timeLeft > 0 ? (
  <p className="text-center text-gray-600 mt-4">
    Please wait {formatTime(timeLeft)} before requesting a new code.
  </p>
) : (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    type="button"
    onClick={handleResendClick}
    disabled={resendLoading || cooldown > 0}
    className="w-full bg-gray-300 text-purple-700 font-bold py-2 px-4 rounded-lg mt-4"
  >
    {resendLoading ? "Resending..." : "Resend Verification Email"}
  </motion.button>
)}

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailVerification;
