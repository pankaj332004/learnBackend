const jwt = require("jsonwebtoken");
const User = require("../models/user.models")
const { errorResponse } = require("../utils/apiResponse");

async function authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json(
            errorResponse("Please log in first")
        );
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.type !== "access") {
            return res.status(401).json(
                errorResponse("Invalid access token")
            );
        }

        const user = await User.findById(decoded.userId).select("role");

        if (!user) {
            return res.status(401).json(
                errorResponse("User not found")
            );
        }

        req.user = {
            id: user._id.toString(),
            role: user.role
        };

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError" ||
            err.name === "JsonWebTokenError") {
            return res.status(401).json(
                errorResponse("Invalid or expired access token")
            );
        }

        next(err);
    }
}

function requireAdmin(req, res, next) {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json(
            errorResponse("Only admins can perform this action")
        );
    }

    next();
}

module.exports = { 
    authenticateUser,
    requireAdmin
};