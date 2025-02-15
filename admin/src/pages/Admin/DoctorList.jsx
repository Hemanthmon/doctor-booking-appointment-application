import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="p-6 bg-gray-50 rounded-lg  max-h-[90vh] overflow-y-auto">
      <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(doctors) && doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              {/* Image */}
              <img
                className="w-full h-48 object-cover rounded-t-lg"
                src={item.image || 'https://via.placeholder.com/150'}
                alt={item.name}
              />

              {/* Content */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 truncate">{item.name}</h2>
                  <p className="text-gray-600 text-sm mb-2">{item.speciality}</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    onChange={() => changeAvailability(item._id)}
                    checked={item.available}
                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    readOnly
                  />
                  <span className={`text-sm ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No doctors available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
