import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Mogoo DB data base connected Successfully"))
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
}
export default connectDB