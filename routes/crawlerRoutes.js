const express = require("express");
const router = express.Router();
const { getCrawlerData } = require("../controllers/crawlerController");

router.post("/", getCrawlerData);

module.exports = router;
