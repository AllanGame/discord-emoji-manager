module.exports = {
    name: "add",
    usage: "add <name> <url || attachment>",
    alias: [],
    onlyowner: false,
    onlydev: false,
    cooldown: 3,
    perms: ["MANAGE_EMOJIS"],
    run: (client, message, args, storage) => {
        const Discord = require("discord.js");

        /**
         * TODO: Add multiple emojis support [arg 1 must be "these"] - .zip files support
         */

         if(!args[0]) return;

        let emojiName = args[0];
        let emojiURL = args[1];
        if(message.attachments.size > 0){
            emojiURL = message.attachments.first().url;
        } 

            if(!args[1] && message.attachments.size < 0) {
                emojiURL = args[0]
            }
            let emojiTarget = Discord.Util.parseEmoji(emojiURL)
                if(emojiTarget.id === null || emojiTarget.id === undefined) {
                    if(message.attachments.size < 0) {
                        return;
                    }
                    if(message.content.includes("https://cdn.discordapp.com")){
                        return;
                    }
                    if(message.attachments.first().url.includes("https://cdn.discordapp.com/")) {
                        return;
                    }
                    message.channel.send("`" + emojiURL + "`" + " isn't a valid emoji");
                    return;
                }
            if(emojiURL === args[0]) {
             emojiName = emojiTarget.name;       
            }

            let emojiExtention = ""
            if(emojiTarget.animated ? emojiExtention = ".gif" : emojiExtention = ".png");
                emojiURL = "https://cdn.discordapp.com/emojis/"+emojiTarget.id+emojiExtention+"?v=1";
 

        if(!emojiName) {
            return message.channel.send("Please provide a name")
        }
        if(!emojiURL) {
            return message.channel.send("Please provide a emoji, you can provide a URL, emojis from other servers or attach an image/gif")
        }


        message.channel.send(emojiURL)
        message.channel.send(emojiName)
        // message.guild.emojis.create(emojiURL, emojiName)


    }
};
