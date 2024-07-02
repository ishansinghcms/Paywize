const express = require("express");
const router = express.Router();
const {
  postQuestion,
  getChats,
  getWebsites,
} = require("../controllers/aiController");

router.post("/query", postQuestion);
router.get("/chats/:email", getChats);
router.get("/websites", getWebsites);

module.exports = router;
