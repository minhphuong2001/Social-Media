require("dotenv").config();
const ErrorResponse = require("../helper/ErrorResponse");
const asyncHandle = require("../middleware/asyncHandle");
const Comment = require("../models/Comment");

module.exports = {
    // @route [POST] api/comment
    // @desc create a new comment
    create: asyncHandle(async (req, res, next) => {
        const newComment = new Comment(req.body);

        await newComment.save();

        res.json({
            success: true,
            message: "Create new comment sucessfully",
            data: newComment
        })

    }),

    // @route [GET] api/comment/userId
    // @desc create a new comment
    getComment: asyncHandle(async (req, res, next) => {
        const comment = await Comment.find().populate("user").sort({"createdAt": -1});

        res.json({
            success: true,
            data: comment
        })
    })
}