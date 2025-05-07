import { userModel } from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import validator from 'validator';
import { v2 as cloudinary } from 'cloudinary'
import razorpay from 'razorpay'

import { generateTokenAndCookie } from '../utils/generateTokenAndSetCookie.js'
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail, sendAppointmentConfirmationEmail, sendPaymentReceiptEmail } from '../mailtrap/emails.js'
import { group } from 'console';


export const signup = async (req, res) => {
    //here extracting the name, email, passsword from the user
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required");
            // return res.json({success:false, message:"missing detials"})
        }
        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter a valid email" })
        }
        const userAlreadyExists = await userModel.findOne({ email });
        console.log("userAlreadyExits", userAlreadyExists);
        if (userAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        //hashinng user password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new userModel({
            email,
            password: hashedPassword,
            name,
            isVerified: false,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //24 hours
        })

        //saving at the data base
        await newUser.save();

        //jwt
        generateTokenAndCookie(res, newUser._id)

        await sendVerificationEmail(newUser.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User Created successfully",
            user: {
                name: newUser.name,
                email: newUser.email,
                gender: newUser.gender,
                dob: newUser.dob,
                phone: newUser.phone,
                address: newUser.address,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
                lastLogin: newUser.lastLogin,
                isVerified: newUser.isVerified,
                verificationToken: newUser.verificationToken,
                verificationTokenExpiresAt: newUser.verificationTokenExpiresAt,
            },
        });


    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

}

export const verifyEmail = async (req, res) => {
    // 1 2 3 4 5 6
    const { code } = req.body;
    try {
        console.log("recieved code :", code)

        const user = await userModel.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        })
// made some changes here
        if (!user || !user.verificationTokenExpiresAt || user.verificationTokenExpiresAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code"
            })
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                name: user.name,
                email: user.email,
                isVerified: true
            }
        })

    } catch (error) {
        console.error("Error in verifyEmail:", error); // Debugging
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const resendVerificationCode = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified",
            });
        }

        // Generate a new verification code and update expiry
        const newVerificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationToken = newVerificationToken;
        user.verificationTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 mins expiry

        await user.save();

        // Send the new code to the user's email
        await sendVerificationEmail(user.email, newVerificationToken);

        res.status(200).json({
            success: true,
            message: "A new verification code has been sent to your email.",
        });

    } catch (error) {
        console.error("Error in resendVerificationCode:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User doesn't exist" });
        }
        if (!user.isVerified) {
            return res.status(400).json({ success: false, message: "Email not verified. Please verify your email before logging in." });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        generateTokenAndCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            isAuthenticated: true,
            user: {
                ...user._doc,
                password: undefined,
            },
        })
    } catch (error) {
        console.log("Error in login:", error)
        res.status(400).json({ success: false, message: error.message })
    }
}
export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "logged out successfully" });
}

//API to get the user profile data
export const getProfile = async (req, res) => {
    try {
        const { userId } = req;
        console.log("UserId in getProfile:", userId);

        // if (!mongoose.Types.ObjectId.isValid(userId)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid user ID format",
        //     });
        // }

        const userData = await userModel.findById(userId).select('-password');

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            userData
        })
    } catch (error) {
        console.log("Error in fetching user details:", error)
        res.status(400).json({ success: false, message: error.message })
    }
}

//API to update the user profile

// export const updateProfile = async (req, res) => {
//     try {
//         const { name, phone, address, dob, gender, bloodGroup } = req.body
//         const imageFile = req.file

//         if (!name || !phone || !address || !dob || !gender || !bloodGroup) {
//             return res.status(400).json({ success: false, message: "Data is missing" })
//         }
//         await userModel.findOneAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender, bloodGroup })

//         if(imageFile){

//             //upload image to cloudinary 
//             const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type: 'image'})
//             const imageURL = imageUpload.secure_url

//             await userModel.findByIdAndUpdate(userId,{image:imageURL})
//         }
//         res.json({success:true,message:"Profile Updated"})
//     } catch (error) {
//         console.log("Error in updating user details:", error)
//         res.status(400).json({ success: false, message: error.message })
//     }
// }

//update 1
export const updateProfile = async (req, res) => {
    try {
        const { userId } = req;
        const { name, phone, dob, gender, bloodGroup } = req.body;
        const imageFile = req.file;

        // Parse and validate address
        let parsedAddress;
        try {
            parsedAddress = JSON.parse(req.body.address);
            if (typeof parsedAddress !== 'object' || !parsedAddress.line1 || !parsedAddress.line2) {
                throw new Error("Invalid address format");
            }
        } catch (error) {
            return res.status(400).json({ success: false, message: "Invalid address format" });
        }

        // Validate required fields
        if (!name || !phone || !dob || !gender) {
            return res.status(400).json({ success: false, message: "Data is missing" });
        }

        // Check if user exists
        const userExists = await userModel.findById(userId);
        console.log("Database query result for userId:", userExists);
        if (!userExists) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update user details
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: userId },
            { name, phone, address: parsedAddress, dob, gender : gender || "Not Selected", bloodGroup },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "Update failed" });
        }
        console.log("Updated user details:", updatedUser);

        // Handle image upload
        if (imageFile) {
            try {
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
                const imageURL = imageUpload.secure_url;
                const updatedImageUser = await userModel.findByIdAndUpdate(userId, { image: imageURL }, { new: true });
                console.log("Updated user with image:", updatedImageUser);
            } catch (error) {
                console.error("Image upload error:", error);
                return res.status(500).json({ success: false, message: "Image upload failed" });
            }
        }

        res.json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.error("Error in updating user details:", error.stack);
        res.status(400).json({ success: false, message: error.message });
    }
};

