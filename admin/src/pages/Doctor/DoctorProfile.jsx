import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContest';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        docId: profileData._id,
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
        about: profileData.about,
      };

      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, { headers: { dToken } });
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred';
      toast.error(message);
      console.log(message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className='flex flex-col gap-6 p-5'>
        {/* Profile Image */}
        <div className='flex justify-center'>
          <img
            className='w-40 h-40 bg-gray-200 rounded-full border-4 border-white shadow-md object-cover'
            src={profileData.image || '/default-profile.png'}
            alt='Doctor Profile'
          />
        </div>

        <div className='flex-1 border border-gray-200 rounded-lg p-6 bg-white shadow-lg'>
          {/* Name & Specialization */}
          <p className='text-2xl font-semibold text-gray-800'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-2 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <span className='py-1 px-3 border text-xs rounded-full bg-gray-100'>{profileData.experience} years</span>
          </div>

          {/* About Section */}
          <div className='mt-4'>
            <p className='text-sm font-medium text-gray-700'>About:</p>
            <p className='text-sm text-gray-600 mt-1'>{profileData.about}</p>
          </div>

          {/* Fees */}
          <p className='text-gray-700 font-medium mt-4'>
            Appointment Fee:
            <span className='text-gray-900 ml-2'>
              {currency}{' '}
              {isEdit ? (
                <input
                  type='number'
                  className='border rounded p-1 text-sm w-24 ml-1'
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, fees: parseFloat(e.target.value) || '' }))
                  }
                  value={profileData.fees}
                />
              ) : (
                profileData.fees
              )}
            </span>
          </p>

          {/* Address */}
          <div className='mt-4'>
            <p className='text-gray-700 font-medium'>Address:</p>
            <div className='text-sm text-gray-600'>
              {isEdit ? (
                <>
                  <input
                    type='text'
                    className='border rounded p-1 text-sm w-full mt-1'
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, address: { ...prev.address, line: e.target.value } }))
                    }
                    value={profileData.address.line}
                  />
                  <input
                    type='text'
                    className='border rounded p-1 text-sm w-full mt-1'
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))
                    }
                    value={profileData.address.line2}
                  />
                </>
              ) : (
                <>
                  <p>{profileData.address.line}</p>
                  <p>{profileData.address.line2}</p>
                </>
              )}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className='flex items-center gap-2 mt-4'>
            <input
              type='checkbox'
              checked={profileData.available}
              onChange={() => isEdit && setProfileData((prev) => ({ ...prev, available: !prev.available }))}
              className='w-4 h-4 accent-purple-500 cursor-pointer'
            />
            <label className='text-sm text-gray-700'>Available for Appointments</label>
          </div>

          {/* Edit / Save Button */}
          <div className='mt-6'>
            {isEdit ? (
              <button
                onClick={updateProfile}
                className='px-5 py-2 border border-purple-500 text-sm rounded-full text-purple-500 hover:bg-purple-500 hover:text-white transition-all'
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className='px-5 py-2 border border-purple-500 text-sm rounded-full text-purple-500 hover:bg-purple-500 hover:text-white transition-all'
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
