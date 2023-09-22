const express = require("express");
require("dotenv").config();

const User = require("../models/user");

const handleGetAllUsers = (req, res) => {
  User.find({}, (err, doc) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(doc);
  });
};

const handleGetUserById = (req, res) => {
  User.findById(req.params.id, (err, doc) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(doc);
  });
};

const handleCreateUser = (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;

  const user = new User({
    email,
    username,
    firstName,
    lastName,
    password
  });

  user.save((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    req.session.user = user;
    req.session.userID = user._id.toString();
    req.session.isAdmin = false;
    res.status(200).json({ message: "User created successfully" });
  });
};

const handleUpdateUser = (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if ((req.session && req.session.userID === id) || res.session.isAdmin) {
    User.findByIdAndUpdate(id, updates, (err, user) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ message: "User updated successfully" });
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const handleDeleteUser = (req, res) => {
  const id = req.params.id;

  if ((req.session && req.session.userID === id) || res.session.isAdmin) {
    User.findByIdAndRemove(id, (err, user) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ message: "User deleted successfully" });
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const handleAddAddress = (req, res) => {
  const { city, district, street, postalCode, phone } = req.body;

  User.findById(req.session.userID, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }

    user.address = {
      city,
      district,
      street,
      postalCode,
      phone,
    };

    user.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json({ message: "Address added successfully" });
    });
  });
};

const handleUpdateAddress = (req, res) => {
  const { city, district, street, postalCode, phone } = req.body;
  const address = {
    city,
    district,
    street,
    postalCode,
    phone,
  };

  User.findByIdAndUpdate(req.session.userID, { address }, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(200).json({ message: "Address added successfully" });
  });
};

const handleDeleteAddress = (req, res) => {
  const address = {
    city: "",
    district: "",
    street: "",
    postalCode: "",
    phone: "",
  };
  User.findByIdAndUpdate(req.session.userID, { address }, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(200).json({ message: "Address deleted successfully" });
  });
};

const handleAddPayment = (req, res) => {
  const { method, provider, accountNo, cvv, expiryDate } = req.body;
  User.findById(req.session.userID, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }

    user.payment.push({
      method,
      provider,
      accountNo,
      cvv,
      expiryDate,
    });

    user.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json({ message: "Payment added successfully" });
    });
  });
};

const handleAddToCart = async (req, res) => {
  const { product, quantity } = req.body;

  const foundUser = await User.findById(req.user._id);

  if (!foundUser.cart) {
    foundUser.cart = [{ product, quantity }];
  } else {
    const existingProduct = foundUser.cart.find(
      (cartItem) => cartItem.product.toString() === product
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      foundUser.cart.push({ product, quantity });
    }
  }

  await foundUser.save();
  req.user.cart = foundUser.cart;

  res.status(200).json({ message: "Item added successfully" });
};

const handleUpdateCart = async (req, res) => {
  const { product, quantity } = req.body;
  const foundUser = await User.findById(req.user._id).populate("cart.product");

  const existingProduct = foundUser.cart.find(
    (item) => item.product?._id.toString() === product
  );

  if (!existingProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (quantity === 0) {
    foundUser.cart = foundUser.cart.filter(
      (item) => item.product?._id.toString() !== product
    );
  } else {
    existingProduct.quantity = quantity;
  }

  await foundUser.save();
  req.user.cart = foundUser.cart;

  res.status(200).json({ cart: foundUser.cart });
};

const handleGetCart = async (req, res) => {
  const foundUser = await User.findById(req.user._id).populate("cart.product");

  res.status(200).json({ cart: foundUser.cart });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
  handleAddAddress,
  handleUpdateAddress,
  handleDeleteAddress,
  handleAddPayment,
  handleAddToCart,
  handleGetCart,
  handleUpdateCart,
};
