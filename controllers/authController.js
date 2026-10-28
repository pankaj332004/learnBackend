const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const { 
    errorResponse, 
    successResponse 
} =
require("../utils/apiResponse");
const validatePassword = require("../utils/validatePassword");
const User = require("../models/user.models");
const RefreshToken = require("../models/refreshToken.models")
const generateToken = require("../utils/generateToken");
const generateRefreshToken = require("../utils/generateRefreshToken")

async function loginController(req, res, next) {
    try {
        const { email, password } = req.body;

        if (typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json(
                errorResponse("Email and password are required")
            );
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(401).json(
                errorResponse("Invalid email or password")
            );
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        )

        if(!isPasswordCorrect){
            return res.status(401).json(
                errorResponse("Invalid email or password")
            )
        }

        const accessToken = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        const expiresAt = new Date(
            Date.now() +
            7 * 24 * 60 * 60 * 1000
        );

        await RefreshToken.create({
            userId: user._id,
            token: refreshToken,
            expiresAt
        });

        return res
        .status(200)
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7*24*60*60*1000,
            path: "/api/v1/auth"
        })
        .json(
            successResponse("Login successful", {
                id: user._id,
                email: user.email,
                role: user.role,
                accessToken: accessToken,
            })
        );
    }
    catch (err){
        next(err);
    }
}

async function registerController(req,res, next){
    try {
        const {email, password} = req.body;

        if(typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
             !password
            ){
            return res.status(400).json(
                errorResponse("Email and password are required")
            );
        }

        if(!validatePassword(password)){
            return res.status(400).json(
                errorResponse(
                    "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character"
                )
            )
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUSer = await User.findOne({
            email: normalizedEmail
        })

        if(existingUSer){
            return res.status(409).json(
                errorResponse("Email already registered")
            );
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            email: normalizedEmail,
            password: hashedPassword
        });

        return res.status(201).json(
            successResponse("Registration successful",{
                id: newUser._id,
                email: newUser.email
            })
        );
    }
    catch(err){
        if (err.code === 11000) {
            return res.status(409).json(
                errorResponse("Email already registered")
            );
        }

        next(err);
    }
}

function profileController(req, res, next) {
    try {
        return res.status(200).json(
            successResponse("Profile accessed successfully", {
                userId: req.user.id
            })
        );
    } catch (err) {
        next(err);
    }
}

async function refreshTokenController(req, res, next){
    try{
        const  refreshToken  = req.cookies?.refreshToken;

        if(!refreshToken){
            return res.status(401).json(
                errorResponse("Refresh token is required")
            );
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );


        if(decoded.type !== "refresh"){
            return res.status(401).json(
                errorResponse("Invalid refresh token")
            );
        }

        const storedToken = await RefreshToken.findOne({
            token: refreshToken,
            userId: decoded.userId,
            revoked: false,
            expiresAt: { $gt: new Date()}
        });

        if(!storedToken){
            return res.status(401).json(
                errorResponse("Refresh token is invalid, expired, or revoked")
            );
        }

        const newAccessToken = generateToken(decoded.userId);
        const newRefreshToken = generateRefreshToken(decoded.userId);

        const newExpiresAt = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        );

        storedToken.revoked = true;

        await RefreshToken.deleteOne({
            _id: storedToken._id
        });

        await RefreshToken.create({
            userId: decoded.userId,
            token: newRefreshToken,
            expiresAt: newExpiresAt
        });

        return res
        .status(200)
        .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/api/v1/auth"
    })
    .json(
            successResponse("Token rotated successfully",{
                accessToken: newAccessToken,
            })
        );
    }
    catch(err){
        console.log("Refresh error:", err.name, err.message);
        if(err.name === "TokenExpiredError" ||
            err.name === "JsonWebTokenError"
        ){
            return res.status(401).json(
                errorResponse("Invalid or expired refresh token")
            );
        }
        next(err);
    }
}

async function logoutController(req, res, next) {
    try {
        const  refreshToken  = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(400).json(
                errorResponse("Refresh token is required")
            );
        }

        const deletedToken = await RefreshToken.findOneAndDelete({
            token: refreshToken
        });

        if (!deletedToken) {
            return res.status(401).json(
                errorResponse("Invalid refresh token or already logged out")
            );
        }

        return res
        .clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/api/v1/auth"
        })
        .status(200)
        .json(
            successResponse("Logout successful", null)
        );
    } catch (err) {
        next(err);
    }
}

module.exports = { 
    loginController,
    registerController,
    profileController,
    refreshTokenController,
    logoutController
};