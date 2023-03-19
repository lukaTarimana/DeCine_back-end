const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);
