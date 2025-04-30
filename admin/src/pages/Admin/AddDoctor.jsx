import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import assets from "../../assets/assets";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [docImg, setDocImg] = useState(null);
  const [speciality, setSpeciality] = useState("General physician");
  const [isOtherSpeciality, setIsOtherSpeciality] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const specialties = [
    "General physician", "Gynecologist", "Dermatologist", "Pediatricians",
    "Neurologist", "Gastroenterologist", "Cardiologist", "Orthopedic Surgeon",
    "Psychiatrist", "Oncologist", "Ophthalmologist", "Urologist",
    "Radiologist", "Endocrinologist", "Rheumatologist", "Plastic Surgeon", "Other",
  ];

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleSpecialityChange = (event) => {
    const selectedValue = event.target.value;
    setSpeciality(selectedValue);
    setIsOtherSpeciality(selectedValue === "Other");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!docImg) return toast.error("Please upload an image");

    try {
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("address", JSON.stringify({ line: address1, line2: address2 }));

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctors`, formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add doctor. Please try again.");
      console.error("Error:", error);
    }
  };

  const resetForm = () => {
    setDocImg(null);
    setName("");
    setPassword("");
    setEmail("");
    setAddress1("");
    setAddress2("");
    setAbout("");
    setDegree("");
    setFees("");
  };

  return (
    <form className="m-5 w-full" onSubmit={onSubmitHandler}>
      <p className="mb-5 text-2xl font-semibold text-gray-800 text-center">👨‍⚕️ Add a New Doctor</p>
      
      <div className="bg-white px-8 py-6 border rounded-lg shadow-xl w-full max-w-4xl mx-auto">
        {/* Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-24 h-24 bg-gray-100 rounded-full object-cover border shadow-md"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-gray-500 text-sm mt-2">Click to upload doctor's photo</p>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InputField label="Doctor Name" value={name} setValue={setName} type="text" placeholder="Enter doctor's name" />
          <InputField label="Email" value={email} setValue={setEmail} type="email" placeholder="Enter email" />
          <InputField label="Password" value={password} setValue={setPassword} type="password" placeholder="Enter password" />
          
          {/* Experience Dropdown */}
          <div>
            <label className="block mb-1 text-gray-700">Experience (Years)</label>
            <select className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-300" value={experience} onChange={(e) => setExperience(e.target.value)} required>
              {[...Array(25).keys()].map(num => (
                <option key={num + 1} value={num + 1}>{num + 1} Years</option>
              ))}
              <option value="25+">25+ Years</option>
            </select>
          </div>

          <InputField label="Fees ($)" value={fees} setValue={setFees} type="number" placeholder="Enter fees" />

          {/* Speciality Dropdown */}
          <div>
            <label className="block mb-1 text-gray-700">Speciality</label>
            <select className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-300" value={speciality} onChange={handleSpecialityChange} required>
              {specialties.map((spec, index) => (
                <option key={index} value={spec}>{spec}</option>
              ))}
            </select>
            {isOtherSpeciality && <InputField label="Specify Speciality" value={speciality} setValue={setSpeciality} type="text" placeholder="Enter speciality" />}
          </div>

          <InputField label="Education" value={degree} setValue={setDegree} type="text" placeholder="Enter education details" />
          <InputField label="Address Line 1" value={address1} setValue={setAddress1} type="text" placeholder="Address Line 1" />
          <InputField label="Address Line 2" value={address2} setValue={setAddress2} type="text" placeholder="Address Line 2" />
        </div>

        {/* About Doctor */}
        <div className="mt-6">
          <label className="block mb-1 text-gray-700">About Doctor</label>
          <textarea className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-300" placeholder="Write about the doctor" onChange={(e) => setAbout(e.target.value)} value={about} rows={5} required />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-purple-700 text-white font-semibold rounded-lg px-4 py-3 mt-6 hover:bg-purple-800 transition-all duration-300 shadow-md">
          ➕ Add Doctor
        </button>
      </div>
    </form>
  );
};

// **Reusable Input Field Component**
const InputField = ({ label, value, setValue, type, placeholder }) => (
  <div>
    <label className="block mb-1 text-gray-700">{label}</label>
    <input className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-300" type={type} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} required />
  </div>
);

export default AddDoctor;
