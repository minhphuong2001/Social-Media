const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    conversationId: {
        type: String,
    },
    sender: {
        type: String,
    },
    content: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("messages", MessageSchema);