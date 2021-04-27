const Discord = require('discord.js');
const CommandHandler = require('../lib/CommandHandler');

module.exports = class Command extends CommandHandler {
    constructor(client) {
        super(client, {
            name: "info",
            description: "Get the info of a emoji",
            aliases: ["emoji-info"],
            usage: "info <emoji>",
            category: "emojis",
            permissions: [],
            cooldown: 2
        });
    }

    run(message, args) {
        let client = this.client;
        const has = /<a?:.+:\d+>/gm;
        if (!args[0]) {
             return message.inlineReply(b("<:error:819654964628160527> Put the emoji or emoji id to get the data"));
        }
        let emoji = args[0];
        const emoji_regex = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;
        if (emoji_regex.test(emoji)) return message.channel.send(b("<:error:819654964628160527> The emoji you just inserted is a unicode emoji 😔, currently I don't support these emojis 😥, but soon I will! 😏"));

        if (!has.test(emoji) 
        && !client.emojis.cache.find(x=>x.name==args[0])
        && !client.emojis.cache.has(emoji)) {
            return message.channel.send(b("<:error:819654964628160527> Invalid emoji."));
        } 

        const embed = new Discord.MessageEmbed()
            .setColor(message.member.displayHexColor === "#000000" ? 'RANDOM' : message.member.displayHexColor)
            .setTimestamp(Date.now())
            .setFooter(message.author.username, message.author.displayAvatarURL({
                dynamic: true
            }));
        let id = emoji.includes("<") ? emoji.replace("<", "").replace(">", "").split(":")[2] : client.emojis.cache.find(x=>x.name===emoji||x.id===emoji).id;
        if (!client.emojis.cache.has(id)) return message.inlineReply(b("<:error:819654964628160527> This emoji does not exists"));
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
        <:role:818987653118689360> **Roles that can use this emoji**: ${roles.length < 1 ? "@everyone" : roles.join(", ")}
        <:cooldown:818987759636447232> **Created at**: ${new Date(e.createdAt).toUTCString()}
        `)
            .setThumbnail(e.url);
        message.inlineReply(embed);
    }
}