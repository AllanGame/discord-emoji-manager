const Discord = require("discord.js");
module.exports = {
  name: "react",
  description: "React to a message with an emoji",
  usage: "react [messageID] [emoji]",
  alias: ["reaccionar"],
  onlyowner: false,
  onlydev: false,
  cooldown: 10,
  perms: [""],
  /**
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   * @param {any} storage
   */
  run: (client, message, args, storage) => { 

    return message.inlineReply("Currently this command is disabled")

  }
} 