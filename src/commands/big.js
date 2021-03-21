const Discord = require("discord.js");
module.exports = {
  name: "big",
  description: "Make an emoji more bigger",
  usage: "big [emoji]",
  alias: ["agrandar"],
  onlyowner: false,
  onlydev: false,
  cooldown: 3,
  perms: [],
  /**
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   * @param {any} storage
   */
  run: (client, message, args, storage) => {
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


