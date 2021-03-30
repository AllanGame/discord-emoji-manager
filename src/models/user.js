const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID: String,
    lang: String,
    blacklisted: Boolean,
    dev: Boolean,
    emojiCollection: []
});

module.exports = mongoose.model("User", userSchema);