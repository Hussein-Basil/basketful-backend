const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

const storeController = require("../controllers/store.controller");

router
  .route("/:id")
  .get(verifyJWT, storeController.handleGetStoreById)
  .put(storeController.handleUpdateStore)
  .delete(storeController.handleDeleteStore);

router
  .route("/")
  .get(verifyJWT, storeController.handleGetAllStores)
  .post(storeController.handleCreateStore);

module.exports = router;
