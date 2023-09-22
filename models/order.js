const mongoose = require('mongoose')

const Order = new mongoose.Schema({
    customer: { type: mongoose.Types.ObjectId, ref: 'user', require: true },
    totalAmount: { type: Number, require: true },
    items: [{
        product: { type: mongoose.Types.ObjectId, ref: 'product', require: true },
        quantity: { type: Number, require: true },
        itemPrice: { type: Number, require: true },
    }]
}, { timestamps: true })

module.exports = mongoose.model('order', Order)