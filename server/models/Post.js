const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
}, {
    timestamps: true,
});


module.exports = mongoose.model("posts", PostSchema);