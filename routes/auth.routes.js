const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/login", authController.handleLogin); // login with JWT
router.get("/refresh", authController.handleRefreshToken);
router.delete("/logout", authController.handleLogout);

module.exports = router;