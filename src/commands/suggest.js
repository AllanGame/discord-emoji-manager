module.exports = {
  name: "suggest",
  description: "Suggest new features for the bot",
  usage: "!suggest [suggest]",
  alias: ["sugerir"],
  onlyowner: false,
  onlydev: false,
  cooldown: 60,
  perms: [],
  /**
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   * @param {any} storage
   */
  run: (client, message, args, storage) => {

    let suggest = args.slice(0).join(" ")

    if (!suggest) {
      return message.inlineReply(
        storage.lang.commands.suggest.nosuggestprovided
      )
    }

    client.channels.cache.get("819241043932348497").send(
      new storage.Discord.MessageEmbed()
        .setTitle(
          storage.lang.commands.suggest.suggestionembed.title
        )
        .setDescription(
          storage.lang.commands.suggest.suggestionembed.description.replace("{suggest}", suggest)
        )
        .setFooter(
          storage.lang.commands.suggest.suggestionembed.footer.replace("{author}", message.author.tag + " | " + message.author.id)
        )
    ).then((m) => message.inlineReply(storage.lang.commands.suggest.succesfully))



  }
} 