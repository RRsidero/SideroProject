const express = require("express");
const laptopRoute = express.Router();
const {
    registerLaptop,
} = require("../controllers/laptopController");
const protectRoute = require("../middleware/authMiddleware");

laptopRoute.post("/registerLaptop", registerLaptop);

module.exports = laptopRoute;