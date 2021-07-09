const express = require("express");
const multer = require("multer");
const path = require("path");
const uploadController = require("../controllers/uploadController");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images"))
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
    try {
        return res.json({
            success: true,
            message: "File uploaded successfully",
        })
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;
