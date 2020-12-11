var Discord = require('discord.js'); // discord.js를 불러옴
var client = new Discord.Client(); // 새로운 디스코드 클라이언트를 만듬
var config = require('./Config.json'); //config.json 파일을 불러옴
var fs = require('fs'); //fs 파일을 불러옴
var game = 'Team battle bot'
var i = 0
var e = ''
fs.mkdir('./info',{}, function () {
  console.log(`mkdir './info'`);
})
fs.mkdir('./vid',{}, function () {
    console.log(`mkdir './vid'`);
})
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
/*------------------------------------------------------------------------------------*/
    if (msg.content.startsWith('!add ')) {
    var code = msg.content.split(' ') //coed =array
    var sentence = ''
    var i = 2
    while (i < code.length) {

      var sentence = sentence + '\n' + code[i]
      i++
    }
    var sentence = sentence + '\n'
    fs.writeFile(`info/${code[1]}`,sentence,function(e){
       if (e === null) {

       console.log('writeFile is success!');
       msg.channel.send(`<@${msg.author.id}>,\nYour level is submitted!

Level code : ${code[1]}
Level name : ${code[3]}
Level style : ${code[2]}`)

        } else {

        console.log('fail');
        msg.channel.send(`<@${msg.author.id}>,\nfailed sudmitted level code`)
        msg.channel.send(`\nError is \n${e}`)

        }
    });
  }
/*------------------------------------------------------------------------------------*/
    if (msg.content === '!list') {
      fs.readdir('./info', function(e, filelist){
        if (filelist === '') {
          msg.channel.send(`\nWe have no level`)
        }else {
          var i = 0
          var dirs = `We're level list is\n`
          while (i < filelist.length) {
            //filelist는 맵 코드
            var data = fs.readFileSync(`./info/${filelist[i]}`, 'utf8');
            var data = data.split('\n')
            var dirs = dirs + '\n' +filelist[i]
            var dirs = `${dirs} - \`${data[2]}\``
            i++
          }
          msg.channel.send(`<@${msg.author.id}>,${dirs}`)
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
        fs.readFile(`./info/${code[1]}`, 'utf8', function(e, data) {
          var vid = fs.readFileSync(`./vid/${code[1]}`, 'utf8').split('\n')

          if (msg.content === '!info') {

            msg.channel.send('No matching results')

          } else {
            var data = data + '\n'
            var data = data.split('\n')
            var i = 0
            var info = `${code[1]}'s info is...`
            while (i < data.length) {
              var info = `${info}\n${data[i]}`
              i++
            }
            var i = 1
            var info = info + 'level\'s vid is...'
            while (i < vid.length) {
              var info = `${info}\n${vid[i]}`
              i++
            }
            if (e !== null) {
              msg.channel.send(`${e}`)
            }else {
              msg.channel.send(`<@${msg.author.id}>,\n${info}`)
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
    if(command.startsWith('!removelevel ')) {
      var data = command.split(' ')
      fs.unlink(`./info/${data[1]}`, function (e) {
        if (e == null) {
          msg.channel.send(`<@${msg.author.id}>,\nDelete level ${data[1]}`)
        }else {
          msg.channel.send(`error! \n${e}`)
        }
      });
    }
/*------------------------------------------------------------------------------------*/
    if(command === '!code') {
      msg.channel.send(`Team battle bot\'s source code is
https://github.com/kimsj5025/Team-battle-bot.git`)
    }
/*------------------------------------------------------------------------------------*/
    if(command === '!msg') {
      console.log(msg);
      msg.channel.send(`<@${msg.author.id}>,\nconsole.log(msg)!`)
    }
/*------------------------------------------------------------------------------------*/
    if (msg.content.startsWith('!addvid ')) {
var code = msg.content.split(' ') //coed =array
var sentence = ''
var i = 2
while (i < code.length) {

  var sentence = sentence + '\n' + code[i]
  i++
}
var sentence = sentence + '\n'
fs.writeFile(`vid/${code[1]}`,sentence,function(e){
   if (e === null) {

   console.log('writeFile is success!');
   msg.channel.send(`<@${msg.author.id}>,\nYour vid is submitted!`)

    } else {

    console.log('fail');
    msg.channel.send(`<@${msg.author.id}>,\nfailed sudmitted vids`)
    msg.channel.send(`\nError is \n${e}`)

    }
});
}









  }; /*본인인지 채크*/
}); //client.on


client.login('Nzc4NTg1MDQyMzg5NTY1NDYw.X7UH0w.olFGPvUTPsujCle82Aif3UGJNcU');
