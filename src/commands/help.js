const Discord = require("discord.js");
const Client = require("../lib/Client");
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
    if (!args[0]) {
      let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Emoter Help")
        .addField("F.A.QS", "React with :question: to see the faqs.")
        .addField("Commands", "React with <:command:821216655522398239> to see the command list")
        .addField("Emoji Library", "React with <:emoji:818987710693900329> to see the emoji library information")
        .setFooter("Visit our website https://emoter.gg/ ");

        message.inlineReply(helpEmbed).then(async (msg) => {
        await msg.react("❓");
        await msg.react("<:command:821216655522398239>");
        await msg.react("<:emoji:818987710693900329>");

        // Catch reactions
        let faqsFilter = (reaction, user) => reaction.emoji.name === "❓" && user.id === message.author.id;
        let commandsFilter = (reaction, user) => reaction.emoji.id === "821216655522398239" && user.id === message.author.id;
        let emojiLibraryFilter = (reaction, user) => reaction.emoji.id === "818987710693900329" && user.id === message.author.id;

        let chooseFaqs = msg.createReactionCollector(faqsFilter, {time: 60000,});
        let chooseCommands = msg.createReactionCollector(commandsFilter, {time: 60000,});
        let chooseEmojiLibrary = msg.createReactionCollector(emojiLibraryFilter,{ time: 60000 });

        chooseFaqs.on("collect", async (r) => {
          r.users.remove(message.author);
          faqsEmbed = new Discord.MessageEmbed()
            .setTitle("Emoter Faqs")
            .setDescription("FAQS \n *React with the emojis below to change the page*")
            .setFooter("Visit our website https://emoter.gg/ ");
          msg.edit(faqsEmbed);
        });
        chooseCommands.on("collect", async (r) => {
          r.users.remove(message.author);

          let commands = client.commands
            .filter((x) => x.name !== "eval")
            .map((x) => "▫️ **" + x.name + "** - `" + x.description + "`");

          let commandsEmbed = new Discord.MessageEmbed()
            .setTitle("**      **__List of all commands__")
            .setDescription(commands.join("\n"))
            .setFooter(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true })
            );

          msg.edit(commandsEmbed);

        });
        chooseEmojiLibrary.on("collect", async (r) => {
          r.users.remove(message.author);
          emojiLibraryEmbed = new Discord.MessageEmbed()
            .setTitle("Emoter Emoji Library")
            .setDescription("EMOJI LIBRARY \n *React with the emojis below to change the page*")
            .setFooter("Visit our website https://emoter.gg/ ");
          msg.edit(emojiLibraryEmbed);
        });
      });
    } else {
      if (!client.commands.has(args[0].toLowerCase()))
        return message.channel.send(
          b("<:error:819654964628160527> Command not found.")
        );
      let cmd = client.commands.get(args[0].toLowerCase());
      let embed = new Discord.MessageEmbed()
        .setAuthor("Command: " + cmd.name, "https://cdn.discordapp.com/emojis/819222681273761842.png?v=1")
        .setDescription(
          `${cmd.description}

        **Usage**: ${cmd.usage}
        **Cooldown**: ${cmd.cooldown}
        ${
          cmd.aliases
            ? cmd.aliases.length > 0
              ? "**Aliases**: " + cmd.aliases.join(", ")
              : "\n"
            : "\n"
        }

        ${
          cmd.onlyowner
            ? "This command can only be used by the server owner"
            : ""
        }
        ${cmd.onlydev ? "This command can be used by the bot owners" : ""}
        `
        )
        .setFooter(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp(Date.now());

      message.inlineReply({ embed: embed });
    }
  },
};
