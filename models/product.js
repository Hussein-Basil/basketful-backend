const mongoose = require("mongoose");

const Product = new mongoose.Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: false },
    storeID: { type: mongoose.Types.ObjectId, ref: "store", require: false },
    categoryID: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      require: false,
    },
    price: { type: Number, require: true },
    images: [{ type: String, require: true }],
    stockQuantity: { type: Number, require: true },
    discountID: {
      type: mongoose.Types.ObjectId,
      ref: "discount",
      require: false,
    },
    rating: {
      total: Number,
      score: Number,
      distribution: [Number],
    },
    reviews: [
      {
        reviewer: { type: mongoose.Types.ObjectId, ref: "user", require: true },
        avatar: String,
        title: String,
        rating: Number,
        date: Date,
        text: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", Product);
