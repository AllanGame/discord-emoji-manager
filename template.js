const CommandHandler = require('../lib/CommandHandler');

module.exports = class Command extends CommandHandler {
    constructor(client) {
        super(client, {
            name: "",
            description: "",
            aliases: [],
            usage: "",
            category: "",
            permissions: [],
            cooldown: 0
        });
    }

    run(message, args) {

    }
}