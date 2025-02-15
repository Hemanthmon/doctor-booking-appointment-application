import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { doctors } from '../assets/assets'

const Doctors = () => {
  const { speciality } = useParams() //gets the `speciality` parameter from the URL
  const [filterDoc, setFilterDoc] = useState([]) //state for filtered doctors
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate() //funnction to navigate between the routes

  const { doctors } = useContext(AppContext) // gets the doctor list from the Appcontext

  //filetering based on the speciality
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality)) // filters doctors by specialty
    } else {
      setFilterDoc(doctors); // shows the all doctors if no speciality is specified
    }
  }

  // ! uses UseEffect to re-run the applyfilter whenever the doctors list or speciality changes
  useEffect(() => {
    applyFilter()  //? Runs applyfilter when 'doctors' or 'speciality' change
  }, [doctors, speciality])
  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors  specialist</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        {/* In mobile view */}
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-purple-600 text-white' : ''} `} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        {/* if its is true then  it make iit false vice versa */}
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
          {/*    
          - onClick defines the inline function when the <P> elemnet is clicked
          - speciality === 'General physician': Checks if the current URL parameter (speciality) is already set to "General physician".
          --Ternary Conditional Operator (? ... : ...):
                   If speciality is already 'General physician': The function calls navigate('/doctors'), navigating to a general doctors listing without any specialty filter.
                   If speciality is not 'General physician': It calls navigate('/doctors/General physician'), setting "General physician" as the specialty filter in the URL.

                   ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}: Conditionally adds background and text color 
                   to indicate an active state when "General physician" is the current specialty filter:
          */}
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""} `}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
          <p onClick={() => speciality === 'Dentist' ? navigate('/doctors') : navigate('/doctors/Dentist')} className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dentist" ? "bg-indigo-100 text-black" : ""}`}>Dentist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-purple-300 rounded-x1 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-purple-50' src={item.image} alt="Doctor Image" />
                <div className='p-4'>
                  <div className={`flex items-center gap-2 text-sm text-center ${item.available ? ' text-green-500' : 'text-gray-500'}`}>

                    <p className={`w-2 h-2 ${item.available ? ' bg-green-500' : 'bg-gray-500'} rounded-full`}></p> <p>{item.available ? 'Available' : 'Not Available'}</p>
                  </div >
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                  <p className='text-gray-600 text-sm'>{item.address.line2}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors
