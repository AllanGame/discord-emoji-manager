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

    processCommand(message, guild) {
    var Discord = require("discord.js");
    var GuildSchema = require("../models/guild.js");
    var UserSchema = require("../models/user.js");
    let misc = require('../utils/misc.json');
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
    
    
            if(this.options.onlyowner) {
                if(!misc.owners.id.includes(message.author.id)) {
                    message.channel.send(lang.command.onlydev);
                    return;
                }
            }
    
            if(this.options.onlydev) {
                if(!user.dev) {
                    message.channel.send(lang.command.onlydev);
                    return;
                }
            }
            if(!message.member.permissions.has(this.options.permissions)) {
                message.channel.send(b("You don't have the sufficient permissions to execute this command."));
                return;
            }

            this.storage = {
                misc,
                guild,
                user,
                lang,
                prefix: guild.prefix,
                errorEmbed,
                GuildSchema,
                UserSchema,
                Discord,
                owners: require('../utils/misc.json').owners
            };
            const args = message.content.slice(guild.prefix.length).trim().split(/ +/g).slice(1);
            const cmdCooldown = Math.floor(!this.options.cooldown ? 1 : this.options.cooldown * 1000);
            const endCooldown = Math.floor(Date.now() + cmdCooldown);
    
            if(!this.client.cooldowns.has(`${message.author.id}.${this.options.name}`)) {
                this.client.cooldowns.set(`${message.author.id}.${this.options.name}`, 0);
            }
    
            const userCooldown = this.client.cooldowns.get(`${message.author.id}.${this.options.name}`);
    
            if(Date.now() < userCooldown) {
                let restCooldown = userCooldown - Date.now();
                let seconds = Math.floor(restCooldown / 1000);
                let cooldownMessage = lang.command.cooldown.replace("{command}", this.options.name).replace("{seconds}", seconds);
                message.channel.send(cooldownMessage).then((msg) => {
                    msg.delete({timeout: restCooldown});
                });
                return;
            }
            else {
                try {
                    this.run(message, args);
                    this.client.cooldowns.set(`${message.author.id}.${this.options.name}`, endCooldown);
                } catch(err) {
                    message.channel.send(errorEmbed);
                    console.error(err);
                    this.client.channels.resolve("820045148254765116").send(`error \`${this.options.name}\`. for more information check console.\n` + "```js\n" + err + "```");
                }
            }
        
    });
    }
}