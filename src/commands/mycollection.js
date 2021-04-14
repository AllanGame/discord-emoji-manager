const Discord = require("discord.js");
const CommandHandler = require('../lib/CommandHandler');

module.exports = class Command extends CommandHandler {
  constructor(client) {
    super(client, {
      name: "mycollection",
      description: "Manage your emoji collection",
      aliases: ["collection"],
      usage: "mycollection <add | remove> ",
      category: "emojis",
      permissions: [],
      cooldown: 5
    });
  }

  run(message, args) {

    const UserSchema = require('../models/user');


    UserSchema.findOne({
      userID: message.author.id
    }, (err, user) => {
      if (err) {
        return message.inlineReply("Something went wrong")
      }
      if (!user) {
        return message.inlineReply("Something went wrong, please try again.")
      }

      switch (args[0]) {
        case "add":

          // let regex = new RegExp(/[^<]{0,1}:(\w{2,32}):(?!\d{18}>)/g)
          // let emojis = args.slice(1)
          // if (!emojis) return message.inlineReply("Provide some emojis")
          // emojis.match(regex).forEach(m => {
          //   let emoji = client.emojis.cache.find((e) => e.name === m)
          //   console.log(emoji)
          // })

          // UserSchema.findOneAndUpdate({
          //   userID: user.id
          // }, {
          //     $set: {
          //       // emojis
          //     }
          //   })
          break;
        default:
          if (user.emojiCollection.size === 0 || user.emojiCollection === undefined) {
            return message.inlineReply(b("No tienes emojis en tu colleción. usa `!collection add <emoji>` para empezar tu colleción."))
          }
          break;
      }

    })

  }
}