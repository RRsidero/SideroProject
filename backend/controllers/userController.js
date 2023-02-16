const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

// Function to Generate Token assigned to User ID with Expiry of 1 Day
const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET, {
        expiresIn: "1d"});
};

const registerUser = asyncHandler( async (req, res) => {
    const {email, username, password} = req.body

    // Validation
    if (!email || !username || !password) {
        res.status(400);
        throw new Error("Fill out All Required Fields")
    }
    if (password.length < 8) {
        res.status(400);
        throw new Error("Password must be Greater than 8 Characters")
    }
    // Check if User Email Already Exists on the Database
    const userExists = await User.findOne( {email} )
    if (userExists) {
        res.status(400);
        throw new Error("Email Already In Use!");
    }
    // Create New User
    const user = await User.create ({
        email,
        username,
        password,
    });

    // Generate Token
    const token = generateToken(user._id);

    // Send HTTP-only Cookie to Frontend
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // Expires after 24 Hours
        sameSite: "none",
        secure: true
    });

    if (user) {
        const { _id, email, username } = user;
        res.status(201).json ({
            _id,
            email,
            username,
            token
        });
    } else {
        res.status(400);
        throw new Error("Failed to Create User");
    }
});

module.exports = {
    registerUser
}