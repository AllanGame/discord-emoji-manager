const Discord = require("discord.js");
const CommandHandler = require("../lib/CommandHandler");

module.exports = class Command extends CommandHandler {
  constructor(client) {
    super(client, {
      name: "collection",
      description: "Manage your emoji collection",
      aliases: ["mycollection"],
      usage: "collection <add | remove> ",
      category: "emojis",
      permissions: [],
      cooldown: 2,
    });
  }

  run(message, args) {

    function noEmojisProvided() {
      message.inlineReply(b("Please provide some emojis"))
    }

    const ALLOWED_OPTIONS = [
      "add",
      "remove",
      "has",
    ]

    let regex = new RegExp(/[^<]{0,1}:(\w{2,32}):(?!\d{18}>)/g);
    if (args[0]) {
      let emojis = args.slice(1);
      if (emojis.length < 1 && ALLOWED_OPTIONS.includes(args[0])) return noEmojisProvided()
    }
    const user = this.storage.user



    switch (args[0]) {
      case "add":
        // add emojis to the collection


        emojis
          .join("")
          .match(regex)
          .forEach(async (m) => {

            let emoji = this.client.emojis.cache.find(
              (e) => e.name === m.replace(/:/gm, "")
            );
            user.emojiCollection.set(emoji.name, emoji);
          });
        user.save();

        break;

      case "remove":
        // remove emojis from the collection

        if (args[1] === "all") {
          user.emojiCollection.clear();
          user.save();
          return;
        }



        emojis
          .join("")
          .match(regex)
          .forEach(async (m) => {
            let emoji = this.client.emojis.cache.find(
              (e) => e.name === m.replace(/:/gm, "")
            );
            user.emojiCollection.delete(emoji.name);
          });
        user.save();

        break;

      case "has":
        // check if the collection has an especific emoji
        let requestedEmoji = args[1].replace(/:/gm, "");
        if (user.emojiCollection.has(requestedEmoji)) {
          message.inlineReply(b(`\`${requestedEmoji}\` is in your col
          lection! ${user.emojiCollection.get(requestedEmoji)}`))
        } else {
          message.inlineReply(b(`\`${requestedEmoji}\` isnt at your collection, but you can search it in our library with the command \`${this.storage.prefix}library search ${requestedEmoji}\``))
        }

        break;
      default:
        if (
          user.emojiCollection === undefined ||
          user.emojiCollection.size === 0
        ) {
          return message.inlineReply(
            b(
              "No tienes emojis en tu colección. usa `!collection add <emoji>` para empezar tu colleción."
            )
          );
        }

        let userEmojis = [];
        for (let x of user.emojiCollection.entries()) {
          userEmojis.push("`" + x[0] + "`: " + x[1]);
        }
        let embed = new Discord.MessageEmbed()
          .setTitle(`${message.author.username}'s Collection`)
          .setDescription(userEmojis.join("\n"));
        message.channel.send(embed);

        break;
    }
  }
};
