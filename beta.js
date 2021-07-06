const { Client, Discord, MessageEmbed } = require("discord.js");
const beta = new Client();
const config = require("./Config.json");

  function guvenli(kisiID) {
    let uye = beta.guilds.cache.get(config.guildID).members.cache.get(kisiID);
    let betasafe = config.whitelist || [];
    if (!uye || uye.id === beta.user.id || uye.id === config.OwnerID || uye.id === uye.guild.owner.id || betasafe.some(beta => uye.id === beta || uye.roles.cache.has(beta))) return true
  else return false};

  const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
  function cezalandir(kisiID, tur) {
    let userID = beta.guilds.cache.get(config.guildID).members.cache.get(kisiID);
    if (!userID) return;
    if (tur == "jail") return userID.roles.cache.has(config.boosterRole) ? userID.roles.set([config.boosterRole, config.jailRole]) : userID.roles.set([config.jailRole]);
    if (tur == "ban") return userID.ban({ reason: "Beta Koruma Sistemi" }).catch()};

beta.on('ready', async () => {
  beta.user.setActivity(`${config.Status}`, { status: "online"} ,{ type: 'PLAYİNG'})
  .then(console.log(`${beta.user.tag} İsmiyle Discord Bağlantısı kuruldu.`))
  .catch(() => console.log(`Bir hata ile karşılaştım.`))
});

//-                                                                        ROL KORUMA                                                                        -\\

beta.on("roleCreate", async role => {
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.roleProtection) return;
  role.delete({ reason: "Beta Koruma Sistemi" });
  cezalandir(entry.executor.id, "jail");
  let user = beta.users.cache.get(entry.executor.id)
  let logKanali = beta.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Sunucuda izinsiz bir rol oluşturuldu!').setDescription(`${entry.executor} adlı yetkili tarafından sunucuda izinsiz bir rol oluşturuldu! \n\nSunucuda rolü oluşturan yetkilinin rolleri alındı ve cezalı rolü verildi!`).setFooter(`Beta Koruma Sistemi`).setTimestamp())}});

beta.on("roleDelete", async role => {
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.roleProtection) return;
  cezalandir(entry.executor.id, "jail");
  let user = beta.users.cache.get(entry.executor.id)
  let yeniRol = await role.guild.roles.create({
  data: {
    name: role.name,
    color: role.hexColor,
    hoist: role.hoist,
    position: role.position,
    permissions: role.permissions,
    mentionable: role.mentionable},
    reason: "Rol Silindiği İçin Tekrar Oluşturuldu!"});
  let logKanali = beta.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Sunucuda bir rol izinsiz silindi!').setDescription(`${entry.executor} adlı yetkili tarafından **${role.name}** isimli rol silindi, silen kişi banlandı! \nRol tekrar oluşturuldu.`).setFooter(`Beta Koruma Sistemi`).setTimestamp())}});

beta.on("roleUpdate", async (oldRole, newRole) => {
  let entry = await newRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || !newRole.guild.roles.cache.has(newRole.id) || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.roleProtection) return;
  cezalandir(entry.executor.id, "jail");
  let user = beta.users.cache.get(entry.executor.id)
  if (yetkiPermleri.some(p => !oldRole.permissions.has(p) && newRole.permissions.has(p))) {
  newRole.setPermissions(oldRole.permissions);
  newRole.guild.roles.cache.filter(r => !r.managed && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_GUILD"))).forEach(r => r.setPermissions(36818497));
};
  newRole.edit({
    name: oldRole.name,
    color: oldRole.hexColor,
    hoist: oldRole.hoist,
    permissions: oldRole.permissions,
    mentionable: oldRole.mentionable});
 let logKanali = beta.channels.cache.get(config.logChannelID);
 if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Sunucuda izinsiz bir rol güncellendi!').setDescription(`${entry.executor} adlı yetkili tarafından **${oldRole.name}** isimli rol izinsiz güncellendi! \n\nGüncelleyen yetkilinin rolleri alındı ve cezalı rol verildi! \n\nRol eski haline getirildi!`).setFooter(`Beta Koruma Sistemi`).setTimestamp())}});

//-                                                                        KANAL KORUMA                                                                        -\\

beta.on("channelCreate", async channel => {
  let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.channelProtection) return;
  channel.delete({reason: "Beta Koruma Sistemi"});
  let user = beta.users.cache.get(entry.executor.id)
  cezalandir(entry.executor.id, "jail");
  let logKanali = beta.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Sunucuda bir kanal izinsiz oluşturuldu!').setDescription(`${entry.executor} adlı yetkili tarafından sunucuda izinsiz kanal oluşturuldu! Oluşturan yetkilinin rolleri alındı ve jaile atıldı! \nOluşturulan Kanal Silindi.`).setFooter(`Beta Koruma Sistemi`).setTimestamp().setThumbnail(user.displayAvatarURL({dynamic: true })))}});

beta.on("channelDelete", async channel => {
  let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.channelProtection) return;
  cezalandir(entry.executor.id, "jail");
  let user = beta.users.cache.get(entry.executor.id)
  await channel.clone({ reason: "Beta Koruma Sistemi" }).then(async kanal => {
  if (channel.parentID != null) await kanal.setParent(channel.parentID);
  await kanal.setPosition(channel.position);
  if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));});
  let logKanali = beta.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('İzinsiz bir kanal silindi!').setDescription(`${entry.executor} adlı yetkili tarafından **${channel.name}** isimli kanal silindi! Silen yetkilinin rolleri alındı ve jaile atıldı! \nSilinen kanal tekrar oluşturuldu.`).setFooter(`Beta Koruma Sistemi`).setTimestamp())}});

