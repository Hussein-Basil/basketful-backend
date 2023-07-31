const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router
  .route("/")
  .get(userController.handleGetAllUsers)
  .post(userController.handleCreateUser);

router
  .route("/:id")
  .get(userController.handleGetUserById)
  .put(userController.handleUpdateUser)
  .delete(userController.handleDeleteUser);

router
  .route("/address")
  .post(userController.handleAddAddress)
  .put(userController.handleUpdateAddress)
  .delete(userController.handleDeleteAddress);

router.post("/payment", userController.handleAddPayment);

module.exports = router;
