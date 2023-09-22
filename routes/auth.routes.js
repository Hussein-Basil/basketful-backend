const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/login", (req, res) =>
  authController
    .loginUser(req, res)
    .then((response) => res.status(response.status).json({ ...response.data }))
    .catch((err) => res.status(err.status).json({ message: err.message }))
); // login with JWT

router.get("/refresh", (req, res) =>
  authController
    .refreshToken(req, res)
    .then((response) => res.status(response.status).json({ ...response.data }))
    .catch((err) => res.status(err.status).json({ message: err.message }))
);
router.delete("/logout", (req, res) =>
  authController
    .logoutUser(req, res)
    .then((response) => res.status(response.status).json({ ...response.data }))
    .catch((err) => res.status(err.status).json({ message: err.message }))
);

module.exports = router;
