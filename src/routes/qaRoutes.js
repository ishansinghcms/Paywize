const express = require("express");
const router = express.Router();
const { getAnswer } = require("../controllers/qaController");

router.post("/chat", getAnswer);

module.exports = router;
