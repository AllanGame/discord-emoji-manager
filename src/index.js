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