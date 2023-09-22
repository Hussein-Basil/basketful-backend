const mongoose = require('mongoose')

const Category = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    description: { type: String, require: true },
}, { timestamps: true })

module.exports = mongoose.model('category', Category)