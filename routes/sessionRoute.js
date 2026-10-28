const express = require("express");
const router = express.Router();

const {successResponse, errorResponse } = require("../utils/apiResponse")

router.post("/login", (req,res)=>{
    const { userId } = req.body;

    if(!userId){
        return res.status(400).json(
            errorResponse("userId is required")
        );
    }

    req.session.userId = userId;

    return res.status(200).json(
        successResponse("Session created successfully")
    )
})

router.get("/me", (req,res)=>{
    if(!req.session.userId){
        return res.status(401).json(
            errorResponse("No active session")
        )
    }

    return res.status(200).json({
        success: true,
        userId: req.session.userId
    })
})

router.post("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        if (err) return next(err);

        res.clearCookie("sid", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });

        return res.status(200).json(
            successResponse("Logged out successfully")
        );
    });
});

module.exports = router;