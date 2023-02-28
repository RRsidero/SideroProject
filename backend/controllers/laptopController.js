const asyncHandler = require("express-async-handler");
const Laptop = require("../models/laptopModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Laptop Registration
const registerLaptop = asyncHandler (async (req, res) => {
    const { company, serialNo, make, model, employee, status, ram, hd, screen } = req.body;
    // If Laptop Entry Fields are Left Blank
    if (!company || !serialNo || !make || !model || !employee || !status || !ram || !hd || !screen) {
        res.status(400);
        throw new Error("Fill out All Required Fields");
    }
    // Prevent Duplicate Laptop from being Created
    const LaptopExists = await Laptop.findOne( {serialNo} );
    if (LaptopExists) {
        res.status(400);
        throw new Error("Serial Number Already Regitered on Database");
    }
    // Create New Laptop
    const laptop = await Laptop.create ({
        company,
        serialNo,
        make,
        model,
        employee,
        status,
        ram,
        hd,
        screen,
    });
    // If Laptop Created Successfully then Display the Following
    if (laptop) {
        const { company, serialNo, make, model, employee, status, ram, hd, screen } = laptop;
        res.status(201).json ({
            company,
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

// Display All Laptops in Database
const displayAllLaptop = asyncHandler(async (req, res) => {
    res.send("Hi");
});

module.exports = {
    registerLaptop,
    displayAllLaptop,
}