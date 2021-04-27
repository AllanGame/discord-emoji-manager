const CommandHandler = require('../lib/CommandHandler');
const Discord = require('discord.js')

module.exports = class Command extends CommandHandler {
  constructor(client) {
    super(client, {
      name: "library",
      description: "The emoji library for no-nitro emojis",
      aliases: [],
      usage: "library [options]",
      category: "emojis",
      permissions: [],
      cooldown: 0
    });
  }

  run(message, args) {
    var EmojiSchema = require("../models/emoji.js");
    let noPermEmbed = new Discord.MessageEmbed()
      .setTitle("No permission")
      .setDescription("Sorry but you dont have permission to use this subcommand \nIf you are trying to submit an emoji for the library, use " + this.storage.guild.prefix + "`library submit <emoji>`")
      .setColor("RED");
    const { generateCode } = require('../utils/codeGenerator.js')

    switch (args[0]) {
      case "add":
        if (!this.storage.owners.id.includes(message.author.id)) {
          return message.inlineReply(noPermEmbed);
        }

        if (!args[1]) return message.inlineReply(b("Please provide the ID of the emoji to add"))
        if (!args[2]) return message.inlineReply(b("Please provide a category for this emoji"))

        let providedEmoji = this.client.emojis.cache.get(args[1]);
        if (!providedEmoji) {
          return message.inlineReply(b("Emoji not found."))
        }

        console.log(providedEmoji)
        const emojiLibraryID = generateCode(5);

        EmojiSchema.findOne({
          emoji: providedEmoji
        }, (err, emoji) => {
          if (!emoji) {
            console.log("not found")
            const newEmojiSchema = new EmojiSchema({
              id: emojiLibraryID,
              name: providedEmoji.name,
              category: args.slice(2).join(" "),
              author: "LIBRARY_STAFF",
              emoji: providedEmoji
            })
            return newEmojiSchema.save().then((r) => {
              console.log(r.emoji)
              console.log(r.emoji.id)
            })
          }

        })

        break;
      case "remove":
        break;
      case "submit":
        break;
      case "accept":
        break;
      case "reject":
        break;
      case "list":
        break;
      case "has":
        break;
    }

  }
}
