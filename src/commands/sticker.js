const CommandHandler = require('../lib/CommandHandler');

module.exports = class Command extends CommandHandler {
  constructor(client) {
    super(client, {
      name: "sticker",
      description: "Send an sticker with a webhook",
      aliases: [],
      category: "emojis",
      permissions: []
    });
  }

  run(message, args) {
const GuildSchema = require("../models/guild.js");

    let client = this.client;
    GuildSchema.findOne({
      guildID: message.guild.id
    }, (err, guild) => {
      if (err) {
        console.error(err);
      }

      if (!guild) return;
      if (!guild.config.useEmojiFromLibrary) return;

      switch (args[0]) {
        case "GoodNight":
          message.guild.fetchWebhooks().then(async (r) => {
            let result = r.filter((x) => x.owner.id === client.user.id && x.channelID === message.channel.id)
            let hook;
            if (result.size === 0) {
              hook = await message.channel
                .createWebhook(message.author.username, {
                  avatar: message.author.displayAvatarURL(),
                  reason: message.author.tag + " is trying to use an sticker",
                })
            } else {
              hook = result.first()
            }
            if (hook.name !== message.author.username && hook.avatar !== message.author.avatar) {
              await hook.edit({
                name: message.author.username,
                avatar: message.author.displayAvatarURL()
              })
            }
              await hook.send("https://distok.top/stickers/776239539974963202/776243107654008872.gif")
      
            message.delete()
          })
          break;
      }
    })
  }
}