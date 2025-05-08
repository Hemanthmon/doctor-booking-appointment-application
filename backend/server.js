import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import { addDoctor } from './controllers/adminController.js'
import authRoutes from "./routes/auth.route.js"
import cookieParser from 'cookie-parser'
import doctorRouter from './routes/doctorRoute.js'

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
  "http://localhost:5173", // user panel (local)
  "http://localhost:5174", // admin panel (local)
  process.env.CLIENT_ORIGIN, // deployed user panel
  process.env.ADMIN_ORIGIN   // deployed admin panel
];

// CORS setup
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

// Allow preflight (CORS OPTIONS requests)
app.options('*', cors());

//! API Routes
app.use('/api/admin', adminRouter);
app.use("/api/auth", authRoutes);
app.use('/api/doctor', doctorRouter);

// Health check
app.get('/', (req, res) => {
  res.send('API working great');
});

// Start server
app.listen(port, () => console.log(`Server is running at: http://localhost:${port}`));
