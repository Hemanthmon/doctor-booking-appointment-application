import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    line1: { type: String, default: '' },
    line2: { type: String, default: '' },
});

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: {
            type: String,
            default: "https://res.cloudinary.com/ds1kpzz2i/image/upload/v1742284238/upload_area_aiselu.png" ,
                
        },
        address: { type: AddressSchema, default:{}}, // Use subdocument for address
        gender: { type: String, default: "Not Selected" },
        dob: { type: String, default: "Not Selected" },
        phone: { type: String, default: "0000000000" },
        bloodGroup: { type: String, default: 'Unknown' },
        lastLogin: {
            type: Date,
            default: Date.now,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        resetPasswordToken: String,
        resetPasswordExpires: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date,
        resetPasswordToken: { type: String },
        resetTokenExpiresAt: { type: Date },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
export const userModel =
    mongoose.models.user || mongoose.model("user", userSchema);
