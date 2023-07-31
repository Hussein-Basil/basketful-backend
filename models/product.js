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

module.exports = mongoose.model("product", Product)