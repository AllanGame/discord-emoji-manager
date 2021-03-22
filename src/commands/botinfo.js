const Discord = require("discord.js");
const CommandHandler = require('../lib/CommandHandler');

module.exports = class Command extends CommandHandler {
    constructor(client) {
        super(client, {
            name: "botinfo",
            description: "View the bot info",
            aliases: ["infobot", "bot-info"],
            usage: "botinfo",
            category: "misc",
            permissions: [],
            cooldown: 3
        });
    }

    run(message) {
        message.channel.send(fe(undefined, `
        <:developer:819222061796294656> Developed by: \`${require('../utils/misc.json').owners.id.map(x => client.users.cache.get(x).tag).join('`, `')}\`
        <:cooldown:818987759636447232> Created on: ${new Date(client.user.createdAt.toUTCString())}
        <:uncheck:818988060908847146> Shard Count: ${client.shard.count}
        `, 'AQUA', true, ["Emoter info", client.user.displayAvatarURL({dynamic: true})]));
    }
}
