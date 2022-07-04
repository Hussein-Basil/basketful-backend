const mongoose = require("mongoose")
const Joi = require("joi")

const Discount = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    status: { type: Boolean, default: false },
    discount_percent: { type: Number, require: true },
}, { timestamps: true })

function validateDiscount(discount) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        description: Joi.string().required(),
        status: Joi.bool(),
        discount_precent: Joi.number().min(0).required(),
    }
    
return Joi.validate(discount, schema);
}

module.exports = mongoose.model("discount", Discount)
exports.validate = validateDiscount;