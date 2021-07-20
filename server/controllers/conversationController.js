require("dotenv").config();
const ErrorResponse = require("../helper/ErrorResponse");
const asyncHandle = require("../middleware/asyncHandle");
const Conversation = require("../models/Conversation");

module.exports = {

    // @route [POST] api/conversation
    // @desc new conv
    create: asyncHandle(async (req, res, next) => {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
        })

        await newConversation.save();

        res.json({
            success: true,
            message: "Conversation successfully",
            data: newConversation
        })
    }),

    // @route [GET] api/conversation
    // @desc get conversation of a user 
    getConversation: asyncHandle(async (req, res, next) => {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        });

        res.json({
            success: true,
            message: "Successfully",
            data: conversation
        })
    
    })
}