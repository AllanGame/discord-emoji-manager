const Discord = require("discord.js");
const CommandHandler = require('../lib/CommandHandler');

module.exports = class Command extends CommandHandler {
    constructor(client) {
        super(client, {
            name: "big",
            description: "Make an emoji more bigger",
            aliases: ["agrandar"],
            usage: "big [emoji]",
            category: "emojis",
            permissions: [],
            cooldown: 3
        });
    }

    run(message, args) {
      if (!args[0]) {
        return message.inlineReply(b('Please provide an emoji!'));
      }
  
      let emoji = Discord.Util.parseEmoji(args[0]);
      if (emoji.id === undefined || emoji.id === null) {
        return message.inlineReply(b("Invalid emoji!"));
      }
  
      let emojiURL;
      let emojiExtention = "";
      emoji.animated ? emojiExtention = ".gif" : emojiExtention = ".png";
      emojiURL = "https://cdn.discordapp.com/emojis/" + emoji.id + emojiExtention + "?v=1";
  
      message.inlineReply(new Discord.MessageEmbed()
      .setTitle(emoji.name)
      .setImage(emojiURL)
      .setColor("RANDOM")
      );
    }
}
