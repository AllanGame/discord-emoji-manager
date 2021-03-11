const Discord = require("discord.js");
module.exports = {
    name: "edit",
    usage: "edit emoji",
    alias: ["editar"],
    onlyowner: false,
    onlydev: false,
    cooldown: 5,
    perms: ["MANAGE_EMOJIS"],
    /**
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {String[]} args
     * @param {any} storage
     */
    run: (client, message, args, storage) => { 


        let emojiTarget = Discord.Util.parseEmoji(args[0]);
        let newName = args[1];

        if(!emojiTarget) {
            return message.channel.send(b('<:error:819654964628160527> Provide an emoji to edit.'));
        }
        if(!newName) {
            return message.channel.send(b('<:error:819654964628160527> Provide a new name for this emoji.'));
        }
        
        if(emojiTarget.id === undefined || emojiTarget.id === null) {
           if(message.guild.emojis.cache.find(e => e.name === args[0]) !== null || 
              message.guild.emojis.cache.find(e => e.name === args[0]) !== undefined) {
                emojiTarget = message.guild.emojis.cache.find(e => e.name === args[0]);
              } else {
                  return message.channel.send(b('<:error:819654964628160527> Invalid emoji!'));
              }
        } else {
            emojiTarget = message.guild.emojis.cache.find(e => e.id === emojiTarget.id);
        }

        let previousName = emojiTarget.name;

        if(!/^[a-zA-Z0-9]*$/.test(newName)){
            return message.channel.send(b("<:error:819654964628160527> Invalid name!"))
        }

        emojiTarget.edit({ name: newName }).then(e => {
            message.channel.send(new Discord.MessageEmbed() 
            .setTitle(`<:emojiUpdated:819655186325831682> Emoji Updated`)
            .setDescription(
                `**Emoji**: ${e}` +
                `\n\n` +
                `**Changes**:` +
                "\nPrevious name: `" + previousName + "`" +
                "\n New name: `" + e.name + "`"
                )
            .setColor(`RANDOM`))
            })

    }
}