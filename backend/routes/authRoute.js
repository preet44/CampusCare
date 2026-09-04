const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
} = require("../controllers/authController");

const {
  validateSignup,
  validateLogin,
} = require("../validation/authValidation");

const validate = require("../validation/validate");

router.post("/signup", validate(validateSignup), signup);

router.post("/login", validate(validateLogin), login);

router.post("/logout", logout);

module.exports = router;