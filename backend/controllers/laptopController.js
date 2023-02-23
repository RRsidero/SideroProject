const asyncHandler = require("express-async-handler");
const Laptop = require("../models/laptopModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Laptop Registration
const registerLaptop = asyncHandler (async (req, res) => {
    const {serialNo, make, model, employee, status, ram, hd, screen} = req.body;
    // If Laptop Details Entered Incorrectly
    if (!serialNo || !make || !model || !employee || !status || !ram || !hd || !screen) {
        res.status(400);
        throw new Error("Fill out All Required Fields");
    }
    // Create New Laptop
    const laptop = await Laptop.create ({
        serialNo,
        make,
        model,
        employee,
        status,
        ram,
        hd,
        screen,
    });
    // If User Created Successfully then Display the Following
    if (laptop) {
        const { serialNo, make, model, employee, status, ram, hd, screen } = laptop;
        res.status(201).json ({
            serialNo,
            make,
            model,
            employee,
            status,
            ram,
            hd,
            screen,
        });
    } else {
        res.status(400);
        throw new Error("Failed to Create Laptop");
    }
});

module.exports = {
    registerLaptop,
}