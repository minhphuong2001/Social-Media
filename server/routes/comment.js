const express = require("express");
const commentController = require("../controllers/commentController");
const router = express.Router();

router.post("/", commentController.create)
router.get("/", commentController.getComment)

module.exports = router;