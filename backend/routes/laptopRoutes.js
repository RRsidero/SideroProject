const express = require("express");
const laptopRoute = express.Router();
const {
    registerLaptop,
    displayAllLaptop,
} = require("../controllers/laptopController");
const protectRoute = require("../middleware/authMiddleware");

laptopRoute.post("/registerLaptop", registerLaptop);
laptopRoute.get("/displayLaptop", displayAllLaptop);

module.exports = laptopRoute;