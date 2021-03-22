const CommandHandler = require('../lib/CommandHandler');

module.exports = class Command extends CommandHandler {
    constructor(client) {
        super(client, {
            name: "suggest",
            description: "Suggest new features for the bot",
            aliases: ["sugerir"],
            usage: "suggest [suggestion]",
            category: "support",
            permissions: [],
            cooldown: 120
        });
    }

    run(message, args) {
      let suggest = args.slice(0).join(" ")

    if (!suggest) {
      return message.inlineReply(
        storage.lang.commands.suggest.nosuggestprovided
      )
    }

    client.channels.cache.get("819241043932348497").send(
      new storage.Discord.MessageEmbed()
        .setTitle(
          this.storage.lang.commands.suggest.suggestionembed.title
        )
        .setDescription(
          this.storage.lang.commands.suggest.suggestionembed.description.replace("{suggest}", suggest)
        )
        .setFooter(
          this.storage.lang.commands.suggest.suggestionembed.footer.replace("{author}", message.author.tag + " | " + message.author.id)
        )
    ).then((m) => message.inlineReply(this.storage.lang.commands.suggest.succesfully))

    }
}