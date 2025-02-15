import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  const circleVariants = {
    animate: {
      scale: [1, 1.5, 1], // Pulsing effect
      opacity: [1, 0.5, 1], // Fading effect
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const innerCircleVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [1, 0.5, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3, // Offset animation
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-300 flex flex-col items-center justify-center">
      {/* Animated Loader */}
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Outer Circle */}
        <motion.div
          className="absolute w-24 h-24 rounded-full bg-purple-300"
          variants={circleVariants}
          animate="animate"
        ></motion.div>
        {/* Inner Circle */}
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-purple-500"
          variants={innerCircleVariants}
          animate="animate"
        ></motion.div>
        {/* Center Dot */}
        <div className="relative w-8 h-8 rounded-full bg-purple-700"></div>
      </div>
      {/* Loading Text */}
      <motion.p
        className="mt-8 text-lg font-semibold text-purple-700"
        variants={circleVariants}
        animate="animate"
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;