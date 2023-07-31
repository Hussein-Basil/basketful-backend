const mongoose = require("mongoose")

const Store = new mongoose.Schema({
    ownerID: { type: mongoose.Types.ObjectId, ref: 'user', require: true },
    username: { type: String, require: true, unique: true },
    name: { type: String, require: true, unique: true },
    description: { type: String },
    logo: { type: String },
    address: {
        city: { type: String },
        district: { type: String },
        street: { type: String },
        phone: { type: String },
    },
    website: { type: String }
}, {
    timestamps: true
})

module.exports = mongoose.model('store', Store)
