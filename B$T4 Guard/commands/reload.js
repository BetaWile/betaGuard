const Discord = require("discord.js");

exports.execute = async (client, message, args) => {
    let commandName = args[0];
    if(!commandName) return message.channel.send(`Tekrar başlatılacak bir dosya ismi belirtmelisin.`);

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)]
        let command = require(`./${commandName}.js`);
        client.commands.set(command.conf.command, command)
        command.conf.aliases.forEach(aliases => {
            client.aliases.set(aliases, command)  
        });        
        message.channel.send(`\`${commandName}\` Adlı dosya yeniden başlatıldı.`)
    } catch (e) {
        console.log(e)
        message.channel.send(`\`${commandName}\` Adlı dosya yeniden başlatılamadı.`);
        return message.channel.send(e, {code: "js", split: true})
    };
};

exports.conf = {
  command: "reload",
  description: "",
  aliases: ["rl"]
}
