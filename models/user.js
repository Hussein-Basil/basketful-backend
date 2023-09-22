const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    verifiedEmail: { type: Boolean, default: false },
    password: { type: String, require: true },
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
        product: {
          type: mongoose.Types.ObjectId,
          ref: "product",
          require: true,
        },
        quantity: { type: Number, min: 1, default: 1, require: true },
      },
    ],
    wishlist: [
      {
        product: {
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
  return bcrypt.compareSync(password, this.password);
};

User.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = this.generateHash(this.password);
  next();
});

module.exports = mongoose.model("user", User);
