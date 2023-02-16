const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

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

    if (user) {
        const { _id, email, username, password } = user;
        res.status(201).json ({
            _id,
            email,
            username,
            password
        });
    } else {
        res.status(400);
        throw new Error("Failed to Create User");
    }
});

module.exports = {
    registerUser
}