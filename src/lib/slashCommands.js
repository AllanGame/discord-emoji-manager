const Discord = require('discord.js');
const axios = require('axios').default;
const api = "https://discord.com/api/v8";

const obj1 = {
    guild: '',
    commandID: ''
}

const obj2 = {
    name: '',
    description: '',
    guildID: ''
}

module.exports = class SlashCommands {
    /**
     * @param {String} token
     * @param {Discord.Client} client 
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * @param {obj1} options 
     */
    async getCommands(options) {
        let url = options.guild ? `${api}/applications/${this.client.user.id}/guilds/${options.guild}/commands` :
            `${api}/applications/${this.client.user.id}/commands`;
        if (options.commandID) url += `/${options.commandID}`;

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bot ${require('../utils/data.json').token.discord}`
            }
        });

        return response.data;
    }
    /**
     * @param {obj2} options 
     */
    async createCommand(options) {
        return new Promise(async (s, r) => {
            if (!options.name || !options.description) r("invalid arguments");
            const url = options.guildID ?
                `${api}/applications/${this.client.user.id}/guilds/${options.guildID}/commands` :
                `${api}/applications/${this.client.user.id}/commands`;

            axios.post(url, options, {
                headers: {
                    Authorization: `Bot ${require('../utils/data.json').token.discord}`
                },
            }).then((res) => {
                s(res.data);
            }).catch(err => {
                r(err);
            });
        });
    }
}