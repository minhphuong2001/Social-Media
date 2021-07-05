const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^[a-zA-Z0-9]{8,}$/,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        defalut: ""
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true,
        default: 'user',
    },
    description: {
        type: String,
    },
    from: {
        type: String,
    },
    city: {
        type: String,
    },
    relationship: {
        type: Number,
        enum: [1,2,3],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('users', UserSchema)