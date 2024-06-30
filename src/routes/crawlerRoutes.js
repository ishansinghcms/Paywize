const express = require("express");
const router = express.Router();
const { getCrawlerData } = require("../controllers/crawlerController");

router.post("/data", getCrawlerData);

module.exports = router;
