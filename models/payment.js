const mongoose = require('mongoose');

const Payment = new mongoose.Schema({
    order: { type: mongoose.Types.ObjectId, ref: 'order', require: true },
    amount: { type: Number, require: true },
    method: { type: String, require: true },
}, { timestamp: true })

module.exports = mongoose.model('payment', Payment)