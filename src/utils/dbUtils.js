var UserSchema = require("../models/user.js");
var GuildSchema = require("../models/guild.js");

/**
 * 
 * @param {String} userID 
 */
function isUserRegistered(userID = "0") {
  UserSchema.findOne({
      userID,
    }, (user) => {
      
      if(!user) {
        return false
      }  else {
        return true;
      }

    });
}
/**
 * 
 * @param {String} userID 
 * @param {String} lang 
 * @param {Boolean} blacklisted 
 * @param {Boolean} dev 
 */
function registerUser(userID = "0", lang = "lang_en", blacklisted = false, dev = false) {
    UserSchema.findOne({
        userID,
      }, (user) => {
        if(!user) {
            const newUserSchema = new UserSchema({
                userID,
                lang,
                blacklisted,
                dev
            });
            return newUserSchema.save();
        }  else {
          return console.error("User "+ userID + " is already registered");
        }
  
      });
}

/**
 * 
 * @param {String} guildID
 * @returns {Boolean} 
 */

function isGuildRegistered(guildID = "0") {
    UserSchema.findOne({
        guildID,
      }, (guild) => {
        
        if(!guild) {
          return false
        }  else {
          return true;
        }
  
      });
  }
    /**
     * 
     * @param {String} guildID 
     * @param {String} prefix 
     * @returns 
     */
  function registerUser(guildID = "0", prefix = "lang_en") {
    const newGuildSchema = new GuildSchema({
        guildID,
        prefix,
    });
    return newGuildSchema.save();
  }