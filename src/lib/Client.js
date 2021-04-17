const Discord = require("discord.js");
const SC = require('./slashCommands');

module.exports = class EmoterClient extends Discord.Client {
  constructor(options) {
    super(options);
    this.commands = new Discord.Collection();
    this.cooldowns = new Discord.Collection();
  }

  getSlashCommandsManager() {
    return new SC(this);
  }

  setupTest(guild) {
    this.api.applications(this.user.id).guilds(guild).commands.post({
      data: {
        "name": "ofrecer",
        "description": "Ofrecer un servicio en #servicios",
        "options": [
          {
            "type": 3,
            "name": "Título",
            "description": "Título de tu publicación. ejemplo: \"Desarrollo plugins custom\" o \"Ofrezco traducciones al español\" ",
            "default": true,
            "required": true
          },
          {
            "type": 3,
            "name": "Descripción",
            "description": "Describe tu servicio.",
            "default": false,
            "required": true
          },
          {
            "type": 3,
            "name": "Portafolio",
            "description": "Es necesario mostrar lo que puedes hacer, acá puedes adjuntar links o texto.",
            "default": false,
            "required": true
          },
          {
            "type": 3,
            "name": "Pago",
            "description": "Explica cómo te pagarán, también deberías decir qué métodos de pagos aceptas y condiciones de pago",
            "default": false,
            "required": true
          },
          {
            "type": 3,
            "name": "Contacto",
            "description": "Acá puedes adjuntar un correo, red social u otro medio de comunicación",
            "default": false,
            "required": false
          },
          {
            "type": 3,
            "name": "Imagen",
            "description": "Adjunta una imagen que aparecerá en el embed",
            "default": false,
            "required": false
          }
        ]
      }
    });

  }
};