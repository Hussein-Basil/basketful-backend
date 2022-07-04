const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require("mongoose")

const Product = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    storeID: { type: mongoose.Types.ObjectId, ref: 'store', require: true },
    categoryID: { type: mongoose.Types.ObjectId, ref: 'category', require: true },
    price: { type: Number, require: true },
    image: { type: String, require: true },
    stockQuantity: { type: Number, require: true },
    discountID: { type: mongoose.Types.ObjectId, ref: 'discount', require: false },
}, {
    timestamps: true
})
function validateProduct(product) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        description: Joi.string().required(),
        storeID: Joi.objectId().required(),
        categoryID: Joi.objectId().required(),
        price: Joi.number().min(0).required(),
        image: Joi.string().required(),
        stockQuantity: Joi.number().min(0).required(),
        discountID: Joi.objectId().required()
    }
    
return Joi.validate(product, schema);
}

module.exports = mongoose.model("product", Product)
exports.validate = validateProduct