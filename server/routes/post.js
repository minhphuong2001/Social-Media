const express = require("express");
const postController = require("../controllers/postController");
const { verifyAccessToken } = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", verifyAccessToken, postController.getPost)
router.post("/", postController.create)

router.get("/:id", verifyAccessToken, postController.getPostById)
router.put("/:id", verifyAccessToken, postController.update)
router.delete("/:id", postController.delete)
router.put("/:id/like", postController.likePost)

router.get("/timeline/:userId", postController.getTimeline)
router.get("/profile/:username", postController.getAllPost)
module.exports = router;