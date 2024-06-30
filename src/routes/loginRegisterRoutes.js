const express = require("express");
const router = express.Router();
const { postLoginSignup } = require("../controllers/loginRegisterController");

router.post("/", postLoginSignup);

module.exports = router;
