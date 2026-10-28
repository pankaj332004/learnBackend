const express = require("express");
const router = express.Router();

// 1. Set a cookie
router.get("/set", (req, res) => {
    res.cookie("theme", "dark", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 30
    });

    return res.status(200).json({
        success: true,
        message: "Cookie set successfully"
    });
});

// 2. Read the incoming cookie header
router.get("/read", (req, res) => {
    return res.status(200).json({
        success: true,
        cookieHeader: req.headers.cookie || null
    });
});

// 3. Clear the cookie
router.get("/clear", (req, res) => {
    res.clearCookie("theme", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });

    return res.status(200).json({
        success: true,
        message: "Cookie cleared"
    });
});

module.exports = router;