import jwt from "jsonwebtoken";

// Generates a JWT and sets it as an HTTP-only cookie
export const generateTokenAndCookie = (res, userId) => {
    // 1. Sign the JWT token using a secret key from environment variables
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d", // Token will expire in 7 days
    });

    // 2. Set the token as an HTTP-only cookie in the response
    res.cookie("token", token, {
        httpOnly: true, // Prevents JavaScript access to cookie (security)
        secure: process.env.NODE_ENV === "production", // Secure only in production (for HTTPS)
        sameSite: "None", // Allows cross-site cookies (e.g., Vercel ↔️ Render)
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        path: "/", // Cookie is valid for entire site
    });

    return token; // Optional: return token if needed elsewhere
};
