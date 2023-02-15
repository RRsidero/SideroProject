const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();

// Initialise Express
const app = express();

// Temporary Solution to Deprecation Warning
mongoose.set("strictQuery", true);

// Establish Connection to MongoDB OR Use Port 5000
const port = process.env.port || 5000;

// Connect to MongoDB and Start Server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Running on Port ${port}`);
        })
    })
    .catch((err) => console.log(err))