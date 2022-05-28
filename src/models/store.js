const mongoose = require("mongoose")

const Store = new mongoose.Schema({
    ownerID: { type: mongoose.Types.ObjectId, ref: 'user', require: true },
    shortID: { type: String, require: true, unique: true },
    name: { type: String, require: true, unique: true },
    logo: { type: String },
}, {
    timestamps: true
})

module.exports = mongoose.model('store', Store)
