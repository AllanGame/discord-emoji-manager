const Discord = require("discord.js");
module.exports = {
    name: "edit",
    usage: "edit emoji",
    alias: ["editar"],
    onlyowner: false,
    onlydev: false,
    cooldown: 10,
    perms: ["MANAGE_EMOJIS"],
    run: (client, message, args, storage) => { 


        let emojiTarget = Discord.Util.parseEmoji(args[0]);
        let newName = args[1];

        if(!emojiTarget) {
            return message.channel.send(b('Provide an emoji to edit.'));
        }
        if(!newName) {
            return message.channel.send(b('Provide a new name for this emoji.'));
        }
        
        if(emojiTarget.id === undefined || emojiTarget.id === null) {
           if(message.guild.emojis.cache.find(e => e.name === args[0]) !== null || 
              message.guild.emojis.cache.find(e => e.name === args[0]) !== undefined) {
                emojiTarget = message.guild.emojis.cache.find(e => e.name === args[0]);
              } else {
                  return message.channel.send(b('Invalid emoji!'));
              }
        } else {
            emojiTarget = message.guild.emojis.cache.find(e => e.id === emojiTarget.id);
        }

        emojiTarget.edit({ name: newName }).then(
            message.channel.send(b(`Emoji ${emojiTarget} has been updated \n New name: ${newName}`))
            )

    }
}