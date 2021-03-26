const { MessageEmbed } = require("discord.js");
const config = require('../config.json')

exports.execute = async (client, message, args) => {
    let embed = new MessageEmbed()
    .setColor('#f2b5c8')
    .setTitle('**Sunucunuzu koruyacak olan sistemler aşağıda sıralanmıştır!**')
    .setDescription(`
                \`Komutlar aşağıdadır.\`       

\`>\` Koruma'ları açmak ya da kapatmak için **${config.Prefix}koruma** komutunu kullanabilirsiniz.
\`>\` Beyaz listeye üye ya da rol eklemek için **${config.Prefix}whitelist** komutunu kullanabilirsiniz.

                \`Koruma sistemleri aşağıdadır.\`

    \`>\` **Kanal Koruma:** **\`Kanal oluşturulmasını, Düzenlenmesini ve Silinmesini engeller.\`**

    \`>\` **Rol Koruma:** **\`Rol oluşturulmasını, Düzenlenmesini ve Silinmesini engeller.\`**

    \`>\` **Bot Koruma:** **\`Sunucunuza izinsiz bot girmesini engeller ve botu ekleyen yetkilinin ceza almasını sağlar.\`**

    \`>\` **Kick Koruma:** **\`Sunucunuzdan bir üye izinsiz atıldığında yetkilinin ceza almasını sağlar.\`**

    \`>\` **Ban koruma:** **\`Sunucunuzdan bir üye izinsiz yasaklandığında yetkilinin ceza almasını sağlar.\`**
    
    \`>\` **Sunucu güncelleme koruması:** **\`Sunucunuz izinsiz güncelleyen kişiyi cezalandırır ve sunucuyu eski haline getirir.\`**

    \`>\` **Sağ tık yetki verme koruması:** **\`Sunucunuzda bir yetkili izinsiz yetki yükseltirse, yetki yükselten yetkili cezalandırılır ve yetki alan üye'nin rolü eski haline getirilir.\`**
    `)
    .setFooter('B$T4 Koruma Sistemi')
    .setTimestamp()
    message.channel.send(embed)
};

exports.conf = {
  command: "bilgi",
  description: "",
  aliases: []
}
