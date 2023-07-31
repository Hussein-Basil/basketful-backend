const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.route("/:id").get(productController.handleGetProductById);

router
  .route("/")
  .get(productController.handleGetAllProducts)
  .post(productController.handleCreateProduct);

module.exports = router;
