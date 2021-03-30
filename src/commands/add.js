const Discord = require("discord.js");
const CommandHandler = require('../lib/CommandHandler');

module.exports = class Command extends CommandHandler {
    constructor(client) {
        super(client, {
            name: "add",
            description: "Add an emoji to your server",
            aliases: ["agregar"],
            usage: "add <name> <url || attachment>",
            category: "emojis",
            permissions: ["MANAGE_EMOJIS"],
            cooldown: 10
        });
    }

    run(message, args) {
        
        
        /**
         * TODO: .zip files support
         */

        // Adding multiple emojis
        // !add these <emoji list>
        if(args[0] === "these") {
            let emojis = args.slice(1);
            let msg = [];
            if(!args[1]) {
                return message.inlineReply(b('Please provide emojis to add!'));
            }

            for(i=0; i<emojis.length; i++) {
                let emoji = Discord.Util.parseEmoji(emojis[i]);
                if(emoji.id === undefined || emoji.id === null) {
                    message.inlineReply(b("`" + emojis[i] + "` Isn't a valid emoji!"));
                    break;
                }
                let emojiURL; 
                let emojiExtention = "";
                emoji.animated ? emojiExtention = ".gif" : emojiExtention = ".png";
                emojiURL = "https://cdn.discordapp.com/emojis/"+emoji.id+emojiExtention+"?v=1";

                message.guild.emojis.create(emojiURL, emoji.name)
                .then(emoji => message.inlineReply("<:emojiAdded:819655097017172009> Added: "+ emoji.toString()))
                .catch(error => {
                    if(error.code === 30008) {
                        message.inlineReply(error.message);
                    }
                });                

            }
            return;
        }
         // !add :emoji:
         if(!args[1]) {
             let emojiName;
             let emojiURL; 
             let emojiExtention = "";
             let emojiIsAttachment = false;
             if(!args[0]) {
                 return message.inlineReply(b('Please provide an emoji!'));
             }
             let emoji = Discord.Util.parseEmoji(args[0]);
             if(emoji.id === undefined || emoji.id === null) {
                 if(message.attachments.size > 0) {
                     emojiURL = message.attachments.values().next().value.url;
                     emojiIsAttachment = true;
                 } else {
                    message.inlineReply(b("Invalid emoji!"));
                 }
             }

             if(emojiIsAttachment) {
                emojiName = args[0];
                emojiIsAttachment = false;
             } else {
                emoji.animated ? emojiExtention = ".gif" : emojiExtention = ".png";
                emojiURL = "https://cdn.discordapp.com/emojis/"+emoji.id+emojiExtention+"?v=1";
                emojiName = emoji.name;
             }
            message.guild.emojis.create(emojiURL, emojiName)
            .then(emoji => message.channel.send("<:emojiAdded:819655097017172009> Added: "+ emoji.toString()))
            .catch(error => {
                console.log(error)
                if(error.code === 30008) {
                    message.inlineReply(b(error.message));
                }
            });   
            return;
          } 


         if(message.embeds[0] !== undefined) {

             let emojiURL = message.embeds[0].url;
             let emojiName = args[0];

             if(!/^[a-zA-Z0-9]*$/.test(emojiName)){
                return message.inlineReply(b("<:error:819654964628160527> Invalid name!"));
            }
             message.guild.emojis.create(emojiURL, emojiName)
                 .then(emoji => message.channel.send(b("<:emojiAdded:819655097017172009> Added: "+ emoji.toString())))
                 .catch(error => {
                     console.log(error)
                     if(error.code === 30008) {
                         message.channel.send(b("<:error:819654964628160527> " +error.message));
                     }
                     if(error.code === 50035) {
                         message.channel.send(b("<:error:819654964628160527> "+ error.message));
                     }
                 });
         }
    }
}