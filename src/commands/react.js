const Discord = require("discord.js");
const CommandHandler = require('../lib/CommandHandler');

module.exports = class Command extends CommandHandler {
    constructor(client) {
        super(client, {
            name: "react",
            description: "React to a message with an emoji",
            aliases: ["reaccionar"],
            usage: "react [messageID] [emoji]",
            category: "emojis",
            permissions: ["MANAGE_EMOJIS"],
            cooldown: 10
        });
    }

    run(message, args) {
      return message.inlineReply("Currently this command is disabled")
    }
}