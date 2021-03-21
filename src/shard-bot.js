const {MessageEmbed} = require("discord.js");
const Client = require("./lib/Client");
require('./lib/CStructure');
const client = new Client();
const mongoose = require("mongoose");
const data = require("./utils/data.json");
let fs = require("fs");
global.b = function b(text) {
    return new MessageEmbed().setDescription(text).setColor('RANDOM');
}

global.fe = function fe(title, description, color, timestamp, author, footer, image, thumbnail) {
    const embed = new MessageEmbed();
    if(title) { embed.setTitle(title); }
    if(description) { embed.setDescription(description); }
    if(color) { embed.setColor(color); } else { embed.setColor('RANDOM'); }
    if(timestamp) { embed.setTimestamp(new Date()); }
    if(author) { embed.setAuthor(author[0], author[1], !author[2] ? "" : author[2]); }
    if(footer) { embed.setFooter(footer[0], footer[1]); }
    if(image) { embed.setImage(image); }
    if(thumbnail) { embed.setThumbnail(thumbnail); }
    return embed;
}
fs.readdir(__dirname + "/commands", (err, files) => {
    if(err) {
        console.error(err);
        return;
    }

    let jsfiles = files.filter((f) => f.split(".").pop() === "js");
    if(jsfiles.length < 0) {
        Log.log("[WARN] No commands to load.");
        return;
    }

    console.log(`[INFO] Loaded ${jsfiles.length} commands.`);

    jsfiles.forEach((f, i) => {
        let fileName = f.substring(0, f.length - 3);
        let fileContents = require("./commands/" + f);
        const h = require('./lib/CommandHandler');
        if(fileName !== "test")return;
        const Command = new fileContents(client);
        if(typeof Command.options !== 'object')return console.log(`${fileName} command don't have valid settings`);
        if(!Command.options.name)return console.log(`${fileName} command don't have an "name" parametter`);
        if(!Command.options.category)return console.log(`${fileName} command don't ahve an "category" parametter`);
        client.commands.set(Command.options.name, fileContents);
        console.log(`Command ${f} loaded`);
        delete require.cache[require.resolve(`./commands/${fileName}.js`)];
    });
});

for(const file of fs.readdirSync("./events")) {
    if(file.endsWith("js")) {
        let fileName = file.substring(0, file.length - 3);
        let fileContents = require("./events/" + file);
        client.on(fileName, fileContents.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    }
}

 let uri = `mongodb+srv://${data.database.username}:${data.database.password}@${data.database.url}/emoji-manager?retryWrites=true&w=majority`;


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, function(err) {
    if(err) {
        console.error(`[ERROR] Error .\n${err}`);
        process.exit(1);
    }
    console.log(`[INFO] Connected to ${data.database.url} (MongoDB)`);
});


client.login(data.token.discord).then(() => {
    console.log(`[INFO] Logged in ${client.user.tag}.`);
}).catch((err) => {
    console.error(`[ERROR] Can't login. \n${err}`);
});