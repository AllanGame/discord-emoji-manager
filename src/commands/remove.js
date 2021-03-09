module.exports = {
    name: "remove",
    usage: "remove <emoji>",
    alias: [],
    onlyowner: false,
    onlydev: false,
    cooldown: 3,
    perms: ["MANAGE_EMOJIS"],
    run: (client, message, args, storage) => {

        /**
         * COMMENT: This code sucks, but works 👍
         */

        const Discord = require("discord.js");

        
        if(!args[0]) {
            return message.channel.send(b("Provide an emoji to remove"))
        }

        let reason = args[1];
        let emojiTarget;

        if(!reason) {
            reason = "removed by " + message.author.tag + " without reason"
        }

        let emojiID = message.guild.emojis.cache.get(args[0]);
        if(emojiID !== undefined) {
            emojiTarget = emojiID;
            emojiTarget.delete(reason).then(r => {
                message.channel.send(b(`The emoji was succesfully deleted with the reason \`${reason}\``))
            })
            return;
        }

        let emojiName = message.guild.emojis.cache.find(e => e.name === args[0]);
        if(emojiName !== undefined) {
            emojiTarget = emojiName;
            emojiTarget.delete(reason).then(r => {
                message.channel.send(b(`The emoji was succesfully deleted with the reason \`${reason}\``))
            })
            return;
        }
        let parseEmoji = Discord.Util.parseEmoji(args[0]);
        if(parseEmoji.id !== undefined || parseEmoji.id !== null) {

          if (client.emojis.cache.find((emoji) => emoji.id === parseEmoji.id) === undefined) {
            return message.channel.send(b("that emoji isnt from this guild!"));
          }

            emojiTarget = message.guild.emojis.cache.get(parseEmoji.id);
            
            emojiTarget.delete(reason).then(r => {
                message.channel.send(b(`The emoji was succesfully deleted with the reason \`${reason}\``))
            })
            
            
        } else {
            return message.channel.send(b("Invalid emoji"))
        }

    }
};
