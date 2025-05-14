import jwt from "jsonwebtoken";

// Generates a JWT and sets it as an HTTP-only cookie
export const generateTokenAndCookie = (res, userId) => {
    // 1. Sign the JWT token using a secret key from environment variables
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d", // Token will expire in 7 days
    });

    // 2. Set the token as an HTTP-only cookie in the response
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });
      console.log("Setting cookie with:", {
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
        
      });
      console.log("NODE_ENV is:", process.env.NODE_ENV);

    return token; // Optional: return token if needed elsewhere
};
