const mongoose = require("mongoose");

const contacts = new mongoose.Schema({
    mobile: {
        type: Number,
        required: true,
        maxlength: 10
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    datetime: { type: Date, default: Date.now }

})

module.exports = mongoose.model("contacts", contacts)