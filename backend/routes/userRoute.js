const express = require("express");
const route = express.Router();
const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getUser,
    loginStatus,
} = require("../controllers/userController");
const protectRoute = require("../middleware/authMiddleware");

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/logout", logoutUser);
route.get("/getUser", protectRoute, getUser);
route.get("/loginStatus", loginStatus);

module.exports = route;
