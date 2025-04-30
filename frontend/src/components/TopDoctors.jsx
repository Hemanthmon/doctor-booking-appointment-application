import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, y: -5, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <motion.h1
        className="text-3xl font-medium"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Top Doctors to Book
      </motion.h1>
      <motion.p
        className="sm:w-1/3 text-center text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Simply browse through our extensive list of trusted doctors.
      </motion.p>

      {/* Cards Container */}
      <motion.div
        className="w-full flex flex-wrap justify-center gap-6 pt-5 px-3 sm:px-0"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } }
        }}
      >
        {doctors.slice(0, 10).map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className="w-64 h-96 border border-purple-300 rounded-xl overflow-hidden cursor-pointer shadow-md transition-all duration-300 flex flex-col"
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
          >
            {/* Photo Section (75%) */}
            <div className="w-full h-[75%] bg-purple-50">
              <img
                className="w-full h-full object-cover object-top"
                src={item.image}
                alt="Doctor"
              />
            </div>
            {/* Content Section (25%) */}
            <div className="h-[25%] p-3 flex flex-col justify-center items-center text-center">
              <p className="text-gray-900 text-base font-semibold">{item.name}</p> {/* Increased Size */}
              <p className="text-gray-600 text-xs">{item.speciality}</p>
              <p className="text-gray-500 text-xs">{item.address.line2}</p> 
              {/* Availability at Bottom */}
              <div
                className={`flex items-center justify-center gap-2 text-xs mt-2 ${
                  item.available ? "text-green-500" : "text-gray-500"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* More Button with animation */}
      <motion.button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        whileTap={{ scale: 0.9 }}
        className="bg-purple-300 text-gray-600 px-10 py-2 rounded-full mt-10 shadow-md hover:bg-purple-400 transition-all duration-300"
      >
        More
      </motion.button>
    </div>
  );
};

export default TopDoctors;
