const { MessageEmbed, Message } = require("discord.js");
const Client = require("./lib/Client");
require("./lib/CStructure");
const client = new Client();
const mongoose = require("mongoose");
const data = require("./utils/data.json");
let fs = require("fs");
const GuildSchema = require("./models/guild.js");
const UserSchema = require("./models/user.js");
global.b = function b(text) {
  return new MessageEmbed().setDescription(text).setColor("RANDOM");
};
const { getEmojis, stringHasEmoji } = require("./utils/emojisUtils");
global.fe = function fe(
  title,
  description,
  color,
  timestamp,
  author,
  footer,
  image,
  thumbnail
) {
  const embed = new MessageEmbed();
  if (title) {
    embed.setTitle(title);
  }
  if (description) {
    embed.setDescription(description);
  }
  if (color) {
    embed.setColor(color);
  } else {
    embed.setColor("RANDOM");
  }
  if (timestamp) {
    embed.setTimestamp(new Date());
  }
  if (author) {
    embed.setAuthor(author[0], author[1], !author[2] ? "" : author[2]);
  }
  if (footer) {
    embed.setFooter(footer[0], footer[1]);
  }
  if (image) {
    embed.setImage(image);
  }
  if (thumbnail) {
    embed.setThumbnail(thumbnail);
  }
  return embed;
};
client.on("ready", () => {
  fs.readdir(__dirname + "/commands", (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    let jsfiles = files.filter((f) => f.split(".").pop() === "js");
    if (jsfiles.length < 0) {
      Log.log("[WARN] No commands to load.");
      return;
    }

    console.log(`[INFO] Loaded ${jsfiles.length} commands.`);

    jsfiles.forEach((f, i) => {
      let fileName = f.substring(0, f.length - 3);
      let fileContents = require("./commands/" + f);
      //const h = require('./lib/CommandHandler');
      const Command = new fileContents(client);
      if (typeof Command.options !== "object")
        return console.log(`${fileName} command don't have valid settings`);
      if (!Command.options.name)
        return console.log(
          `${fileName} command don't have an "name" parametter`
        );
      if (!Command.options.category)
        return console.log(
          `${fileName} command don't have an "category" parametter`
        );
      if (typeof Command.client === "undefined")
        return console.log(`${fileName} command client is undefined`);
      client.commands.set(Command.options.name, Command);
      //console.log(`Command ${f} loaded`);
      delete require.cache[require.resolve(`./commands/${fileName}.js`)];
    });
  });
});

for (const file of fs.readdirSync("./events")) {
  if (file.endsWith("js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require("./events/" + file);
    client.on(fileName, fileContents.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  }
}

let uri = `mongodb+srv://${data.database.username}:${data.database.password}@${data.database.url}/emoji-manager?retryWrites=true&w=majority`;

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  function (err) {
    if (err) {
      console.error(`[ERROR] Error .\n${err}`);
      process.exit(1);
    }
    console.log(`[INFO] Connected to ${data.database.url} (MongoDB)`);
  }
);

/**
 * @param {Message} message
 */
client.on("message", (message) => {
  
    
    if (message.channel.type == "dm") return; 
    if (message.author.bot) return;
    if (message.webhookID) return; // ignore webhook messages
    let containsCollectionEmojis = false;
    UserSchema.findOne({
    userID: message.author.id,
    }, (err, user) => {
      if(err) {
          throw err;
      }
      let regex = new RegExp(/[^<]{0,1}:(\w{2,32}):(?!\d{18}>)/g);
      if (user.emojiCollection === undefined || user.emojiCollection.size === 0) return; // check if the user has an emoji collection
      if (!stringHasEmoji(message.content)) return;
      
      for(let x of message.content.matchAll(regex)) {
          if(user.emojiCollection.has(x[1])) {
            containsCollectionEmojis = true;
          }
      }
      if(containsCollectionEmojis) {
        GuildSchema.findOne({
            guildID: message.guild.id,
          }, (err, guild) => {
            if (err) {
              console.error(err);
            }
            if (!guild) return;
            if (!guild.config.useEmojiFromLibrary) return;
  
            let messageHasAttachments = false;
            let attachments = [];
            if (message.attachments.size !== 0) {
              messageHasAttachments = true;
              message.attachments.forEach((x) => attachments.push(x.url));
            }
  
            message.guild.fetchWebhooks().then(async (r) => {
              let result = r.filter((x) =>
                  x.owner.id === client.user.id &&
                  x.channelID === message.channel.id
              );
              let hook;
              if (result.size === 0) {
                hook = await message.channel.createWebhook(message.author.username, {
                    avatar: message.author.displayAvatarURL(),
                    reason: message.author.tag + " is trying to use an emoji",
                  });
              } else {
                hook = result.first();
              }
              if (
                hook.name !== message.author.username &&
                hook.avatar !== message.author.avatar
              ) {
                await hook.edit({
                  name: message.author.username,
                  avatar: message.author.displayAvatarURL(),
                });
              }
              if (messageHasAttachments) {
                await hook.send(
                  message.content.replace(regex, (_, emoji) =>
                      `${user.emojiCollection.get(emoji) === undefined ? ":"+emoji+":" : user.emojiCollection.get(emoji)}`
                  ),
                  {
                    allowedMentions: { users: [] },
                    files: attachments,
                  }
                );
              } else {
                await hook.send(
                  message.content.replace(
                    regex,
                    (_, emoji) =>
                    `${user.emojiCollection.get(emoji) === undefined ? ":"+emoji+":" : user.emojiCollection.get(emoji)}`
                  ),
                  { allowedMentions: { users: [] } }
                );
              }
              message.delete();
            });
          }
        );
      }
    }
  );
});

client
  .login(data.token.discord)
  .then(() => {
    console.log(`[INFO] Logged in ${client.user.tag}.`);
  })
  .catch((err) => {
    console.error(`[ERROR] Can't login. \n${err}`);
  });
