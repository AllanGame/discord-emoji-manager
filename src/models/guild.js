const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    guildID: String,
    prefix: String,
    modlogsChannel: String
    sanctions: Number,
    mutedRole: String,
});

module.exports = mongoose.model("Guild", guildSchema);
