const mongoose = require("mongoose");

const laptopSchema = mongoose.Schema ({
    company: {
        type: String,
    },
    serialNo: {
        type: String,
    },
    employee: {
        type: String,
    },
    make: {
        type: String,
    },
    model: {
        type: String,
    },
    status: {
        type: String,
    },
    ram: {
        type: String,
    },
    hd: {
        type: String,
    },
    screen: {
        type: String,
    },
    note: {
        type: String,
    },
})

const Laptop = mongoose.model("Laptop", laptopSchema);
module.exports = Laptop;