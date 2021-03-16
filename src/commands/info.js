const Discord = require('discord.js');
module.exports = {
    name: "info",
    description: "Get the info of a emoji",
    usage: "info <emoji>",
    alias: ["emoji-info"],
    onlyowner: false,
    onlydev: false,
    cooldown: 2,
    perms: [],
    /**
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {String[]} args
     * @param {any} storage
     */
    run: (client, message, args, storage) => {
        const has = /<a?:.+:\d+>/gm;
        if (!args[0]) return message.reply(b("<:error:819654964628160527> Put the emoji or emoji id to get the data"));
        let emoji = args[0];
        const ranges = [
            '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
            '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
            '\ud83d[\ude80-\udeff]', // U+1F680 to U+1F6FF
            ' ',
        ].join('|');
        const sc = s => s.replace(new RegExp(ranges, 'g'), '');
        if (!sc(emoji).length) return message.channel.send(b("<:error:819654964628160527> The emoji you just inserted is a unicode emoji, currently I don't support these emojis, but soon I will!"));
        if (!has.test(emoji) && !client.emojis.cache.has(emoji)) return message.channel.send(b("<:error:819654964628160527> Invalid emoji."));

        const embed = new Discord.MessageEmbed()
            .setColor(message.member.displayHexColor === "#000000" ? 'RANDOM' : message.member.displayHexColor)
            .setTimestamp(Date.now())
            .setFooter(message.author.username, message.author.displayAvatarURL({
                dynamic: true
            }));

        let id = emoji.includes("<") ? emoji.replace("<", "").replace(">", "").split(":")[2] : emoji;
        if (!client.emojis.cache.has(id)) return message.channel.send(b("<:error:819654964628160527> This emoji does not exists"));
        let e = client.emojis.cache.get(id);

        embed.setAuthor("Emoji: " + e.name, "https://cdn.discordapp.com/emojis/818987710693900329.png?v=1")
        let roles = [];
        e.roles.cache.forEach(r => {
            roles.push("<@&" + r.id + ">");
        });

        embed.setDescription(`
        🆔 **ID**: \`${e.id}\`
        
        <:gif:818988133269372960> **Animated**: \`${e.animated ? 'Yes' : 'No'}\`
        <:discord_logo:818990574979514388> **Guild**: \`${e.guild.name}\`
        <:role:818987653118689360> **Roles that can use this emoji**: ${roles.length < 1 ? '@everyone' : roles.join(", ")}
        `)
            .setThumbnail(e.url);
        message.channel.send(embed);
    }
}