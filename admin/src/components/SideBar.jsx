import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import  assets  from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContest'

const SideBar = () => {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)
  return (
    <div className='min-h-screen bg-white border-r'>
      {
        aToken && <ul className='text-[#515151] mt-5'>
          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 and md:px-9 md:min-w-72 cursor pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-purple' : ''}`} to={'/admin-dashboard'}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>

          <NavLink 
          className={({isActive}) => `flex items-center gap-3 py-3.5 and md:px-9 md:min-w-72 cursor pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
          to={'/all-appointments'}>
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>

          <NavLink to={'/add-doctor'}
          className={({isActive}) => `flex items-center gap-3 py-3.5 and md:px-9 md:min-w-72 cursor pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
          >
            <img src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add Doctors</p>
          </NavLink>

          <NavLink to={'/doctor-list'}
          className={({isActive}) => `flex items-center gap-3 py-3.5 and md:px-9 md:min-w-72 cursor pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
          >
            <img src={assets.people_icon} alt="" />
            <p className='hidden md:block'>Doctors List</p>
          </NavLink>
        </ul>
      }
        {
        dToken && <ul className='text-[#515151] mt-5'>
          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 and md:px-9 md:min-w-72 cursor pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-purple' : ''}`} 
          to={'/doctor-dashboard'}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>

          <NavLink 
          className={({isActive}) => `flex items-center gap-3 py-3.5 and md:px-9 md:min-w-72 cursor pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
          to={'/doctor-appointments'}>
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>

          <NavLink to={'/doctor-profile'}
          className={({isActive}) => `flex items-center gap-3 py-3.5 and md:px-9 md:min-w-72 cursor pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
          >
            <img src={assets.people_icon} alt="" />
            <p className='hidden md:block'>Profile</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default SideBar
