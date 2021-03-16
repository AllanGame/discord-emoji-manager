const Discord = require("discord.js");
module.exports = {
  name: "role",
  description: "Set roles for an emoji to deny access to everyone/other roles",
  usage: "role <role> <emojis>",
  alias: ["setrole"],
  onlyowner: false,
  onlydev: false,
  cooldown: 3,
  perms: ["MANAGE_EMOJIS"],
  /**
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   * @param {any} storage
   */
  run: (client, message, args, storage) => {

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
          if (client.emojis.cache.find((emoji) => emoji.id === emojiTarget.id) === undefined) {
            return message.channel.send(b("that emoji isnt from this guild!"));
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
                message.channel.send(b(`Perfect! now all users can use the next emojis: ${emojis}`));
              } else {
                message.channel.send(b(`Perfect! now only users with ${roleTarget} can use the next emojis: ${emojis}`));
              }
            });
        }
      }
    }
  },
};