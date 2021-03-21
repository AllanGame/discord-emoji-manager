const CommandHandler = require('../lib/CommandHandler');

module.exports = class Test extends CommandHandler {
    constructor(client) {
        super(client, {
            name: "test",
            description: "Yes!",
            aliases: ["prueba"],
            category: "null",
            permissions: []
        });
    }

    run(message, args) {
        message.channel.send("Si.");
    }
}