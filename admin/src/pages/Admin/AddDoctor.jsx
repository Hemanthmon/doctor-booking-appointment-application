import React, { useContext, useState } from 'react';
import  assets  from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const [name, setName] = useState('');
  const [docImg, setDocImg] = useState(false)
  const [speciality, setSpeciality] = useState('General physician');
  const [isOtherSpeciality, setIsOtherSpeciality] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
    const[fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [degree, setDegree] = useState('')
    const[ address1, setAddress1] = useState('')
    const[ address2, setAddress2] = useState('')
  

  const specialties = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
    'Cardiologist',
    'Orthopedic Surgeon',
    'Psychiatrist',
    'Oncologist',
    'Ophthalmologist',
    'Urologist',
    'Radiologist',
    'Endocrinologist',
    'Rheumatologist',
    'Plastic Surgeon',
    'Other',
  ];

  const {backendUrl, aToken} = useContext(AdminContext)

  const handleSpecialityChange = (event) => {
    const selectedValue = event.target.value;
    setSpeciality(selectedValue);
    setIsOtherSpeciality(selectedValue === 'Other');
  };
const onSubmitHandler = async (event) => {
  event.preventDefault()    // when we submit the form it wont reload the webpage

  try{
    if(!docImg){
      return toast.error('Image is not selected')
    }

    const formData = new FormData()

    formData.append('image', docImg)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('experience', experience)
    formData.append('fees', Number(fees))
    formData.append('about', about)
    formData.append('speciality', speciality)
    formData.append('degree', degree)
    formData.append('address', JSON.stringify({line:address1, line2:address2}))

    // console log form data
    formData.forEach((value,key) => {
      console.log(`${key} : ${value}`)
    })

    const {data} = await axios.post(backendUrl + '/api/admin/add-doctors' , formData, {headers:{aToken}})

    if(data.success){
      toast.success(data.message)
      setDocImg(false);
      setName('');
      setPassword('');
      setEmail('');
      setAddress1('');
      setAddress2('');
      setAbout('');
      setDegree('');
      setFees('');
    } else {
      toast.error(data.message)
    }
  } catch(error) {
    toast.error(error.message)
    console.error('Error submitting form:', error);
  }
  
}
  return (
    <form className="m-5 w-full"
    onSubmit={onSubmitHandler}
    >
      <p className="mb-5 text-2xl font-semibold text-gray-800">Add Doctor</p>
      <div className="bg-white px-8 py-6 border rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-16 h-16 bg-gray-100 rounded-full object-cover border"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input
          onChange={(e)=> setDocImg(e.target.files[0])}
          type="file" id="doc-img" hidden />
          <p className="text-gray-600">
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-gray-700">Doctor Name</label>
            <input
              onChange={(e)=>setName(e.target.value)}
              value={name}
              className="w-full border rounded px-3 py-2"
              type="text"
              placeholder="Enter doctor's name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              className="w-full border rounded px-3 py-2"
              type="email"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              className="w-full border rounded px-3 py-2"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Experience</label>
            <select 
            onChange={(e)=>setExperience(e.target.value)}
            value={experience}
            className="w-full border rounded px-3 py-2" required>
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              {/* Add other options here */}
              <option value="Above 25 Years">Above 25 Years</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Fees</label>
            <input
            onChange={(e)=>setFees(e.target.value)}
            value={fees}
              className="w-full border rounded px-3 py-2"
              type="number"
              placeholder="Enter fees"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Speciality</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={speciality}
              onChange={handleSpecialityChange}
              required
            >
              <option value="" disabled>
                Select Speciality
              </option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
            {isOtherSpeciality && (
              <div className="mt-2">
                <label className="block mb-1 text-gray-700">Specify Speciality</label>
                <input
                
                  className="w-full border rounded px-3 py-2"
                  type="text"
                  placeholder="Enter speciality"
                  required
                />
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Education</label>
            <input
            onChange={(e) => setDegree(e.target.value)}
            value={degree}
              className="w-full border rounded px-3 py-2"
              type="text"
              placeholder="Enter education details"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Address</label>
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              type="text"
              onChange={(e) => setAddress1(e.target.value)}
            value={address1}
              placeholder="Address Line 1"
              required
            />
            <input
              className="w-full border rounded px-3 py-2"
              type="text"
              placeholder="Address Line 2"
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block mb-1 text-gray-700">About Doctor</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Write about the doctor"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            rows={5}
            required
          />
        </div>

        <button type='submit' className="w-full bg-purple-700 text-white font-semibold rounded-lg px-4 py-3 mt-6">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
