import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { doctors as doctorImages } from '../assets/assets';

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [specialities, setSpecialities] = useState([]);

  useEffect(() => {
    const unqSpecialities = [...new Set(doctors.map(doc => doc.speciality))];
    setSpecialities(unqSpecialities);
  }, [doctors]);

  useEffect(() => {
    setFilteredDoctors(
      speciality ? doctors.filter(doc => doc.speciality === speciality) : doctors
    );
  }, [doctors, speciality]);

 

  return (
    <div>
      <p className='text-gray-600'>Browse through the specialist doctors</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        {/* Mobile View Filter Button */}
        <button 
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-purple-600 text-white' : ''}`} 
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>

        <div 
  className={`flex flex-wrap gap-4 sm:flex-col text-sm text-gray-600 transition-all ${
    showFilter ? 'flex' : 'hidden sm:flex'
  } w-full sm:w-auto py-2 justify-center`}
>
  {specialities.map(spec => (
    <button 
      key={spec} 
      onClick={() => speciality !== spec && navigate(`/doctors/${spec}`)}
      className={`min-w-[200px] px-6 py-3 border border-gray-300 rounded-lg text-center transition-all cursor-pointer hover:bg-purple-100 ${
        speciality === spec ? 'bg-purple-500 text-white font-medium' : 'bg-gray-100'
      }`}
    >
      {spec}
    </button>
  ))}
</div>


        {/* Doctors List */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filteredDoctors.map((doctor, index) => (
            <div 
              key={index} 
              onClick={() => navigate(`/appointment/${doctor._id}`)} 
              className='border border-purple-300 rounded-lg overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-md'
            >
              <img 
                className='bg-purple-50 w-full h-56 object-cover' 
                src={doctor.image} 
                alt='Doctor' 
                onError={(e) => e.target.src = doctorImages.defaultDoctor}
              />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm ${doctor.available ? 'text-green-500' : 'text-gray-500'}`}>
                  <span className={`w-2 h-2 ${doctor.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></span>
                  <p>{doctor.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{doctor.name}</p>
                <p className='text-gray-600 text-sm'>{doctor.speciality}</p>
                <p className='text-gray-600 text-sm'>{doctor.address.line2}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
