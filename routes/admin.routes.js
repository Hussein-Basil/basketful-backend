const express = require("express");
const router = express.Router();

const verifyJWT = require("../middleware/verifyJWT");
const adminController = require("../controllers/admin.controller");
const authController = require("../controllers/auth.controller");

router.get("/dashboard", verifyJWT, adminController.handleGetDashboard);

router.get("/login", adminController.handleGetLogin);

router.post("/login", (req, res) => {
  authController
    .loginUser(req, res)
    .then((response) => {
      res.cookie("authorization", `Bearer ${response.data.accessToken}`, {
        maxAge: 1000 * 3600,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      res.redirect("/admin/dashboard");
    })
    .catch((err) => res.status(err.status).json({ message: err.message }));
});

router.get("/logout", (req, res) =>
  authController
    .logoutUser(req, res)
    .then(() => res.redirect("/admin/login"))
    .catch((err) => res.status(err.status).json({ message: err.message }))
);

router.get("/user/:id", verifyJWT, adminController.handleGetUser);

module.exports = router;
