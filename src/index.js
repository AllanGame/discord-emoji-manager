const express = require('express');
const app = express();
app.get('/', (req, res) => res.send(200));
app.listen(3242);

const { ShardingManager, MessageEmbed } = require('discord.js');
const shards = new ShardingManager('./shard-bot.js', {
  token: require("./utils/data.json").token.discord,
  totalShards: 'auto',
  autoSpawn: true
});

shards.on('shardCreate', shard => console.log(`[SHARD-${shard.id}] Executed... ${Math.floor(shard.id + 1)}/${shards.totalShards}`));

shards.spawn();

// Set the global functions

/**
 * 
 * @param {String} text 
 */
global.b = function b(text) {
    return new MessageEmbed().setDescription(text).setColor('RANDOM');
}

/**
 * Fast way to create a embed
 * @param {String} title 
 * @param {String} description 
 * @param {String} color 
 * @param {Boolean} timestamp 
 * @param {String[]} author 
 * @param {String[]} footer 
 * @param {String} image
 * @param {String} thumbnail
 */
global.fe = function fe(title, description, color, timestamp, author, footer, image, thumbnail) {
    const embed = new MessageEmbed();
    if(title)embed.setTitle(title);
    if(description)embed.setDescription(description);
    if(color)embed.setColor(color);else embed.setColor('RANDOM');
    if(timestamp)embed.setTimestamp(new Date());
    if(author)embed.setAuthor(author[0], author[1], !author[2] ? "" : author[2]);
    if(footer)embed.setFooter(footer[0], footer[1]);
    if(image)embed.setImage(image);
    if(thumbnail)embed.setThumbnail(thumbnail);
    return embed;
}