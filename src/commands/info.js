const Discord = require('discord.js');
module.exports = {
    name: "info",
    usage: "info <emoji>",
    onlyowner: false,
    onlydev: false,
    cooldown: 2,
    perms: [],
    /**
     *
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {String[]} args
     * @param {any} storage
     */
    run: (client, message, args, storage) => {
        const has = /<a?:.+:\d+>/gm;
        const anim = /<a:.+:(\d+)>/gm;

        if (!args[0]) return message.reply(b("put the emoji or emoji id to get the data"));
        let emoji = args[0];
        if (!has.test(emoji) && !client.emojis.cache.has(emoji)) return message.channel.send(b("Invalid emoji."));

        const embed = new Discord.MessageEmbed()
            .setColor(message.member.displayHexColor === "#000000" ? 'RANDOM' : message.member.displayHexColor)
            .setTimestamp(Date.now())
            .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}));

        let id = emoji.includes("<") ? emoji.replace("<", "").replace(">", "").split(":")[2] : emoji;
        if (!client.emojis.cache.has(id)) return message.channel.send(b("This emoji does not exists"));
        let e = client.emojis.cache.get(id);

        embed.setAuthor("Emoji: " + e.name, e.url)
        let roles = [];
        e.roles.cache.forEach(r => {
            roles.push("<@&" + r.id + ">");
        });

        embed.setDescription(`
        **ID**: \`${e.id}\`
        **<:gif:818988133269372960> Animated**: \`${e.animated ? 'Yes' : 'No'}\`
        **Guild**: \`${e.guild.name}\`
        **<:role:818987653118689360> Roles that can use this emoji**: ${roles.length < 1 ? '@everyone' : roles.join(", ")}
        `)
            .setThumbnail(e.url);
        message.channel.send(embed);
    }
}