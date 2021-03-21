const Discord = require("discord.js");
const Client = require("../lib/Client");
let nodisplaycmds = ["eval", "users", "guilds", "react"];
module.exports = {
  name: "help",
  description: "View all commands",
  usage: "help {command}",
  alias: ["ayuda"],
  cooldown: 3,
  onlyowner: false,
  onlydev: false,
  perms: [],
  /**
   * @param {Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   * @param {any} storage
   */
  run: (client, message, args, storage) => {

    let commands = client.commands
      .filter((x) => !nodisplaycmds.includes(x.name))
      .map((x) => ":white_small_square: **" + x.name + "** - `" + x.description + "`");

    let commandsEmbed = new Discord.MessageEmbed()
      .setTitle("**      **__List of all commands__")
      .setDescription(commands.join("\n"))
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.inlineReply(commandsEmbed);

  }
} 