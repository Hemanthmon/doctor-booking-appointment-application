import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import authRoutes from "./routes/auth.route.js"
import doctorRouter from './routes/doctorRoute.js'
import cookieParser from 'cookie-parser'

//! App config
const app = express()
const port = process.env.PORT || 4000

// Connect DB and cloudinary
connectDB()
connectCloudinary()

//! Middleware
app.use(express.json())
app.use(cookieParser())

// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173", // local user panel
  "http://localhost:5174", // local admin panel
  process.env.CLIENT_ORIGIN, // deployed user panel
  process.env.ADMIN_ORIGIN,   // deployed admin panel
   "https://doctor-booking-appointment-appl-git-d67992-hemanthmons-projects.vercel.app"
];

//! CORS configuration (with logging and proper handling)
app.use(cors({
  origin: function (origin, callback) {
    console.log("CORS request from origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies to be sent
  allowedHeaders: ["Content-Type", "Authorization", "atoken", "dtoken"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// No need to duplicate app.options – already handled above

//! API Routes
app.use('/api/admin', adminRouter);
app.use("/api/auth", authRoutes);
app.use('/api/doctor', doctorRouter);

// Health check route
app.get('/', (req, res) => {
  res.send('✅ API working great!');
});

//! Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server is running at: http://localhost:${port}`);
  console.log("✅ Allowed Origins:", allowedOrigins);
});
