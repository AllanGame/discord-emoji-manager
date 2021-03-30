const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    guildID: String,
    prefix: String,
    config: {
        useEmojiFromLibrary: Boolean,
        evalCommandAllowed: Boolean
    }
});

module.exports = mongoose.model("Guild", guildSchema);
