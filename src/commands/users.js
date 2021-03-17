const Discord = require("discord.js");
const Client = require("../lib/Client");
module.exports = {
  name: "users",
  description: "View bot users",
  usage: "users",
  alias: [],
  cooldown: 10,
  onlyowner: true,
  onlydev: false,
  perms: [],
  /**
   * @param {Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   * @param {any} storage
   */
  run: (client, message, args, storage) => { 
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