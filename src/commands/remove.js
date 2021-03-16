const Discord = require("discord.js");
module.exports = {
    name: "remove",
    description: "Remove a emoji",
    usage: "remove <emoji>",
    alias: [],
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
         * COMMENT: This code sucks, but works 👍
         */

        if (!args[0]) {
            return message.channel.send(b("<:error:819654964628160527> Provide an emoji to remove"))
        }

        let reason = args[1];
        let emojiTarget;

        if (!reason) reason = "removed by " + message.author.tag + " without reason"

        let emojiID = message.guild.emojis.cache.get(args[0]);
        if (emojiID !== undefined) {
            emojiTarget = emojiID;
            emojiTarget.delete(reason).then(r => {
                message.channel.send(b(`<:emojiRemoved:819232995213836358> The emoji \`${r.name}\` was succesfully deleted with the reason \`${reason}\``))
            })
            return;
        }

        let emojiName = message.guild.emojis.cache.find(e => e.name === args[0]);
        if (emojiName !== undefined) {
            emojiTarget = emojiName;
            emojiTarget.delete(reason).then(r => {
                message.channel.send(b(`<:emojiRemoved:819232995213836358> The emoji \`${r.name}\` was succesfully deleted with the reason \`${reason}\``))
            })
            return;
        }
        let parseEmoji = Discord.Util.parseEmoji(args[0]);
        if (parseEmoji.id !== undefined || parseEmoji.id !== null) {

            if (client.emojis.cache.find((emoji) => emoji.id === parseEmoji.id) === undefined) {
                return message.channel.send(b("<:error:819654964628160527> That emoji isnt from this guild!"));
            }

            emojiTarget = message.guild.emojis.cache.get(parseEmoji.id);

            emojiTarget.delete(reason).then(r => {
                message.channel.send(b(`<:emojiRemoved:819232995213836358> The emoji \`${r.name}\` was succesfully deleted with the reason \`${reason}\``))
            })


        } else {
            return message.channel.send(b("<:error:819654964628160527> Invalid emoji"))
        }

    }
};