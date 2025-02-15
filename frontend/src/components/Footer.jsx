import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 text-sm'>
        {/* -------------left section--------- */}
        <div>
           <img className='mb-5 w-40' src={assets.logo} alt="" />
           <p className='w-full md:w=2/3 text-gray-600 leading-6'>Easily book and manage your doctor appointments with our user-friendly app. Choose your preferred doctor, select a time that fits your schedule, and receive instant confirmation. Stay organized with reminders and updates, and reschedule or cancel appointments effortlessly. Your healthcare is now just a few clicks away!</p>
        </div>

           {/* -------------center section--------- */}
        <div>
               <p className='text-xl font-medium mb-5'>Company</p>
               <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
               </ul>
        </div>

         {/* -------------right section--------- */}
         <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li><a href="tel:+919980350455">9980350455</a></li>
                <li><a href="mailto:hemmon963@gmail.com">hemmon963@gmail.com</a></li>
            </ul>
         </div>
      </div>
      {/* --------------------------copyright----------------------- */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>copyright 2024@ prescripto All rights are reserved</p>
      </div>
    </div>
  )
}

export default Footer
