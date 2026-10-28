const jwt = require("jsonwebtoken");

function generateToken(userId) {
    return jwt.sign(
        { userId: userId.toString(),
            type: "access"
         },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
    );
}

module.exports = generateToken;