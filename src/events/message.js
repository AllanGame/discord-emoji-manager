const GuildSchema = require("../models/guild.js");
module.exports = (client, message) => {
  if (message.channel.type == 'dm') return;
  GuildSchema.findOne({
    guildID: message.guild.id
  }, (err, guild) => {
    if (err) {
      console.error(err);
    }

    if (!guild) {
      const newGuildSchema = new GuildSchema({
        guildID: message.guild.id,
        prefix: "!"
      });
      return newGuildSchema.save();
    }

    var prefix = guild.prefix;
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
      message.channel.send(`Prefix: \`${prefix}\``);
    }
    
    

    if (message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.split(" ").slice(1);

    const command = message.content.split(" ")[0].slice(prefix.length).toLowerCase();
    var cmd = client.commands.get(command) || client.commands.find((c) => c.aliases && c.aliases.includes(command));
    if (!cmd) return;
    cmd.processCommand(message, guild);
  });
};




 