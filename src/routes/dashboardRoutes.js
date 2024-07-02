const express = require("express");
const router = express.Router();
const { getAnalytics } = require("../controllers/dashboardController");

router.get("/analytics/:email", getAnalytics);

module.exports = router;
