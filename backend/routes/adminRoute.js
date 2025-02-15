import express from 'express'
import { addDoctor, allDoctors, loginAdmin, appointmentsAdmin, appointmentCancel, adminDashboard  } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctors',authAdmin, upload.single('image'), addDoctor)
// this is the middle ware provided bt the multer, it handles the file upload for the request
//? It expexts a form named image in theh incoming request
//? It processes the uploaded file, stores it (based on the multer configuration),
//? and adds the file metadata to the req.file object.


adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors', authAdmin,allDoctors)
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter;


// Example of req.file after upload:
// json
// Copy code
// {
//     "fieldname": "image",
//     "originalname": "doctor-profile.jpg",
//     "encoding": "7bit",
//     "mimetype": "image/jpeg",
//     "destination": "./uploads",
//     "filename": "doctor-profile.jpg",
//     "path": "./uploads/doctor-profile.jpg",
//     "size": 24576
// }