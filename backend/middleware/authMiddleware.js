const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protectRoute = asyncHandler (async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // If Token Doesn't Exist
        if (!token) {
            res.status(401);
            throw new Error("Not Authorized, Please Login");
        }
        // Token Verification
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // Get User ID from Token
        const user = await User.findById(verified.id).select("-password");
        // If User Doesn't Exist
        if (!user) {
            res.status(401);
            throw new Error("User Doesn't Exist");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not Authorized");
    }
});

module.exports = protectRoute;