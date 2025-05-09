import jwt from "jsonwebtoken";

export const generateTokenAndCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    res.cookie("token", token, {
        httpOnly: true, 
        secure: true, // Must be true for cross-site in production
        sameSite: "None", // This allows cookies across domains like Vercel ↔️ Render
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    });

    return token;
}