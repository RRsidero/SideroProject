const express = require("express");
const route = express.Router();
const { registerUser, loginUser, logoutUser, getUser } = require("../controllers/userController");
const routeProtect = require("../middleware/authMiddleware");

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/logout", logoutUser);
route.get("/getUser", routeProtect, getUser);

module.exports = route;
