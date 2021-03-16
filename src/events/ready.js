const Client = require('../lib/Client');
/**
 * @param {Client} client 
 */
module.exports = (client) =>  {
    client.user.setActivity(`👌🤑🤬😭`, {
        type: "COMPETING"
    });

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
        }
    });
}