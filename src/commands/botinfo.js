const Discord = require("discord.js");
module.exports = {
        name: "botinfo",
        description: "View the bot info",
        usage: "botinfo",
        alias: ["infobot", "bot-info"],
        onlyowner: false,
        onlydev: false,
        cooldown: 3,
        perms: [],
        /**
         * @param {Discord.Client} client
         * @param {Discord.Message} message
         * @param {String[]} args
         * @param {any} storage
         */
        run: (client, message, args, storage) => {
                message.channel.send(fe(undefined, `
                <:developer:819222061796294656> Developed by: \`${require('../utils/misc.json').owners.id.map(x => client.users.cache.get(x).tag).join('`, `')}\`
                <:cooldown:818987759636447232> Created on: ${new Date(client.user.createdAt.toUTCString())}
                <:uncheck:818988060908847146> Shard Count: ${client.shard.count}
                `, 'AQUA', true, ["Emoter info", client.user.displayAvatarURL({dynamic: true})]));
    }

}