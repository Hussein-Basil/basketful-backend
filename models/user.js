const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    verifiedEmail: { type: Boolean, default: false },
    hashedPassword: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    address: {
      city: String,
      district: String,
      street: String,
      postalCode: String,
      phone: String,
    },
    payment: [
      {
        method: String,
        provider: String,
        account_no: String,
        cvv: String,
        expiryDate: String,
      },
    ],
    cart: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "product",
          require: true,
        },
        quantity: { type: Number, min: 1, default: 1, require: true },
      },
    ],
    wishlist: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "product",
          require: true,
        },
        adddedAt: { type: Date, default: Date.now, require: true },
      },
    ],
    refreshToken: { type: String },
    roles: [{ type: String, require: true, default: "user" }],
  },
  {
    timestamps: true,
  }
);

User.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
User.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.hashedPassword);
};

module.exports = mongoose.model("user", User);
