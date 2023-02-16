const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");

// Initialise Express
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes Middleware
app.use("/api/users", userRoute);

// Error Middleware
app.use(errorHandler);

// Test to See if GET Method Works
app.get("/", (req, res) => {
    res.send("Hello World");
})

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