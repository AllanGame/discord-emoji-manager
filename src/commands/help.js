const Discord = require('discord.js');
const Client = require('../lib/Client')
module.exports = {
    name: "help",
    description: "View all commands",
    usage: "help {command}",
    alias: ["commands"],
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
      // ▫️ `` - ** **
      let commands = client.commands.filter(x=>x.name!=="eval").map(x=> "▫️ **"+x.name+"** - `"+x.description+"`")
      let embed = new Discord.MessageEmbed()
      .setTitle("**      **__List of all commands__")
      .setDescription(commands.join("\n"))
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}));
      if(!args[0])return message.inlineReply(embed);
        
      else {
        if(!client.commands.has(args[0].toLowerCase()))return message.channel.send(b('<:error:819654964628160527> Command not found.'));
        let cmd = client.commands.get(args[0].toLowerCase());
        let embed = new Discord.MessageEmbed()
        .setAuthor("Command: "+cmd.name, "https://cdn.discordapp.com/emojis/819222681273761842.png?v=1")
        .setDescription(`${cmd.description}

        **Usage**: ${cmd.usage}
        **Cooldown**: ${cmd.cooldown}
        ${cmd.aliases ? cmd.aliases.length > 0 ? "**Aliases**: "+cmd.aliases.join(", "): "\n" : "\n"}

        ${cmd.onlyowner ? "This command can only be used by the server owner" : ""}
        ${cmd.onlydev ? "This command can be used by the bot owners" : ""}
        `)
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp(Date.now());
        
        message.inlineReply({embed: embed});
      }
    }
  }
