let C = require('./Client');
let S = {
    name: ''
}
module.exports = class CommandHandler {
    /**
     * Command handler maded by **iAtog**
     * @param {C} client 
     * @param {S} options 
     */
    constructor(client, options) {
        this.client = client;
        this.options = options;
    }

    run(message, args) {
        throw new Error("run method is not defined");
    }

    processCommand(message) {
        const client = this.client;
    var Discord = require("discord.js");
    var GuildSchema = require("../models/guild.js");
    var UserSchema = require("../models/user.js");
    let misc = require('../utils/misc.json')

    UserSchema.findOne({
        userID: message.author.id
    }, (err, user) => {
        if(err) {
            console.error(err);
        }

        if(!user) {
            const newUserSchema = new UserSchema({
                userID: message.author.id,
                lang: "lang_en",
                blacklisted: false,
                dev: false
            });
            return newUserSchema.save();
        }
        var lang = require(`../langs/${user.lang}.json`);

        var blacklistedEmbed = new Discord.MessageEmbed()
            .setTitle(lang.embed.titleerror)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(lang.embed.blacklisted)
            .setColor("RED")
            .setFooter(lang.embed.footer)
            .setTimestamp();

            var errorEmbed = new Discord.MessageEmbed()
            .setTitle("An error has occurred")
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription("A code error has occurred, our developers have been informed, please wait for it to be resolved, if not, contact the developers and they will give you an answer why this error has not been fixed/nothing was done.")
            .setColor("RED")
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setTimestamp();

            if(user.blacklisted) {
                message.channel.send(blacklistedEmbed).then((msg) => {
                    msg.delete({ timeout: 10000 });
                    return;
                });
                return;
            }
    
    
            if(cmd.onlyowner) {
                if(!misc.owners.id.includes(message.author.id)) {
                    message.channel.send(lang.command.onlydev);
                    return;
                }
            }
    
            if(cmd.onlydev) {
                if(!user.dev) {
                    message.channel.send(lang.command.onlydev);
                    return;
                }
            }
            if(!message.member.permissions.has(cmd.perms)) {
                message.channel.send(b("You don't have the sufficient permissions to execute this command."));
                return;
            }

            var storage = {
                misc,
                guild,
                user,
                lang,
                prefix,
                errorEmbed,
                GuildSchema,
                UserSchema,
                Discord,
                owners: require('../utils/misc.json').owners
            };
    
            const cmdCooldown = Math.floor(cmd.cooldown * 1000);
            const endCooldown = Math.floor(Date.now() + cmdCooldown);
    
            if(!client.cooldowns.has(`${message.author.id}.${cmd.name}`)) {
                client.cooldowns.set(`${message.author.id}.${cmd.name}`, 0);
            }
    
            const userCooldown = client.cooldowns.get(`${message.author.id}.${cmd.name}`);
    
            if(Date.now() < userCooldown) {
                let restCooldown = userCooldown - Date.now();
                let seconds = Math.floor(restCooldown / 1000);
                let cooldownMessage = lang.command.cooldown.replace("{command}", cmd.name).replace("{seconds}", seconds);
                message.channel.send(cooldownMessage).then((msg) => {
                    msg.delete({timeout: restCooldown});
                });
                return;
            }
            else {
                try {
                    this.run(message, args, storage);
                    client.cooldowns.set(`${message.author.id}.${cmd.name}`, endCooldown);
                } catch(err) {
                    message.channel.send(errorEmbed);
                    console.error(err);
                    client.channels.resolve("820045148254765116").send(`error \`${cmd.name}\`. for more information check console.\n` + "```js\n" + err + "```");
                }
            }
        
    });
    }
}