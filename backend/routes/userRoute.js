const express = require("express");
const route = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/userController");

route.post("/register", registerUser);
route.post("/login", loginUser);
route.post("/logout", logoutUser);

module.exports = route;
