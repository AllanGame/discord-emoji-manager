const Client = require('../lib/Client');
const moment = require('moment'); 
const Discord = require('discord.js')
const dev = require('../utils/misc.json').config.dev
/**
 * @param {Client} client 
 */
module.exports = (client) =>  {
    client.user.setActivity(`For mentions | !help`, {
        type: "WATCHING"
    });

    // on bot start log
    client.channels.cache.get("821220369175937025").send(new Discord.MessageEmbed()
    .setTitle("Bot is ready")
    .setDescription(
    "Started at:" + moment().format('LLLL') +
    "\nCommands loaded: not finished" +
    "\nEvents loaded: not finished" +
    "\nTotal bot guilds: "+ client.guilds.cache.size +
    "\nTotal bot users: "+ client.users.cache.size)
    .setFooter('Started by '+ dev)
    );

    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;
        let emojis = ["👌", "🤑", "🤬", "😭"];
        if (command === 'random-emoji') { 
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: emojis[Math.floor(Math.random() * emojis.length + 1) - 1]
                    }
                }
            });
        }else if(command === 'invite') {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `> __**Useful links**__\n\n**Bot invite**: [Click here](<https://discord.com/oauth2/authorize?client_id=819662243971989567&scope=bot&permissions=8>)\n**Oficial server**: [Click here](<https://google.com/>)\n\n**Developed by**: \`${require('../utils/misc.json').owners.id.map(x=>client.users.cache.get(x).tag).join('`, `')}\``
                    }
                }
            });
        } else if(command === "ofrecer") {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: `${interaction.content}`
              }
            }
          })
        }
    });
}