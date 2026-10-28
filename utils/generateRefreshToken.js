const jwt = require("jsonwebtoken")

function generateRefreshToken(userId){
    return jwt.sign(
        {
            userId: userId.toString(),
            type: "refresh"
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d"
        }
    )
}

module.exports = generateRefreshToken