const mongoose = require('mongoose')
const Joi = require("joi")

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

function validateOrder(order) {
    const schema = {

        userID: Joi.objectId().required(),
        storeID: Joi.objectId().required(),
        total: Joi.number().min(0).required(),
        paymentProvider: Joi.string().required(),
        stockQuantity: Joi.number().min(0).required(),
        discountID: Joi.objectId().required()
    }
    
return Joi.validate(order, schema);
}
module.exports = mongoose.model('order', Order)
exports.validate = validateOrder;
