const express = require("express");
const authController = require("../controllers/authController")
const {verifyAccessToken} = require("../middleware/verifyToken")

const router = express.Router();

router.get("/confirm", verifyAccessToken, authController.confirm)
router.put("/", verifyAccessToken, authController.updateInfor)

// router.get("/get-user", authController.getUser)

router.post("/register", authController.register)
router.post("/login", authController.login)

router.get("/", authController.getUser)
router.put("/:id/follow", authController.followUser)
router.put("/:id/unfollow", authController.unfollowUser)
router.get("/friends/:userId", authController.getFriends)

module.exports = router;