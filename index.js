const Discord = require('discord.js');
const client = new Discord.Client();
const Config = require('./config.json');
const Steem = require('steem');

client.login(Config.token);


client.on('ready', () => {
  console.log("¡Preparado para la acción!");
  var channel = client.channels.get('482703235862495242'); // put channel id here...
  Steem.api.streamTransactions('head', (error, result) => {
    let txType = result.operations[0][0]
    let txData = result.operations[0][1]

    if (txType == "vote" && txData.voter == "stellae") {
      let vote_w = txData.weight/100;
      channel.send("Articulo votado por el equipo de Curación STELLAE: https://steemit.com/@"+txData.author+"/"+txData.permlink+" Porcentaje: "+vote_w+"% del Poder de voto.");
    }
  });
});

//Modulos de Respuesta (Ping y Hola)
client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    let start = Date.now(); message.reply('Pong! ').then(message => {
      let diff = (Date.now() - start);
      let API = (client.ping).toFixed(2)

          let embed = new Discord.RichEmbed()
          .setTitle(`🔔 Pong!`)
          .setColor(0xff2f2f)
          .addField("📶 Ping", `${diff}ms`)
          .addField("💻 API", `${API}ms`)
          message.edit(embed);
        });
  } else
  if (message.content.startsWith("buenos dias")) {
    message.channel.send("¡Buenos días arcan@!");
  }
  if (message.content.startsWith("¿Como estan?")) {
    message.channel.send("¿Excelente y tu?");
  }
  if (message.content.startsWith("ayuda")) {
    message.channel.send("Visita el canal #❓-dudas-help para cualquier información");
  }
  if (message.content.startsWith("buenas noches")) {
    message.channel.send("¡Buenas noches arcan@!");
  }
 });