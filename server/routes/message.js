const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.post("/", messageController.create);
router.get("/:conversationId", messageController.getMessage)

module.exports = router;