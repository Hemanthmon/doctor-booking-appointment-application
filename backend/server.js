import express from 'express'
//This imports the express library, a web framework for Node.js used to create APIs or web applications.
import cors from 'cors'
//Imports the cors middleware, which allows your server to handle cross-origin requests.
import 'dotenv/config'
//Automatically loads environment variables from a .env file into process.env.
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import { addDoctor } from './controllers/adminController.js'
import authRoutes from "./routes/auth.route.js"
import cookieParser from 'cookie-parser'
import doctorRouter from './routes/doctorRoute.js'


//!app config
const app = express()
//Initializes an Express application.
// The app object is the main application instance that will be used to define routes, apply middleware, and handle HTTP requests.

const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//!middlwares
app.use(express.json()) //allows us to parse incoming requests : req.body
//Adds a middleware to parse incoming JSON payloads in the request body.
//It ensures req.body contains the parsed JSON data when the client sends JSON.

// app.use(cors({
//     origin: [
//         "http://localhost:5173", // User panel (local)
//         "http://localhost:5174"  // Admin panel (local)
//     ], // Frontend origin
//     credentials: true, // Allow cookies and credentials
//     allowedHeaders: ["Content-Type", "Authorization", 'atoken','dtoken'], // Specify allowed headers
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify allowed methods
// }));

const allowedOrigins = [
    "http://localhost:5173", // user panel
    "http://localhost:5174", // admin panel
    process.env.CLIENT_ORIGIN, // deployed user panel (e.g. Vercel)
    process.env.ADMIN_ORIGIN   // deployed admin panel
  ];
  
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "atoken", "dtoken"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }));
  
//Adds the cors middleware to handle Cross-Origin Resource Sharing (CORS).
// This allows your API to accept requests from frontend clients hosted on different domains.

app.use(cookieParser()); //allows us to parse incoming cookies

//!Api End Points
app.use('/api/admin', adminRouter)
//$ localhost:4000/api/admin/add-doctors

app.use("/api/auth", authRoutes)

app.use('/api/doctor', doctorRouter)
//req: Represents the request object, containing details like headers, parameters, and body.
//res: Represents the response object, used to send data back to the client.
app.get('/', (req, res) => {
    res.send('Api working great')
})

//start the express
app.listen(port, () => console.log("Server is running at:",`http://localhost:${port}`))
//Starts the Express server and listens for incoming connections on the specified port.