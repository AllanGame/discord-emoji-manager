module.exports = {
    name: "role",
    usage: "role <role> <emojis>",
    alias: ["setrole"],
    onlyowner: false,
    onlydev: false,
    cooldown: 3,
    perms: ["MANAGE_EMOJIS"],
    run: (client, message, args, storage) => {
        const Discord = require("discord.js");

        if (args[0] === "add") {
            let roleTarget = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
            let emojis = message.content.split(' ').slice(3);
            for (i = 0; i < emojis.length; i++) {
                let emojiTarget = Discord.Util.parseEmoji(emojis[i]);
                if (emojiTarget.id) {
                    if (client.emojis.cache.find(emoji => emoji.id === emojiTarget.id) === undefined) {
                        message.channel.send('that emoji isnt from this guild!')
                        return;
                    }
                }

                if (args[1] === "everyone" ? roleTarget = [] : roleTarget = [roleTarget])
                    message.guild.emojis.cache.get(emojiTarget.id).roles.set(roleTarget).then((r => {
                        if (args[1] === "everyone") {
                            message.channel.send(`Perfect! now all users can use the next emojis: ${emojis}`)
                        } else {
                            message.channel.send(`Perfect! now only users with ${roleTarget} can use the next emojis: ${emojis}`)
                        }
                    }))

            }

        }

    }
};
