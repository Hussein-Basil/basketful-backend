const mongoose = require('mongoose')

const Category = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    image: { type: String, require: false },
    parent_id: { type: mongoose.Types.ObjectId, ref: 'category', require: false },
}, { timestamps: true })

module.exports = mongoose.model('category', Category)