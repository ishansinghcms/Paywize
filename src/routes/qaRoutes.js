const express = require("express");
const router = express.Router();
const { postQuestion, getChats } = require("../controllers/qaController");

router.post("/query", postQuestion);
router.get("/chats/:email", getChats);

module.exports = router;
