const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    thumbnail: {
        type: String,
        required: false
    },
    video: {
        type: String,
        required: true
    },
    statistics: {
        type: Object,
        required: true,
        default: {
            views: 0,
            likes: 0,
            dislikes: 0,
            comments: 0,
            shares: 0
        }
    },
    tags: {
        type: Array,
        required: false
    },
    comments: {
        type: Array,
        required: false
    },
    type: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model("Video", videoSchema);
