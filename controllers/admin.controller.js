const Store = require("../models/store");
const Product = require("../models/product");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const handleGetDashboard = async (req, res) => {
  const stores = await Store.find({});
  const products = await Product.find({});
  const users = await User.find({});

  res.render("dashboard", {
    stores,
    products,
    users,
  });
};

const handleGetLogin = async (req, res) => {
  res.render("login");
};
const handleGetUser = async (req, res) => {
  const foundUser = await User.findById(req.params.id).populate("cart.product");
  res.render("user", { user: foundUser });
};
module.exports = {
  handleGetDashboard,
  handleGetLogin,
  handleGetUser,
};
