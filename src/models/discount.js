const mongoose = require("mongoose")

const Discount = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    status: { type: Boolean, default: false },
    discount_percent: { type: Number, require: true },
}, { timestamps: true })

module.exports = mongoose.model("discount", Discount)