import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, require: true },
    experience: { type: String, require: true },
    about: { type: String, require: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, require: true },
    address: {
        line: { type: String, required: true },
        line2: { type: String },
    },
    date: { type: Number, require: true },
    slots_booked: { type: Object, default: {} }
}, { minimize: false })

const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema)

export default doctorModel;