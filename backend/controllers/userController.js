const asyncHandler = require("express-async-handler");
const user = require("../models/userModel"); 

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
    if (password.length > 30) {
        res.status(400);
        throw new Error("Password must be Less than 30 Characters")
    }
    // Check if User Email Already Exists on the Database
    const userExists = await user.findOne( {email} )
    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists!");
    }
});

module.exports = {
    registerUser
}