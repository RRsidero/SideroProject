const express = require("express");
const route = express.Router();
const { registerUser } = require("../controllers/userController");

// const registerUser = () => {};

route.post("/register", registerUser);

module.exports = route;
