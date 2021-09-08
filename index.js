const Discord = require('discord.js');
const client = new Discord.Client();
const Steem = require('steem');

var alreadySentPosts = [];

client.on('ready', () => {
  console.log("¡Bot On!");
  var voteFeed = client.channels.get('885193738614345768');
  var reportFeed = client.channels.get('871150645103706144');
  Steem.api.streamTransactions('head', (error, result) => {
    let txType = result.operations[0][0];
    let txData = result.operations[0][1];

    if (txType == "comment" && txData.author == "fundacoven" && txData.parent_author == "") {
      var formatted = txData.author + txData.permlink;
      if (!alreadySentPosts.includes(formatted)){
        reportFeed.send("New post from project https://steemit.com/@"+txData.author+"/"+txData.permlink);
        alreadySentPosts.push(formatted)
      }
    }
    if (txType == "vote" && txData.voter == "fundacoven") {
      let vote_w = txData.weight/100;
      voteFeed.send("New post upvoted: https://steemit.com/@"+txData.author+"/"+txData.permlink+" Porcentaje: "+vote_w+"% del Poder de voto.");
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
    message.channel.send("¡Buenos días!");
  }
  if (message.content.startsWith("¿Como estan?")) {
    message.channel.send("¿Excelente y tu?");
  }
  if (message.content.startsWith("ayuda")) {
    message.channel.send("Visita el canal #❓-dudas-help para cualquier información");
  }
  if (message.content.startsWith("buenas noches")) {
    message.channel.send("¡Buenas noches!");
  }
 });

 client.on("error", (e) => { 
   console.log(e);
 })

client.login(process.env.TOKEN);
