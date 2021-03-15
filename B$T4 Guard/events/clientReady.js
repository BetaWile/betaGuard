const Discord = require("discord.js");
const client = global.client;
const config = require('../config.json')
const fs = require('fs')

exports.execute = async () => {
    client.user.setPresence({ activity: { name: "B$T4 Was Here"}, status: "idle" });
  };

exports.conf = {
  event: "ready"
};