const express = require("express");
const router = express.Router();

const verifyJWT = require("../middleware/verifyJWT");
const userController = require("../controllers/user.controller");

router
  .route("/")
  .get(userController.handleGetAllUsers)
  .post(userController.handleCreateUser);

router
  .route("/address")
  .post(userController.handleAddAddress)
  .put(userController.handleUpdateAddress)
  .delete(userController.handleDeleteAddress);

router.post("/payment", userController.handleAddPayment);

router
  .route("/cart")
  .get(verifyJWT, userController.handleGetCart)
  .post(verifyJWT, userController.handleAddToCart)
  .put(verifyJWT, userController.handleUpdateCart);

router
  .route("/:id")
  .get(userController.handleGetUserById)
  .put(userController.handleUpdateUser)
  .delete(userController.handleDeleteUser);

module.exports = router;
