import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from "../store/authStore.js"
import toast from 'react-hot-toast'


const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  //refs to  manage focus for each input field programmatically
  const inputRefs = useRef([])
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail} = useAuthStore()

  const handleChange = (index, value) => {
   if (!/^\d*$/.test(value)) return;
    const newCode = [...code]; //create the copy of current code state

    //Handle pasted code lyk pro
    if (value.length > 1) {
      // extract thr first 6 characters and split in to an array
      const pastedcode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedcode[i] || "";
      }
      setCode(newCode)

      //determone where to move focus  either the last filled input or the first empty one.
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus(); // Set focus on the calculated input.
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Automatically move to the next input if a value is entered.
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };



  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus(); // Move focus to the previous field.
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission behaviour
    const verificationCode = code.join(""); //Combine the code array into a single string
    console.log(`Verification code submitted: ${verificationCode}`)
    try {
       const response = await verifyEmail(verificationCode)
       console.log("Verification Response:", response); // Debugging log

       if(response.success){
      navigate("/")
      toast.success("Email verified successfully")
       } else {
        console.log("Verification failed: Response did not indicate success");
         toast.error(response.message)
       }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Verification failed");
    }
  }

  useEffect(() => {
    if (code.every((digit) => digit != "")) {
      handleSubmit(new Event("submit")); // triggering the submission programitically
    }
  }, [code])
  return (
    <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
      >
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
          Verify Your Email
        </h2>
        <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address.</p>

        {/* Form section */}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex justify-between'>
            {code.map((digit, index) => (
              <input
                key={index} //unique key for each input
                ref={(el) => (inputRefs.current[index] = el)}    // Assign ref to each input for programmatic focus.
                type='text'
                maxLength='6' // Limit input length to one digit.
                value={digit} // Bind input value to the corresponding state.
                onChange={(e) => handleChange(index, e.target.value)} // Handle value changes.
                onKeyDown={(e) => handleKeyDown(index, e)} // Handle keyboard events.
                className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'

              />
            ))}
          </div>
          {/* Display error message if any */}
					{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
        
        {/* submit button */}
        <motion.button
						whileHover={{ scale: 1.05 }} // Enlarge slightly on hover.
						whileTap={{ scale: 0.95 }} // Shrink slightly on tap.
						type='submit'
						disabled={isLoading || code.some((digit) => !digit)} // Disable if loading or fields are empty.
						className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50'
					>{isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default EmailVerification;
