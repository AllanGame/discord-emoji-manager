const Discord = require("discord.js");
const CommandHandler = require("../lib/CommandHandler");

module.exports = class Command extends CommandHandler {
  constructor(client) {
    super(client, {
      name: "config",
      description: "configurate some stuff",
      aliases: [],
      usage: "config <set | remove | edit> <property> <new value>",
      category: "utils",
      permissions: ["MANAGE_SERVER"],
      cooldown: 10,
    });
  }

  run(message, args) {
    const GuildSchema = require("../models/guild.js");
    switch (args[0]) {
      case "set":
        switch (args[1]) {
          case "guild.config.useEmojiFromLibrary":
            if (args[2] === "true") {
              let newConfig = {
                useEmojiFromLibrary: true
              };

              this.storage.guild.config = newConfig;
              this.storage.guild.save().then(() => {
                message.inlineReply(b("Config has been updated \n `guild.config.useEmojiFromLibrary`: true"))
              }).catch((err) => {
                console.log(err)
                message.channel.send(this.storage.errorEmbed)
              })
            }
            break;
          case "guild.config.evalCommandAllowed":
            if (args[2] === "true") {
              let newConfig = {
                evalCommandAllowed: true,
              }
              this.storage.guild.config = newConfig;
              this.storage.guild.save().then(() => {
                message.inlineReply(b("Config has been updated \n `guild.config.evalCommandAllowed`: true"))
              }).catch((err) => {
                console.log(err)
                message.channel.send(this.storage.errorEmbed)
              })
            }
            break;
        }
        break;
    }
  }
};
