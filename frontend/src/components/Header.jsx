import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-purple-400 rounded-lg px-6 md:px-10 lg:px-20'>
      {/* ------------------------left side----------------------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-3x1 md:text-4x1 lg:text-5x1 text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
          Book Appointment <br /> with trusted Doctors
        </p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img className='w-28' src={assets.group_profiles} alt="profile photos" />
          <p>
            Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block'/>schedule your appointment hassle-free
          </p>
        </div>
        <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
          Book Appointment <img className='w-3' src={assets.arrow_icon} alt=" book appointment" /></a>
      </div>
      {/* ------------------------right side---------------------- */}
      <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="header image" />
      </div>
    </div>
  )
}

export default Header
