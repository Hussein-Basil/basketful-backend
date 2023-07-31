const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router
  .route("/")
  .get(orderController.handleGetAllOrders)
  .post(orderController.handleCreateOrder);

router
  .route("/:id")
  .get(orderController.handleGetOrderById)
  .delete(orderController.handleDeleteOrder);

module.exports = router;
