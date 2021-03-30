const Discord = require("discord.js");
const CommandHandler = require('../lib/CommandHandler');

module.exports = class Command extends CommandHandler {
    constructor(client) {
        super(client, {
            name: "role",
            description: "Set roles for an emoji to deny access to everyone/other roles",
            aliases: ["setrole"],
            usage: "role <role> <emojis>",
            category: "emojis",
            permissions: ["MANAGE_EMOJIS"],
            cooldown: 3
        });
    }

    run(message, args) {
      /**
     * TODO: remove roles 
     */



    // !role add <role> <emojis>
    if (args[0] === "add") {
      let roleTarget = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
      let emojis = message.content.split(" ").slice(3);

      for (i = 0; i < emojis.length; i++) {
        let emojiTarget = Discord.Util.parseEmoji(emojis[i]);

        if (emojiTarget.id) {
          if (client.emojis.cache.find((emoji) => emoji.id === emojiTarget.id) === "undefined") {
            return message.inlineReply(b("that emoji isnt from this guild!"));
          }
        }

        // role add <everyoneRole> <emojis>
        // so that everyone can use the emojis, discord needs an empty array
        // message.guild.emojis.cache.get(role).roles.set([]) => empty array
        if (args[1] === "everyone" ? (roleTarget = []) : (roleTarget = [roleTarget])) {
          message.guild.emojis.cache
            .get(emojiTarget.id)
            .roles.set(roleTarget)
            .then((r) => {
              if (args[1] === "everyone") {
                message.inlineReply(b(`Perfect! now all users can use the next emojis: ${emojis}`));
              } else {
                message.inlineReply(b(`Perfect! now only users with ${roleTarget} can use the next emojis: ${emojis}`));
              }
            });
        }
      }
    }
    }
}