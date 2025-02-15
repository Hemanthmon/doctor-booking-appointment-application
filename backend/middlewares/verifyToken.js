import jwt from "jsonwebtoken";

// user authentication middleware
export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized - token missing",
        });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If token is invalid
        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - invalid token",
            });
        }

        // Attach userId to the request object for further use
        req.userId = decoded.userId;

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error("Error in verifyToken:", error.message);

        // Handle specific JWT errors
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - token expired",
            });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - invalid token",
            });
        }

        // Handle general server errors
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
