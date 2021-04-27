const mongoose = require("mongoose");

const emojiSchema = new mongoose.Schema({
    id: String,
    name: String,
    category: String,
    author: Object || String,
    emoji: Object
});

module.exports = mongoose.model("EmojiLibrary", emojiSchema);
