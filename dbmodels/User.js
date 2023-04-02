const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    backgroundImage: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    videos: {
        type: Array,
        required: false
    },
    subscriptions: {
        type: Array,
        required: false
    },
    subscribers: {
        type: Array,
        required: false
    },
    comments: {
        type: Array,
        required: false
    },
    playlists: {
        type: Array,
        required: false
    },
    likes: {
        type: Array,
        required: false
    },
    dislikes: {
        type: Array,
        required: false
    },
    history: {
        type: Array,
        required: false
    },
    watchLater: {
        type: Array,
        required: false
    },
    notifications: {
        type: Array,
        required: false
    },
    settings: {
        type: Object,
        required: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now,
        required: false
    },
    accountType: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model("User", userSchema);
