import express from "express";
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword, checkAuth, getProfile, updateProfile, bookAppointment, getAppointments, cancelAppointment, paymentRazorpay, verifyPayment, resendVerificationCode } from "../controllers/authController.js";
import { verifyToken } from '../middlewares/verifyToken.js'
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth)

router.post("/signup", signup); 

router.post("/login", login);

router.get("/get-profile", verifyToken ,getProfile);

router.put("/update-profile", upload.single('image'), verifyToken, updateProfile)

router.post("/book-appointment", verifyToken, bookAppointment)

router.get("/appointments", verifyToken, getAppointments)

router.post("/cancel-appointment", verifyToken, cancelAppointment)

router.post("/payment-razorpay", verifyToken, paymentRazorpay)

router.post("/verifyRazorpay", verifyToken, verifyPayment)

router.post("/logout", logout);

router.post("/verify-email", verifyEmail)

router.post("/resend-verification-email", resendVerificationCode);

router.post("/forgot-password", forgotPassword)

router.post("/reset-password/:token", resetPassword)

export default router;