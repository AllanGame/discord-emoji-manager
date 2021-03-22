const Discord = require("discord.js");
const Client = require("../lib/Client");
const CommandHandler = require('../lib/CommandHandler');

module.exports = class Command extends CommandHandler {
    constructor(client) {
        super(client, {
            name: "users",
            description: "View bot users",
            aliases: [],
            usage: "users",
            category: "owner",
            onlyowner: true,
            permissions: [],
            cooldown: 10
        });
    }

    run(message, args) {
      const limit = 2000;
      let userlist = [];
      for(let user of client.users.cache.values()){
          userlist.push("`"+user.username+ "#" + user.discriminator + "`");
      }
  
      users = userlist.join(",  ");
  
      let usersEmbed = new Discord.MessageEmbed();
      usersEmbed.setTitle('Bot Users');
      usersEmbed.setDescription(users);
      if(users.length > limit) {
        console.log(users);
        let newLimit = users.slice(0, limit);
        usersEmbed.setDescription(newLimit);
        usersEmbed.setFooter("Check console for full list");
      }
  
      message.inlineReply(usersEmbed);
    }
}