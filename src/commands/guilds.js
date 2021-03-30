const Discord = require("discord.js");
const Client = require("../lib/Client");
const CommandHandler = require('../lib/CommandHandler');

module.exports = class Command extends CommandHandler {
    constructor(client) {
        super(client, {
            name: "guilds",
            description: "View bot guilds",
            aliases: [],
            usage: "guilds",
            category: "dev",
            onlyowner: true,
            permissions: [],
            cooldown: 10
        });
    }

    run(message, args) {
      let serverlist = [];
      for(let server of this.client.guilds.cache.values()){
          serverlist.push("**"+server.name+"**");
      }
  
      let guildsEmbed = new Discord.MessageEmbed()
      .setTitle("Bot Guilds")
      .setDescription(serverlist.join("\n- "));
      message.inlineReply(guildsEmbed);
    }
}