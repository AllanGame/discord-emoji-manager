const Discord = require('discord.js')
const CommandHandler = require('../lib/CommandHandler');

module.exports = class Command extends CommandHandler {
    constructor(client) {
        super(client, {
            name: "config",
            description: "configurate some stuff",
            aliases: [],
            usage: "config <set | remove | edit> <property> <new value>",
            category: "utils",
            permissions: ["MANAGE_SERVER"],
            cooldown: 10
        });
    }

    run(message, args) {
        const GuildSchema = require("../models/guild.js");
        switch(args[0]) {
            case "set":
                switch(args[1]) {
                    case "guild.config.useEmojiFromLibrary":
                    if(args[2] === "true") {
                        GuildSchema.findOne({
                            guildID: message.guild.id
                        }, (err, guild) => {
                            if(err) {
                                return console.log(err)
                            }
                            if(!guild) {
                                return message.inlineReply("Something went wrong, please try again")
                            }
                            GuildSchema.findOneAndUpdate({
                                guildID: message.guild.id
                            }, {
                                $set: {
                                    config: {
                                        useEmojiFromLibrary: true
                                    }
                                }
                            }, {
                                new: true
                            }).then(() => {
                                
                            })
                            .catch((err) => {
                                message.inlineReply("Something went wrong")
                                console.log(err)
                            })
                        })
                    } 
                    break;
                }
            break;
        }

    }
}