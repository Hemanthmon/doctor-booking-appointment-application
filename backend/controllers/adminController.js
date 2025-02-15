import validator from "validator"
import bcrypt from 'bcrypt' 
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import { json, response } from "express"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import { userModel } from "../models/userModel.js"

//API for adding doctor
const addDoctor = async (req, res) => {

    try{
        const{name, email, password, speciality, degree, experience, about, fees, address} = req.body
      
       const imageFile = req.file
       console.log({name, email, password, speciality, degree, experience, about, fees, address}, imageFile)

       //checking for all data to add the doctor
       if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
         return res.json({success:false,message:"Missing Details"})
       }

       //validating email format
       if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter Valid email"})
       }

       //validating strong password
       if(password.length < 8){
        return res.json({success:false,message:"Password should contain atleast 8 characters"})
       }

       // Hashing  the Doctor password

       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password, salt);

       // upload image to cloudinary
       const  imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
       const imageUrl = imageUpload.secure_url;


       const doctorData = {
        name, 
        email,
        image:imageUrl,
        password:hashedPassword,
        speciality,
        degree,
        experience,
        about, 
        fees,
        address:JSON.parse(address),
        date:Date.now()
       }

       const newDoctor = new doctorModel(doctorData)
       // this will add the doctor details to database
       await newDoctor.save()

       res.json({success:true, message:"Doctors Details added successfully"})

    } catch (error) {
      console.log("The error from uploading the doctors data, failed to upload",error);
      res.json({success:false,message:error.message})
    }

}

// API for the admin login

const loginAdmin = async(req, res) => {
  try{
    
    const {email, password} = req.body

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
             const token = jwt.sign(email+password, process.env.JWT_SECRET)
             res.json({success:true,token})

    }else{
      res.json({success:false, message:"Invalid Credentials"})
    }

  }catch(error){
     console.log(error)
     res.json({success:false, message:error.message})
  }
}

// API to get the all doctors list for admin panel

const allDoctors = async(req, res) => {
  try{
     const doctors = await doctorModel.find({}).select('-password')
     res.json({success:true, doctors})
  } catch (error){
    console.log(error)
    res.json({success:false, message:error.message})
  }
}

//Api to get the all appoinment list for admin panel
const appointmentsAdmin = async (req, res) => {
  try {
     const appointments = await appointmentModel.find({})
     res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ success: false, message: "Failed to fetch appointments" });
  }
}

//API for appointment cancellation

 const appointmentCancel = async (req, res) => {
  try {
      const { appointmentId } = req.body;

      const appointmentData = await appointmentModel.findById(appointmentId);

      //verify the appointment user
    
      //delete the appointment
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

      // releasing the slot

      const { docId, slotDate, slotTime } = appointmentData;

      const doctorData = await doctorModel.findById(docId);
      let slots_booked = doctorData.slots_booked;

      slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);

      await doctorModel.findByIdAndUpdate(docId, { slots_booked });

      res.status(200).json({
          success: true,
          message: "Appointment Cancelled successfully"
      });
  } catch (error) {
      console.error("Error in updating user details:", error.stack);
      res.status(400).json({ success: false, message: error.message });
  }
}

//API to get the dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try{

    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashboardData = {
      doctors: doctors.length,
      users: users.length,
      appointments: appointments.length,
      latestAppointments: appointments.reverse().slice(0,5)
    }

    res.status(200).json({success:true, dashboardData})

  }catch(error){
    console.log(error)
    res.status(400).json({success:false, message:error.message})
  }
}

export {addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard}