const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Function to Generate Token assigned to User ID with Expiry of 1 Day
const generateToken = (id) => {
    return jwt.sign({ id } , process.env.JWT_SECRET, {
        expiresIn: "1d"});
};
// User Registration
const registerUser = asyncHandler (async (req, res) => {
    const { email, username, password } = req.body;
    // If Email OR Username OR Password not Entered
    if (!email || !username || !password) {
        res.status(400);
        throw new Error("Fill out All Required Fields");
    }
    // If Password < 8 Characters Long
    if (password.length < 8) {
        res.status(400);
        throw new Error("Password must be Greater than 8 Characters");
    }
    // Check if User Email Already Exists on the Database
    const userExists = await User.findOne( {email} );
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
    // If User Created Successfully then Display the Following
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

// User Login
const loginUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
        res.status(400);
        throw new Error("Please Add Email & Password");
    }
    // Check if Information is Valid
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User Doesn't , Please Register");
    }
    // User Exists => Password Validation
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    // Generate Token
    const token = generateToken(user._id);
    // If Password is Correct Generate Cookie
    if (passwordIsCorrect) {
        // Send HTTP-only Cookie to Frontend
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // Expires after 24 Hours
            sameSite: "none",
            secure: true,
        });
    }
    // If Email & Password are Correct Display the Following
    if (user && passwordIsCorrect) {
        const { _id, email, username } = user;
        res.status(200).json ({
            _id,
            email,
            username,
            token,
            });
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
});

// Logout User
const logoutUser = asyncHandler (async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0), // Expires Instantly
        sameSite: "none",
        secure: true
    });
    return res.status(200).json( { message: "Logout Successful" } )
});

// Get User Details when Logged In
const getUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        const { _id, email, username } = user;
        res.status(200).json ({
            _id,
            email,
            username,
        });
    } else {
        res.status(400);
        throw new Error("User not Found");
    }
});

// Verify Login Status
const loginStatus = asyncHandler (async (req, res) => {
    const token = req.cookies.token;
    // If Token Doesn't Exist
    /*
    if (!token) {
        return res.json(false);
    }
    */
    // Token Verification
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // If Token is Verified then User must be Logged in
    if (verified) {
        return res.json(true);
    }
    // Return False if Not Logged in
    return res.json(false);
});

// Update User
const updateUser = asyncHandler (async (req, res) => {
    // Find User by ID
    const user = await User.findById(req.user._id);
    // If User has been Found then Update User
    if (user) {
        const { email, username } = user;
        user.email = email; // Cannot Update Email
        user.name = req.body.username || username;
        // Return Updated User Data
        const updatedUser = await user.save();
        res.status(200).json ({
            _id: updatedUser._id,
            email: updatedUser._email,
            username: updatedUser._username,
        })
    } else {
        res.status(404)
        throw new Error ("User not Found")
    }
});

// Update Password if Previous Password is Already Known
const passwordUpdate = asyncHandler (async (req, res ) => {
    // Find User on DB Using ID
    const user = await User.findById(req.user._id);
    // Declare Old & New Password to be Read
    const {
        oldPassword,
        newPassword
    } = req.body;
    // Check if User Exists
    if (!user) {
        res.status.apply(400);
        throw new Error ("User not Found");
    }
    // Validation to see if Details were Entered
    if (!oldPassword || !newPassword) {
        res.status(400);
        throw new Error("Please Fill out Fields");
    }
    // Check if Old Password Matches Password in DB
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);
    // Save New Password
    if (user && passwordIsCorrect) {
        user.password = newPassword;
        await user.save();
        res.status(200).send("Password Changed Successfully");
    } else {
        res.status(400);
        throw new Error("Old Password is Incorrect, Please try Again");
    }
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    loginStatus,
    updateUser,
    passwordUpdate,
}