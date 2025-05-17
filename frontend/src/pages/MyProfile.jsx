import React, { useContext, useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { assets } from '../assets/assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';
import { FaUserCircle } from "react-icons/fa";



const MyProfile = () => {
  const {backenUrl} = useContext(AppContext)
  const { user, updateUserProfile } = useAuthStore();
  const [isEdit, setEdit] = useState(false);
  const [userData, setUserData] = useState(() => (user ? { ...user } : null));
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  
 
  // useEffect(() => {
  //   console.log("🔄 Updated userData:", user);
  //   setUserData(user)
  // }, [user])
  useEffect(() => {
    if (user && JSON.stringify(user) !== JSON.stringify(userData)) {
      setUserData({ ...user });
    }
  }, [user]);
 

  
  

  const handleSave = async () => {
    setLoading(true);
    const updatedData = {
      ...userData,
      gender: userData.gender || "Not Selected",
      image: image || userData.image, 
      bloodGroup: userData.bloodGroup || "Unknown",  // ✅ Ensure it's included
    };
    console.log("🚀 Sending updated user data:", updatedData);

    try {
      await updateUserProfile(updatedData);
      setUserData(updatedData); 
      setEdit(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return  userData && (
    <div className='w-full max-w-2xl mx-auto flex flex-col gap-6 bg-white shadow-xl p-4 sm:p-6 md:p-8 rounded-2xl relative overflow-hidden border border-purple-50'>

      {/* Gradient Background Elements */}
      {/* <div className='absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-r from-purple-800 to-pink-100 rounded-full blur-2xl opacity-50'></div>
      <div className='absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-br from-purple-800 to-purple-100 rounded-full blur-2xl opacity-50'></div> */}
   <div className="absolute -top-48 -left-48 w-[500px] h-[500px] bg-gradient-to-tr from-purple-800 via-indigo-600 to-pink-400 rounded-full blur-3xl opacity-30 animate-gradient-pulse"></div>
<div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-gradient-to-tl from-purple-900 via-blue-400 to-pink-300 opacity-25 blur-3xl animate-gradient-float"></div>
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-700/30 via-transparent to-pink-400/30 blur-[100px] opacity-15"></div>

<style>{`
  @keyframes gradient-pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(1.05); }
  }
  
  @keyframes gradient-float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-20px, 30px) rotate(5deg); }
    50% { transform: translate(10px, -20px) rotate(-5deg); }
    75% { transform: translate(-10px, 15px) rotate(3deg); }
  }
  
  .animate-gradient-pulse {
    animation: gradient-pulse 12s ease-in-out infinite;
  }
  
  .animate-gradient-float {
    animation: gradient-float 25s ease-in-out infinite;
  }
`}</style>

     

<div className='flex flex-col items-center gap-4 relative z-10'>
<div className='flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full'>

    {/* Photo Section - Left Side */}
   
  

{/* <div className='relative group'>
  {isEdit ? (
    <label htmlFor='image' className='inline-block relative cursor-pointer'>
      <img
        className='w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover transition-transform hover:scale-105'
        src={
          image
          ? URL.createObjectURL(image) 
          : userData?.image?.startsWith("data:image") 
          ? userData.image 
          : "/default_profile.png" 
        }
        alt='Profile'
        onError={(e) => {
          console.error("⚠️ Image failed to load, using fallback.");
          e.target.onerror = null;
          e.target.src = "/default_profile.png"; // **Final Backup**
        }}
      />

      <div className='absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md transition-all hover:scale-110'>
        <img className='w-6' src={assets.upload_icon} alt='Upload' />
      </div>
      <input
        type='file'
        id='image'
        hidden
        onChange={(e) => setImage(e.target.files[0])}
      />
    </label>
  ) : (
    <img
      className='w-40 h-40 rounded-full border-4 border-white shadow-lg'
      src={
        userData?.image && userData.image.includes("data:image")
          ? userData.image
          : userData?.image
          ? `data:image/jpeg;base64,${userData.image}`
          : assets.default_profile
      }
      alt='Profile'
      // onError={(e) => {
      //   if (e.target.src !== assets.default_profile) {
      //     console.error("Error loading image, falling back to default.");
      //     e.target.src = assets.default_profile;
      //   }
      // }}
    />
  )}
</div> */}
<div className="relative group">
  {isEdit ? (
    <label htmlFor="image" className="inline-block relative cursor-pointer">
      <img
        className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover transition-transform hover:scale-105"
        src={image ? URL.createObjectURL(image) : userData.image} 

        alt="Profile"
        onError={(e) => {
          console.error("⚠️ Image failed to load, using fallback.");
          e.target.onerror = null;
          e.target.src = assets.upload_area; // 🔥 Final Fallback
        }}
      />
      <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md transition-all hover:scale-110">
        <img className="w-6" src={assets.upload_icon} alt="Upload" />
      </div>
      <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
    </label>
  ) : (
    <img
      className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
      src={userData.image} 
      alt="Profile"
      onError={(e) => {
        console.error("⚠️ Image failed to load, using fallback.");
        e.target.onerror = null;
       
      }}
    />
  )}
</div>



    {/* Name Section - Right Side */}
    <div className='flex-1'>
      {isEdit ? (
        <input
          className='text-2xl sm:text-3xl  font-bold bg-white p-3 rounded-lg border-2 border-purple-100 focus:outline-none focus:border-purple-900 focus:ring-2 focus:ring-purple-100 w-full'
          type='text'
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
      ) : (
        <h1 className='text-4xl ml-6 font-bold text-gray-800'>{userData.name}</h1>
      )}
    </div>
  </div>
</div>

      <div className='space-y-6 relative z-10'>
        {/* Contact Information Section */}
        <div className='bg-purple-50 p-4 sm:p-6 rounded-xl'>
          <h2 className='text-lg font-semibold text-purple-600 mb-4 flex items-center gap-2'>
            <img src={assets.contact_icon} className='w-5' alt='' />
            Contact Information
          </h2>
          <div className='space-y-3'>
            <div className='flex flex-col gap-1'>
              <span className='text-gray-500'>Email</span>
              <p className='text-gray-700'>{userData.email}</p>
            </div>
            
            <div className='flex flex-col gap-1'>
              <span className='text-gray-500'>Phone</span>
              {isEdit ? (
                <input
                  className='bg-white p-2 rounded-lg border-2 border-purple-100 focus:outline-none focus:border-purple-500'
                  type='text'
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                />
              ) : (
                <p className='text-gray-700'>{userData.phone}</p>
              )}
            </div>

            <div className='flex flex-col gap-1'>
              <span className='text-gray-500'>Address</span>
              {isEdit ? (
                <div className='space-y-2'>
                  <input
                    className='bg-white p-2 rounded-lg border-2 border-purple-100 focus:outline-none focus:border-purple-500 w-full'
                    type='text'
                    value={userData.address.line1}
                    placeholder='Street address'
                    onChange={(e) => setUserData({ ...userData, address: { ...userData.address, line1: e.target.value } })}
                  />
                  <input
                    className='bg-white p-2 rounded-lg border-2 border-purple-100 focus:outline-none focus:border-purple-500 w-full'
                    type='text'
                    value={userData.address.line2}
                    placeholder='Apt, suite, etc. (optional)'
                    onChange={(e) => setUserData({ ...userData, address: { ...userData.address, line2: e.target.value } })}
                  />
                </div>
              ) : (
                <p className='text-gray-700'>
  {userData?.address?.line1 || 'No address provided'}<br />
  {userData?.address?.line2}
</p>

              )}
            </div>
          </div>
        </div>

        {/* Basic Information Section */}
        <div className='bg-purple-50 p-4 sm:p-6 rounded-xl'>
          <h2 className='text-lg font-semibold text-purple-600 mb-4 flex items-center gap-2'>
            <img src={assets.info_icon} className='w-5' alt='' />
            Basic Information
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1'>
              <span className='text-gray-500'>Gender</span>
              {isEdit ? (
                <select
                  className='bg-white p-2 rounded-lg border-2 border-purple-100 focus:outline-none focus:border-purple-500'
                  value={userData.gender}
                  onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                >
                  <option value="Not Selected">Select Gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>
              ) : (
                <p className='text-gray-700'>{userData.gender || "Not specified"}</p>
              )}
            </div>

            <div className='flex flex-col gap-1'>
              <span className='text-gray-500'>Date of Birth</span>
              {isEdit ? (
                <input
                  className='bg-white p-2 rounded-lg border-2 border-purple-100 focus:outline-none focus:border-purple-500'
                  type='date'
                  value={userData.dob}
                  onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                />
              ) : (
                <p className='text-gray-700'>{userData.dob || "Not specified"}</p>
              )}
            </div>

            <div className='flex flex-col gap-1'>
              <span className='text-gray-500'>Blood Group</span>
              {isEdit ? (
                <select
                  className='bg-white p-2 rounded-lg border-2 border-purple-100 focus:outline-none focus:border-purple-500'
                  value={userData.bloodGroup || "Unknown"}
                  onChange={(e) => setUserData({ ...userData, bloodGroup: e.target.value })}
                >
                  <option value="Unknown">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              ) : (
                <p className='text-gray-700'>{userData.bloodGroup || "Unknown"}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 text-center relative z-10'>
        {isEdit ? (
          <button
            onClick={handleSave}
            className='bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:scale-[1.02] transition-transform shadow-lg hover:shadow-purple-200 disabled:opacity-50 font-medium flex items-center gap-2 mx-auto'
            disabled={loading}
          >
            {loading ? (
              <>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        ) : (
          <button
            onClick={() => setEdit(true)}
            className='bg-white text-purple-600 px-8 py-3 rounded-xl border-2 border-purple-100 hover:border-purple-500 hover:bg-purple-50 transition-all shadow-md hover:shadow-purple-100 font-medium'
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
