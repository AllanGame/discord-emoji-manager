const Discord = require("discord.js");
const Client = require("../lib/Client");
module.exports = {
  name: "guilds",
  description: "View bot guilds",
  usage: "guilds",
  alias: [],
  cooldown: 10,
  onlyowner: true,
  onlydev: false,
  perms: [],
  /**
   * @param {Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   * @param {any} storage
   */
  run: (client, message, args, storage) => { 

    let serverlist = [];
    for(let server of client.guilds.cache.values()){
        serverlist.push("`"+server.name+"`")
    }

    let guildsEmbed = new Discord.MessageEmbed()
    .setTitle("Bot Guilds")
    .setDescription(serverlist.join("- ** **"))
    message.inlineReply(guildsEmbed)
  }
}