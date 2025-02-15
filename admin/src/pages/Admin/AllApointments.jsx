import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, currency, cancelAppointment } = useContext(AdminContext);
   const { calculateAge, slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[1fr_3fr_1fr_2fr_2fr_1fr_1fr] items-center py-3 px-6 border-b bg-gray-100">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Table Content Placeholder */}
        {appointments.map((item, index) => (
         <div 
         className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] max-sm:flex max-sm:flex-wrap max-sm:gap-2 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50" 
         key={index}
       >
       
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p> 

            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-300' src={item.docData.image} alt="" /> <p>{item.docData.name}</p>
            </div>

            <p>{currency}{item.docData.fees}</p>

            {item.cancelled ? <p className='text-red-400 texr-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <FontAwesomeIcon onClick={() => cancelAppointment(item._id)} icon={faTimesCircle} className="text-red-500 text-lg cursor-pointer" /> }
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
