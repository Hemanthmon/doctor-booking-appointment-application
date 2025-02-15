import React from 'react'
import { AdminContext } from '../../context/AdminContext';
import { useEffect, useContext } from 'react';
import assets from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../context/AppContext';
const Dashboard = () => {

  const { aToken, getDashboard, cancelAppointment, dashData } = useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext)
  useEffect(() => {
    if (aToken) {
      getDashboard()
    } else {
      console.log("Admin token is missing. Please authenticate.");
    }

  }, [aToken])
  return dashData && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cusor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>

            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cusor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointment_icon} alt="" />
          <div>

            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cusor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>

            <p className='text-xl font-semibold text-gray-600'>{dashData.users}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>

        </div>

        <div className='pt-4 border border-t-0'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-200' key={index}>
                <img className='rounded-full w-10' src={item.docData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? <p className='text-red-400 texr-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <FontAwesomeIcon onClick={() => cancelAppointment(item._id)} icon={faTimesCircle} className="text-red-500 text-lg cursor-pointer" />}
              </div>
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default Dashboard
