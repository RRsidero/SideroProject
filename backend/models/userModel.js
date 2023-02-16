const mongoose = require("mongoose");

const userSchema = mongoose.Schema ({
    email: {
        type: String,
        required: [true, "Enter Email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Email Does not Exist"
        ]
    },
    username: {
        type: String,
        required: [true, "Enter Username"]
    },
    password: {
        type: String,
        required: [true, "Enter Password"],
        minLength: [8, "Password must be > 8"]
    }
})


const user = mongoose.model("user", userSchema)
module.exports = user