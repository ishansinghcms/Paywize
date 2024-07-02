const express = require("express");
const router = express.Router();
const { getCrawlerData } = require("../controllers/crawlerController");

router.get("/data/:websiteNumber", getCrawlerData);

module.exports = router;
