var Discord = require('discord.js'); // discord.js를 불러옴
var client = new Discord.Client(); // 새로운 디스코드 클라이언트를 만듬
var config = require('./Config.json'); //config.json 파일을 불러옴
var fs = require('fs'); //fs 파일을 불러옴
var game = 'Team battle bot'
var i = 0
console.log(`Starting bot...`);


client.on('ready', () => {
  console.log(`Discord bot is ready!`);
  console.log(`Login by ${client.user.tag}`);
  client.user.setActivity(game, { type: 'PLAYING' })
});


client.on('message', msg => {

  var command = msg.content

  var myname = client.user.tag.split('#')




  if (msg.author.username !== myname[0]) {

    if (msg.content.startsWith('!add')) {
      var code = msg.content.split(' ') //coed =array
      var sentence = ''
      var i = 2
      while (i < code.length) {

        var sentence = sentence + '\n' + code[i]
        i++
      }
      fs.writeFile(`./text/${code[1]}`, sentence, 'utf8', function(error){

        console.log('writeFile is success!');
        msg.channel.send(`${msg.author.username},\nYour level is submitted!`)

      });
    }
/*------------------------------------------------------------------------------------*/
    if (msg.content === '!list') {
      fs.readdir('./text', function(error, filelist){
        if (filelist === '') {
          msg.channel.send(`\nWe have no level`)
        }else {
          var i = 0
          var dirs = `We're level list is\n`
          while (i < filelist.length) {
            //filelist는 맵 코드
            var data = fs.readFileSync(`./text/${filelist[i]}`);
            var dirs = dirs + '\n' +filelist[i]
            var data = data + '\n'
            var data = data.split('\n')
            var dirs = `${dirs} - \`${data[2]}\``
            i++
          }
          msg.channel.send(dirs)
        }
      })
    }
/*------------------------------------------------------------------------------------*/
    if (msg.content==='!help') {
      msg.channel.send(`!add - submit level

!list - Show your level

!info - Show level's info

!code - Show bot's source code
`)
    }
/*------------------------------------------------------------------------------------*/
    if (msg.content.startsWith('!info')) {
      try {

        var code = msg.content.split(' ') //coed =array
        fs.readFile(`./text/${code[1]}`, 'utf8', function(err, data) {

          if (msg.content === '!info') {

            msg.channel.send('No matching results')

          } else {
            var data = data + '\n'
            var data = data.split('\n')
            var i = 0
            var info = `${code[1]}'s info is...\n`
            while (i < data.length) {
                var info = `${info}\n${data[i]}`
                i++
              }

            }
        })

      } catch (e) {
        console.error(e);
      }
    }
/*------------------------------------------------------------------------------------*/
//LISTENING, WATCHING, PLAYING
  if(msg.content.startsWith('!watch ')) {
    var code = msg.content.split(' ') //coed =array
    msg.channel.send('Game is update!')
    var game = ''
    var i = 1
    while (i < code.length) {
      var game = game + ' ' +code[i]
      i++
    }
    client.user.setActivity(game, { type: 'WATCHING' })
    console.log(`Game has updata by ${msg.author.username}`);
  }
  if(msg.content.startsWith('!listen ')) {
  var code = msg.content.split(' ') //coed =array
  msg.channel.send('Game is update!')
  var game = ''
  var i = 1
  while (i < code.length) {
    var game = game + ' ' +code[i]
    i++
  }
  client.user.setActivity(game, { type: 'LISTENING' })
  console.log(`Game has updata by ${msg.author.username}`);
  }
  if(msg.content.startsWith('!play ')) {
  var code = msg.content.split(' ') //coed =array
  msg.channel.send('Game is update!')
  var game = ''
  var i = 1
  while (i < code.length) {
    var game = game + ' ' +code[i]
    i++
  }
  client.user.setActivity(game, { type: 'PLAYING' })
  console.log(`Game has updata by ${msg.author.username}`);
  }
/*------------------------------------------------------------------------------------*/
  if(command === '!code') {
      msg.channel.send(`Team battle bot\'s source code is
https://github.com/kimsj5025/Team-battle-bot.git`)
    }











  }; /*본인인지 채크*/
}); //client.on


client.login('');
