const express = require("express");
const passport = require("passport");

const router = express.Router();
const authController = require("../../controllers/auth.controller");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}/auth/login/`);
  }
);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refreshtoken", authController.refreshToken);
router.post("/logout", authController.logout);

module.exports = router;
