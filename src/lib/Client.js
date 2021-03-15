const Discord = require('discord.js');
const SC = require('./slashCommands');

module.exports = class EmoterClient extends Discord.Client {
    constructor(options) {
        super(options);
        this.commands = new Discord.Collection();
        this.cooldowns = new Discord.Collection();
    }

    getSlashCommandsManager() {
        return new SC(this);
    }

    setupTest(guild) {
        this.api.applications(this.user.id).guilds(guild).commands.post({
            data: {
                name: "random-emoji",
                description: "Get a random emoji"
            }
        });

    }
}