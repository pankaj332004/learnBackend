const express = require("express");
const route = express.Router();

const { 
    loginController,
    registerController,
    profileController,
    refreshTokenController,
    logoutController
} =
require("../controllers/authController");

const { authenticateUser } = require("../middleware/authMiddleware")

route.post("/login", loginController);
route.post("/register", registerController);
route.post("/refresh", refreshTokenController)
route.post("/logout", logoutController);

route.get(
    "/profile",
    authenticateUser,
    profileController
);

module.exports = route;