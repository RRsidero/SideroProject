const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const routeProtect = asyncHandler (async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // If Token Doesn't Exist
        if (!token) {
            res.status(401);
            throw new Error("Not Authorized, Please Login");
        }
        // Token Verification
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // Get User ID From Token & Then Display Info EXCEPT Password
        user = await User.findById(verified.id).select("-password");
        // If User Can't be Found
        if (!user) {
            res.status(401);
            throw new Error("User Not Found");
        }
        // Set User to be User found in DB Above
        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error ("Authorisation Failed, Please Try Again");
    }
});

module.exports = routeProtect;