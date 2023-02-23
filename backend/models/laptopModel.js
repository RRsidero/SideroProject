const mongoose = require("mongoose");

const laptopSchema = mongoose.Schema ({
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
    status: {
        type: String,
    }
})

const Laptop = mongoose.model("Laptop", laptopSchema);
module.exports = Laptop;