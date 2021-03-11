const Discord = require('discord.js');
module.exports = {
    name: "help",
    usage: "help {options}",
    alias: ["commands"],
    cooldown: 3,
    onlyowner: false,
    onlydev: false,
    perms: [],
    /**
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {String[]} args
     * @param {any} storage
     */
    run: (client, message, args, storage) => {

      message.channel.send(
        "a"
      )

    }
  }
