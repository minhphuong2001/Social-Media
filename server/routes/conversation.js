const express = require("express");
const conversationController = require("../controllers/conversationController");

const router = express.Router();

router.post("/", conversationController.create);
router.get("/:userId", conversationController.getConversation)

module.exports = router;