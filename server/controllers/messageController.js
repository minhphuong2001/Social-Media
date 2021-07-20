require("dotenv").config();
const ErrorResponse = require("../helper/ErrorResponse");
const asyncHandle = require("../middleware/asyncHandle");
const Message = require("../models/Message");

module.exports = {
    // @route [POST] /api/message
    // @desc add message
    create: asyncHandle(async (req, res, next) => {
        const newMessage = new Message(req.body);
        await newMessage.save();

        res.json({
            success: true,
            message: "Add a message successfully",
            data: newMessage
        })

    }),

    getMessage: asyncHandle(async (req, res, next) => {
        const message = await Message.find({
            conversationId: req.params.conversationId
        })

        res.json({
            success: true,
            message: "Receive message successfully",
            data: message
        })
    })
}