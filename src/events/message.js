module.exports = (client, message) => {
    if(message.channel.type == 'dm') return;
    GuildSchema.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        if(err) {
            console.error(err);
        }
        console.log("Debug 1")

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
        console.log("x debug 1")
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        var cmd = client.commands.get(command) || client.commands.find((c) => c.alias && c.alias.includes(command));
        console.log("x debug 2")
        if(!cmd) return;
        console.log("x debug 3")
        let Cmd = new cmd(client);
        console.log("x debug 4")
        Cmd.processCommand(message);
        console.log("x debug 5")
    });
};