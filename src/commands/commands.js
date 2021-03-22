const Discord = require("discord.js");
const Client = require("../lib/Client");
let nodisplaycmds = ["eval", "users", "guilds", "react"];
const CommandHandler = require('../lib/CommandHandler');

module.exports = class Command extends CommandHandler {
  constructor(client) {
    super(client, {
      name: "commands",
      description: "View all commands",
      aliases: ["comandos"],
      usage: "commands",
      category: "misc",
      permissions: [],
      cooldown: 3
    });
  }

  run(message, args) {
    let commands = client.commands
      .filter((x) => !nodisplaycmds.includes(x.name))
      .map((x) => ":white_small_square: **" + x.name + "** - `" + x.description + "`");

    let commandsEmbed = new Discord.MessageEmbed()
      .setTitle("**      **__List of all commands__")
      .setDescription(commands.join("\n"))
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({
          dynamic: true
        })
      );

    message.inlineReply(commandsEmbed);
  }
}