// API to book Appointment

export const bookAppointment = async (req, res) => {
    try {
        const { userId } = req;
        const { docId, slotDate, slotTime, amount } = req.body;
        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData.available) {
            return res.status(400).json({ success: false, message: "Doctor is not available" })
        }

        let slots_booked = docData.slots_booked;

        //Checking for slots availability

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(400).json({ success: false, message: "Slot not available" })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        }
        else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: docData.fees,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData);
        //save in the appointment model
        await newAppointment.save();

        //save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

            // Send confirmation email
    await sendAppointmentConfirmationEmail(
        userData.email,
        userData.name,
        docData.name,
        slotDate,
        slotTime,
        docData.fees
      );

        res.status(200).json({
            success: true,
            message: "Appointment Booked successfully"
        })

    } catch (error) {
        console.error("Error in updating user details:", error.stack);
        res.status(400).json({ success: false, message: error.message });
    }
}

// API to get all the appointments of the user
export const getAppointments = async (req, res) => {
    try {
        const { userId } = req;
        const appointments = await appointmentModel.find({ userId })
        res.status(200).json({
            success: true,
            appointments,
        })
    } catch (error) {
        console.error("Error in updating user details:", error.stack);
        res.status(400).json
            ({
                success: false,
                message: error.message
            });

    }
};

// API to cancel the appointment 

export const cancelAppointment = async (req, res) => {
    try {
        const { userId } = req;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        //verify the appointment user
        if (appointmentData.userId !== userId) {
            return res.status(400).json({ success: false, message: "Unauthorized Action" })
        }

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

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// API to make payments for appointments using razorpay
export const paymentRazorpay = async (req, res) => {
    
        // creating options for payment
        try{
            const { appointmentId, amount } = req.body;

            if (!appointmentId || !amount || typeof amount !== "number") {
                console.log("Missing appointmentId or amount in request");
                return res.status(400).json({ 
                    success: false,
                     message: "Appointment ID and amount are required" });
            }

              // Fetch Appointment Data
            const appointmentData = await appointmentModel.findById(appointmentId);
            if (!appointmentData || appointmentData.cancelled) {
                return res.status(400).json({ 
                    success: false,
                     message: "Appointment Cancelled or not found" })
            }
            

            // if (amount !== appointmentData.docData.fees) {
            //     console.error("Invalid amount provided");
            //     return res.status(400).json({ 
            //         success: false,
            //         message: "The amount provided does not match the appointment fees"
            //      });
            // }

            // creating options  for payment
            const options = {
                amount: amount * 100,
                currency: process.env.CURRENCY,
                receipt: appointmentId,
            }
            const order = await razorpayInstance.orders.create(options);
            res.json({ success: true, order })
        }
       
        // creation of an order
      
          catch (error) {
        console.error("Error in proceeding payment:", error);
        res.status(500).json
        ({ 
            success: false, 
            message: "Internal Server Error. Please try again later."
         });
    }

}
// API to verify the payment
//  export const verifyPayment = async (req, res) => { 
    
//     try {
//         console.log("Received request body:", req.body);
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

//         if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
//             console.log("Missing razorpay_payment_id in request body");
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Missing required payment verification fields." });
//         }

//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
 
//         console.log("Order Info:", orderInfo);

//         const appointment = await appointmentModel
//         .findById(orderInfo.receipt)
//         .populate("userId", "email name")
//         .lean();

//         console.log("✅ Appointment Data:", appointment); // Debugging step

//         if (!appointment) {
//             return res.status(404).json({ success: false, message: "❌ Appointment not found" });
//         }

//         const userEmail = appointment.userData?.email || appointment.userId?.email;
//         const userName = appointment.userData?.name ||  appointment.userId?.name;

//         console.log("✅ Extracted Email:", userEmail);
//         console.log("✅ Extracted Name:", userName);
//         // const userEmail = appointment.userId.email;
//         // const userName = appointment.userId.name;

//         if (!userEmail || !userName) {
//             console.error("❌ Email or Name missing in appointment data!");
//             return res.status(500).json({ success: false, message: "Email or Name missing in appointment data" });
//         }

        

        
//         if(orderInfo.status === 'paid'){
//             // Update appointment payment status in the databasrun e
//             await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment:true});
//             await sendPaymentReceiptEmail(userEmail, userName, orderInfo.amount / 100, "Success", razorpay_payment_id);
//             res.status(200).json({success:true,message:"Payment Successful"})   
//         } else {
//             res.status(400).json({success:false,message:"Payment Failed"})
//         }
//     } catch (error) {
//         console.error("Error in proceeding payment:", error);
//         res.status(500).json({ success: false, message: "Error verifying payment. Please try again." });
//     }
//  }
export const verifyPayment = async (req, res) => { 
    try {
        console.log("Received request body:", req.body); // ✅ Check incoming request

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            console.log("❌ Missing required fields in request body.");
            return res.status(400).json({
                success: false,
                message: "Missing required payment verification fields."
            });
        }

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        console.log("✅ Order Info:", orderInfo);

        // Fetch the appointment and populate the user details
        const appointment = await appointmentModel
            .findById(orderInfo.receipt)
            .populate("userId", "email name") // Ensure `userId` references a User model
            .lean();  // Convert to a plain object

        console.log("✅ Appointment Data:", appointment);

        if (!appointment) {
            return res.status(404).json({ success: false, message: "❌ Appointment not found" });
        }

        // Extract email & name from userData or userId
        const userEmail = appointment.userData?.email || appointment.userId?.email;
        const userName = appointment.userData?.name || appointment.userId?.name;

        console.log("✅ Extracted Email:", userEmail);
        console.log("✅ Extracted Name:", userName);

        if (!userEmail || !userName) {
            console.error("❌ Email or Name missing in appointment data!");
            return res.status(500).json({ success: false, message: "Email or Name missing in appointment data" });
        }
        const doctorName = appointment.docData?.name || "Unknown Doctor";
        const doctorSpeciality = appointment.docData?.speciality || "General Practitioner";
        const clinicAddress = `${appointment.docData?.address?.line1 || ""}, ${appointment.docData?.address?.line2 || ""}`;
        const appointmentDate = appointment.slotDate;
        const appointmentTime = appointment.slotTime;
        const paymentDate = new Date().toLocaleDateString();
        const paymentTime = new Date().toLocaleTimeString(); 

        console.log("✅ Doctor Name:", doctorName);
        console.log("✅ Speciality:", doctorSpeciality);
        console.log("✅ Clinic Address:", clinicAddress);
        console.log("✅ Appointment Date:", appointmentDate);
        console.log("✅ Appointment Time:", appointmentTime);
        console.log("✅ Payment time:", paymentTime);
        console.log("✅ payment date :", paymentDate);
  

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            await sendPaymentReceiptEmail(userEmail, 
                userName,
                 orderInfo.amount / 100, 
                 "Success",
                  razorpay_payment_id,
                  doctorName,
                  doctorSpeciality,
                  clinicAddress,
                  appointmentDate,
                  appointmentTime,
                  paymentDate, 
                  paymentTime
                );
            return res.status(200).json({ success: true, message: "✅ Payment Successful" });
        } else {
            return res.status(400).json({ success: false, message: "❌ Payment Failed" });
        }
    } catch (error) {
        console.error("❌ Error in verifying payment:", error);
        return res.status(500).json({ success: false, message: "Error verifying payment. Please try again." });
    }
};


