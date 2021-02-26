module.exports = {
    name: "add",
    usage: "add <name> <url || attachment>",
    alias: ["agregar"],
    onlyowner: false,
    onlydev: false,
    cooldown: 3,
    perms: ["MANAGE_EMOJIS"],
    run: (client, message, args, storage) => {
        const Discord = require("discord.js");

        /**
         * TODO: Add multiple emojis support [arg 1 must be "these"] - .zip files support
         */


        /**
         * COMMANDS: 
         * !add <emoji> PLURAL: !add these <emojis>
         * !add <name> <url> if there isnt name, return
         * !add <name> ATTACHMENT if there isnt name, return
         */



         
        // Adding multiple emojis
        // !add these <emoji list>
        if(args[0] === "these") {
            let emojis = args.slice(1)
            let msg = []
            if(!args[1]) {
                return message.channel.send('Please provide emojis to add!')
            }

            for(i=0; i<emojis.length; i++) {
                let emoji = Discord.Util.parseEmoji(emojis[i]);
                if(emoji.id === undefined || emoji.id === null) {
                    message.channel.send("`" + emojis[i] + "` Isn't a valid emoji!")
                    break;
                }
                let emojiURL; 
                let emojiExtention = ""
                emoji.animated ? emojiExtention = ".gif" : emojiExtention = ".png"
                emojiURL = "https://cdn.discordapp.com/emojis/"+emoji.id+emojiExtention+"?v=1";
                message.guild.emojis.create(emojiURL, emoji.name)
                .then(emoji => message.channel.send("Added: "+ emoji.toString()))
                .catch(error => {
                    if(error.code === 30008) {
                        message.channel.send(error.message)
                    }
                });                

            }
            return;
        }
         // !add :emoji:
         if(!args[2]) {
             let emojiName;
             let emojiURL; 
             let emojiExtention = "";
             if(!args[0]) {
                 return message.channel.send('Please provide an emoji!');
             }
             let emoji = Discord.Util.parseEmoji(args[0]);
             if(emoji.id === undefined || emoji.id === null) {
                 return message.channel.send("Invalid emoji! \n" + "emoji id: "+ emoji.id);
             }
             if(args[1] && message.embeds.length <= 0) {
                 emojiName = args[1];
             } else {
                 emojiName = emoji.name;
             }

            emoji.animated ? emojiExtention = ".gif" : emojiExtention = ".png";
            emojiURL = "https://cdn.discordapp.com/emojis/"+emoji.id+emojiExtention+"?v=1";

            message.guild.emojis.create(emojiURL, emojiName)
            .then(emoji => message.channel.send("Added: "+ emoji.toString()))
            .catch(error => {
                if(error.code === 30008) {
                    message.channel.send(error.message)
                }
            });   
            return;
          } 

        //  if(!args[0]) return;

        // let emojiName = args[0];
        // let emojiURL = args[1];
        // if(message.attachments.size > 0){
        //     emojiURL = message.attachments.first().url;
        // } 

        //     if(!args[1] && message.attachments.size < 0) {
        //         emojiURL = args[0]
        //     }
        //     let emojiTarget = Discord.Util.parseEmoji(emojiURL)
        //         if(emojiTarget.id === null || emojiTarget.id === undefined) {
        //             if(message.attachments.size < 0) {
        //                 return;
        //             }
        //             if(message.content.includes("https://cdn.discordapp.com")){
        //                 return;
        //             }
        //             if(message.attachments.first().url.includes("https://cdn.discordapp.com/")) {
        //                 return;
        //             }
        //             message.channel.send("`" + emojiURL + "`" + " isn't a valid emoji");
        //             return;
        //         }
        //     if(emojiURL === args[0]) {
        //      emojiName = emojiTarget.name;       
        //     }

        //     let emojiExtention = ""
        //     if(emojiTarget.animated ? emojiExtention = ".gif" : emojiExtention = ".png");
        //         emojiURL = "https://cdn.discordapp.com/emojis/"+emojiTarget.id+emojiExtention+"?v=1";
 

        // if(!emojiName) {
        //     return message.channel.send("Please provide a name")
        // }
        // if(!emojiURL) {
        //     return message.channel.send("Please provide a emoji, you can provide a URL, emojis from other servers or attach an image/gif")
        // }


        // message.channel.send(emojiURL)
        // message.channel.send(emojiName)
        // // message.guild.emojis.create(emojiURL, emojiName)


    }
};
