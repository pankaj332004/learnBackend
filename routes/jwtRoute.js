const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

router.use("/test", (req, res) => {
    const token = jwt.sign(
        { userId: "user123" },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

    res.json({
        success: true,
        token
    });
});

module.exports = router