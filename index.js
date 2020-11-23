var Discord = require('discord.js'); // discord.js를 불러옴
var client = new Discord.Client(); // 새로운 디스코드 클라이언트를 만듬
var config = require('./Config.json'); //config.json 파일을 불러옴
var fs = require('fs'); //fs 파일을 불러옴
var game = '피치성 공사'
var type = 'playing'
var i = 0
console.log(`Starting bot...`);



client.on('ready', () => {
  console.log(`Discord bot is ready!`);
  console.log(`Login by ${client.user.tag}`);
  client.user.setActivity(game, { type: 'PLAYING' })
});


client.on('message', msg => {

  var commad = msg.content





  if (msg.author.username !== 'Captain Toad') {

    if (msg.content.startsWith('!add')) {
      var code = msg.content.split(' ') //coed =array
      var sentence = code[2]
      var i = 2
      while (i < code.length) {

        var sentence = sentence + '\n' + code[i]
        i++
      }
      var sentence = sentence + '\n'
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
          var dirs = `We're level list is\n`
          var i = 0
          while (i < filelist.length) {
            var dirs = dirs + '\n' +filelist[i]
            i++
          }
          msg.channel.send(dirs)
        }
      })
    }
/*------------------------------------------------------------------------------------*/
    if (msg.content==='!help') {
      msg.channel.send(`!add - submit level

!mylist - Show your level

!info - Show level's info

!code - Show bot's source code
`)
    }
/*------------------------------------------------------------------------------------*/
    if (msg.content.startsWith('!info')) {
      try {

        var code = msg.content.split(' ') //coed =array
        fs.readFile(`./text/${code[1]}`, 'utf8', function(err, data) {
          console.log(data);

          if (msg.content === '!info') {

            msg.channel.send('No matching results')

          } else {
            var data = data + '\n'
            var data = data.split('\n')
            console.log(data);
            var i = 0
            var info = `${code[1]}'s info is...\n`
            while (i < data.length) {
                var info = `${info}\n${data[i]}`
                i++
                console.log(data[i]);
              }
            msg.channel.send(info)

            }
        })

      } catch (e) {
        console.error(e);
      }
    }
/*------------------------------------------------------------------------------------*/
<<<<<<< HEAD


    if(msg.content.startsWith('!watch ')) {
=======
    if (commad == '!game ') {

>>>>>>> d53539d04705273d6e3b27a23619e64a27b17c2d
      var code = msg.content.split(' ') //coed =array
      msg.channel.send('Game is update!')
      var game = ''
      var i = 2
      while (i < code.length) {
        var game = game + ' ' +code[i]
        i++
      }
<<<<<<< HEAD
      client.user.setActivity(game, { type: 'WATCHING' })
=======
      client.user.setActivity(game, { type: code[1] })
>>>>>>> d53539d04705273d6e3b27a23619e64a27b17c2d
      console.log(`Game has updata by ${msg.author.username}`);

    }else if (commad == '!game') {
      msg.channel.send(`${type} ${game}`)
    }
<<<<<<< HEAD
    if(msg.content.startsWith('!listen ')) {
=======

    //
    if(msg.content.startsWith('!watch ')) {
>>>>>>> d53539d04705273d6e3b27a23619e64a27b17c2d
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
    //
    if(commad === '!code') {
      msg.channel.send(`Team battle bot\'s source code is
https://github.com/kimsj5025/Team-battle-bot.git`)
    }











  }; //본인인지 채크
}); //client.on
client.login(process.env.TOKEN);
