
const express = require("express");

const {
  handleConversation,
} = require("../controllers/conversationController");

const router = express.Router();

router.post("/", handleConversation);

module.exports = router;
