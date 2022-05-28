const mongoose = require('mongoose')

const Order = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'user', require: true },
    storeId: { type: mongoose.Types.ObjectId, ref: 'store', require: true },
    total: { type: Number, require: true },
    paymentProvider: { type: String, require: true },
    status: { type: String, require: true },
    items: [{
        productId: { type: mongoose.Types.ObjectId, ref: 'product', require: true },
        quantity: { type: Number, require: true },
    }],
}, { timestamps: true })

module.exports = mongoose.model('order', Order)