beta.on("channelUpdate", async (oldChannel, newChannel) => {
  let entry = await beta.guilds.cache.get(newChannel.guild.id).fetchAuditLogs({ type: 'CHANNEL_UPDATE' }).then(audit => audit.entries.first())
  if (Date.now()-entry.createdTimestamp > 5000) {
  entry = await beta.guilds.cache.get(newChannel.guild.id).fetchAuditLogs({ type: 'CHANNEL_OVERWRITE_UPDATE' }).then(audit => audit.entries.first())}
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.channelProtection) return;
  let user = beta.users.cache.get(entry.executor.id)
  cezalandir(entry.executor.id, "jail"); 
  if (newChannel.type !== "category" && newChannel.parentID !== oldChannel.parentID) newChannel.setParent(oldChannel.parentID);
  if (newChannel.type === "category") {newChannel.edit({name: oldChannel.name})} else if (newChannel.type === "text") {newChannel.edit({name: oldChannel.name, topic: oldChannel.topic, nsfw: oldChannel.nsfw, rateLimitPerUser: oldChannel.rateLimitPerUser})} else if (newChannel.type === "voice") {newChannel.edit({name: oldChannel.name, bitrate: oldChannel.bitrate, userLimit: oldChannel.userLimit,})}; oldChannel.permissionOverwrites.forEach(perm => {let thisPermOverwrites = {}; perm.allow.toArray().forEach(p => {thisPermOverwrites[p] = true;}); perm.deny.toArray().forEach(p => {thisPermOverwrites[p] = false;}); newChannel.createOverwrite(perm.id, thisPermOverwrites)});
  let logKanali = beta.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('İzinsiz bir kanal güncellendi!').setDescription(`${entry.executor} adlı yetkili tarafından **${newChannel.name}** isimli kanal güncellendi! Güncellenyen yetkilinin rolleri alındı ve jaile atıldı! \nKanal eski haline getirildi.`).setFooter(`Beta Koruma Sistemi`).setTimestamp())}});

//-                                                                        SUNUCU KORUMA                                                                        -\\

beta.on("guildUpdate", async (oldGuild, newGuild) => {
  let entry = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.serverProtection) return;
  cezalandir(entry.executor.id, "jail");
  let user = beta.users.cache.get(entry.executor.id)
  if (newGuild.name !== oldGuild.name) newGuild.setName(oldGuild.name);
  if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
  let logKanali = beta.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Sunucu izinsiz güncellendi!').setDescription(`${entry.executor} adlı yetkili tarafından Sunucu izinsiz güncellendi! \nGüncelleyen yetkili sunucudan yasaklandı ve sunucu eski haline getirildi.`).setFooter(`Beta Koruma Sistemi`).setTimestamp())}});

beta.on("guildMemberRemove", async member => {
  let entry = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.kickProtection) return;
  cezalandir(entry.executor.id, "jail");
  let user = beta.users.cache.get(entry.executor.id)
  let logKanali = beta.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic: true })).setColor("BLUE").setTitle('Bir kullanıcı izinsiz sunucudan atıldı!').setDescription(`${member} adlı üye, ${entry.executor} adlı yetkili tarafından sunucudan izinsiz atıldı! \n\nKullanıcıyı sunucudan atan yetkilinin yetkileri alındı ve cezalı rolü verildi!.`).setFooter(`Beta Koruma sistemi`).setTimestamp())}});

beta.on("guildBanAdd", async (guild, user) => {
  let entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || guvenli(entry.executor.id) || !config.banProtection) return;
  cezalandir(entry.executor.id, "jail");
  guild.members.unban(user.id, "İzinsiz banlandığı için ban geri açıldı!").catch(console.error);
  let logKanali = beta.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Bir kullanıcı izinsiz sunucudan yasaklandı!').setDescription(`${user} adlı üye, ${entry.executor} adlı yetkili tarafından sunucudan izinsiz yasaklandı! \n\n Kullanıcıyı sunucudan yasaklayan yetkilinin rolleri alındı ve cezalı rolü verildi!.`).setFooter(`Beta Koruma Sistemi`).setTimestamp())}});

beta.on("guildMemberAdd", async member => {
  let entry = await member.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
  if (!member.user.bot || !entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.botProtection) return;
  cezalandir(entry.executor.id, "jail");
  cezalandir(member.id, "ban");
  let user = beta.users.cache.get(entry.executor.id)
  let logKanali = beta.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Sunucuya izinsiz bir bot eklendi!').setDescription(`${member} adlı botu, ${entry.executor} adlı yetkili tarafından sunucuya izinsiz eklendi! \n\nEkleyen yetkili ve bot sunucudan yasaklandı.`).setFooter(`Beta Koruma Sistemi`).setTimestamp())}});

beta.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (newMember.roles.cache.size > oldMember.roles.cache.size) {
  let entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.rightClickProtection) return;
  if (yetkiPermleri.some(p => !oldMember.hasPermission(p) && newMember.hasPermission(p))) {
  cezalandir(entry.executor.id, "jail");
  let user = beta.users.cache.get(entry.executor.id)
  let logKanali = beta.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Sunucuda izinsiz yetki yükseltildi').setDescription(`${newMember} adlı üyeye ${entry.executor} isimli yetkili tarafından sunucuda izinsiz yetki verildi! \nYetki veren yetkili sunucudan yasaklandı ve verilen yetki geri alındı!`).setFooter(`Beta Koruma Sistemi`).setTimestamp())}}}});

beta.login(config.Token).catch(() => console.log('Tokeni kontrol ediniz.'));
