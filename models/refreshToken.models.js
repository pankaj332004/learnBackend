const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        token: {
            type: String,
            required: true,
            unique: true
        },
        expiresAt: {
            type: Date,
            required: true
        },
        revoked: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "RefreshToken",
    refreshTokenSchema
)