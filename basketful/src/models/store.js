const mongoose = require("mongoose")
const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)
const Store = new mongoose.Schema({
    ownerID: { type: mongoose.Types.ObjectId, ref: 'user', require: true },
    shortID: { type: String, require: true, unique: true },
    name: { type: String, require: true, unique: true },
    logo: { type: String },
}, {
    timestamps: true
})
function validateStore(store) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        ownerID: Joi.objectId().required(),
        shortID: Joi.string().required(),
        logo: Joi.string()
    }
    
return Joi.validate(store, schema);
}
module.exports = mongoose.model('store', Store)
exports.validate = validateStore;