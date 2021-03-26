const { MessageEmbed } = require("discord.js");
const fs = require('fs')
const config = require("../config.json")

exports.execute = async (client, message, args) => {
  let embed = new MessageEmbed().setColor("#f2b5c8").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setFooter(`B$T4 Koruma Sistemi`).setTimestamp();
  let korumalar = Object.keys(config).filter(k => k.includes('Protection'));
  if (!args[0] || !korumalar.some(k => k.includes(args[0]))) return message.channel.send(embed.setDescription(`Korumaları açmak ya da kapatmak için  **${config.Prefix}koruma <koruma>** \n\n **Kullanıma Hazır Korumalar:** ${korumalar.map(k => `\`${k}\``).join(', ')}\n\n**Aktif Koruma Sistemleri:** ${korumalar.filter(k => config[k]).map(k => `\`${k}\``).join(', ')}`));
  let koruma = korumalar.find(k => k.includes(args[0]));
  config[koruma] = !config[koruma];
  fs.writeFile("../config.json", JSON.stringify(config), (err) => {
  if (err) console.log(err);
});
  message.channel.send(embed.setDescription(`**${koruma}** adlı koruma , ${message.author} tarafından ${config[koruma] ? "açıldı" : "kapatıldı"}!`));
};

exports.conf = {
  command: "koruma",
  description: "",
  aliases: []
}