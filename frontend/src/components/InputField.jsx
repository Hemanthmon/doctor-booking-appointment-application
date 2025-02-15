import React from "react";

const InputField = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-purple-500" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-white rounded-lg border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 text-gray-700 placeholder-purple-300 transition duration-200 shadow-sm"
      />
    </div>
  );
};

export default InputField;
