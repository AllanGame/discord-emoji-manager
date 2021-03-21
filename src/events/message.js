const GuildSchema = require("../models/guild.js");
module.exports = (client, message) => {
    if(message.channel.type == 'dm') return;
    GuildSchema.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        if(err) {
            console.error(err);
        }

        if(!guild) {
            const newGuildSchema = new GuildSchema({
                guildID: message.guild.id,
                prefix: "!"
            });
            return newGuildSchema.save();
        }

        var prefix = guild.prefix;
        if(message.author.bot || !message.content.startsWith(prefix)) return;
        if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
            message.channel.send(`Prefix: \`${prefix}\``);
        }
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        var cmd = client.commands.get(command) || client.commands.find((c) => c.alias && c.alias.includes(command));
        if(!cmd) return;
        let Cmd = new cmd(client);
        Cmd.processCommand(message, guild);
    });
};