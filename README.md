# Discord Guard Bot


 - [Discord Guard Bot](https://github.com/beT4w/bet4Guard)
      - [Kurulum](#kurulum)
      - [İçerikler](#İçerikler)
      - [İletişim](#İletişim)
      - [FAQ](#faq)


# Kurulum
* İlk olarak bilgisayarına [Node JS](https://nodejs.org/en/) indir.
* Bu projeyi zip halinde indir.
* Herhangi bir klasöre zipi çıkart.
* Daha sonra `Config.json` dosyalardaki bilgileri doldur.
* Sonra klasörün içerisinde bir `powershell` ya da `cmd` penceresi aç.
* ```npm install``` yazarak tüm modülleri kur.
* Kurulum bittikten sonra ```node beta.js``` yaz ve botu başlat.


## Botun İntentlerini Açmayı Unutma!
* [Açmak İçin Tıkla](https://discord.com/developers/applications)
<img src="https://cdn.discordapp.com/attachments/818953120452575322/851116463166849054/3P4KKB.png"/>

***Tadaaa 🎉. Artık guard botun hazır. Dilediğin gibi kullanabilirsin.***


# Neden Yayınlandı?
 Kısaca neden böyle bir şey için uğraştığımı anlatayım. Hem kendimi geliştirmek daha iyi bilgilere ulaşmak hatalar alıp onları nasıl düzeltebileceğimi bulmak tecrübe kazanmak için hemde Türkiyede bu kadar iyi detaylı, özenli bir altyapının olmadığını fark edip bundan sizinde yaralanmanızı istedim.



## Config.json Bilgi

```json
{
  "OwnerID":"SAHİP_ID", 
  "Prefix":"PREFİX", 
  "Token":"TOKEN", 
  "Status": "Durum",
  "guildID":"SUNUCU_ID", 
  "logChannelID":"LOG_KANAL", 
  "channelProtection":true,
  "roleProtection":true,
  "botProtection":true,
  "banProtection":true,
  "kickProtection":true,
  "serverProtection":true,
  "rightClickProtection":true, 
  "whitelist":["GÜVENLİ_KULLANICI_ID", "VEYA_ROL_ID", "BÖYLE_DEVAM_ET"], 
  "boosterRole":"BOOSTER_ROL", 
  "jailRole":"JAİL_ROL" 
}
```


# İçerikler

## • Guard {
  - [x] Rol Oluşturma Koruma
  - [x] Rol Silme Koruma
  - [x] Rol Güncelleme Koruma
  - [x] Kanal Oluşturma Koruma
  - [x] Kanal Silme Koruma
  - [x] Kanal Güncelleme Koruma
  - [x] Sunucu Güncelleme Koruma
  - [x] Üye Güncellenme Koruma
  - [x] Ban Koruma
  - [x] Kick Koruma
  - [x] Ban Açma Koruma
  - [x] Bot Koruma
  - [x] Güvenli Fonksiyonu
## };

# İletişim
* [Discord Profilim](https://discord.com/users/852615172673503262)
* [Discord Sunucum](https://discord.gg/58UAMVJTSH)

# FAQ
Sıkça sorulan sorulara buradan ulaşabilirsin.

**Q:** Altyapıyı geliştirilmeye devam edilecek mi?<br />
**A:** Eğer bir şeyler eklersem dolaylı yoldan burayada ekleyeceğim.

**Q:** İstek herhangi bir şey ekliyor musun?<br />
**A:** Eğer istediğin şey hoşuma giderse ve yapmaktan zevk alacaksam eklerim.

**Q:** Altyapı tamamen sanamı ait?<br />
**A:** Hayır, tamamen bana ait değil sadece bağzı yapamadığım ufak kısımları [Serendia Squad](https://discord.gg/serendia) 'dan göz gezdirdim. (:

**Q:** Hatalarla ilgileniyor musun?<br />
**A:** Proje içindeki hatalarla ilgileniyorum. Eğer bir hata ile karşılaşırsanız lütfen Discorddan benimle iletişim kurun. 


## NOT: Botta MIT lisansı bulunmaktadır. Bu botun dosyalarının benden habersiz paylaşılması/satılması durumunda gerekli işlemler yapılacaktır!