export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Email doesn't exisit in our database" });
        }
        // generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetTokenExpiresAt = resetTokenExpiresAt;

        console.log("Generated reset token:", resetToken);
        console.log("Token expiry time:", resetTokenExpiresAt);


        await user.save();

        console.log("User after saving reset token:", user);



        //send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({
            success: true,
            message: "Password reset link sent to your email"
        });
    } catch (error) {
        console.log("Error in forgotPassword", error)
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const sanitizedToken = token.trim().replace(/[^\w]/g, ''); // Remove unwanted characters
        const { password } = req.body;

        console.log("===== RESET PASSWORD START =====");
        console.log("Step 1: Token received from request (raw):", req.params.token);
        console.log("Step 2: Sanitized token:", sanitizedToken);

        console.log("Step 3: Querying database with:", {
            resetPasswordToken: sanitizedToken,
            resetTokenExpiresAt: { $gt: Date.now() },
        });

        // Query the database
        const user = await userModel.findOne({
            resetPasswordToken: sanitizedToken,
            resetTokenExpiresAt: { $gt: Date.now() },
        });

        // Log result of the database query
        if (!user) {
            console.log("Step 4: User not found. Invalid or expired token:", sanitizedToken);
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token",
            });
        }

        console.log("Step 4: User found in database. Proceeding to password reset:", {
            email: user.email,
        });

        // Hash and update the password
        console.log("Step 5: Hashing new password...");
        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetTokenExpiresAt = undefined;

        console.log("Step 6: Updating user with new password...");
        await user.save();

        // Optionally send a notification email
        console.log("Step 7: Sending password reset success email...");
        await sendResetSuccessEmail(user.email);

        console.log("Step 8: Password reset successful for user:", user.email);
        console.log("===== RESET PASSWORD END =====");

        res.status(200).json({
            success: true,
            message: "Password reset successful",
        });
    } catch (error) {
        console.error("Error in resetPassword:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password');
        if (!user) {
            return res.status(400).json({ success: false, message: "user not found" })
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in checkAuth", error)
        res.status(400).json({ success: false, message: error.message })
    }
}


