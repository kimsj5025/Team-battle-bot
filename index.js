var Discord = require('discord.js'); // discord.js를 불러옴
var client = new Discord.Client(); // 새로운 디스코드 클라이언트를 만듬
var fs = require('fs'); //fs 파일을 불러옴
const config = require('./config');//token
var i = 0
var e = ''



fs.mkdir('./info',{}, function () {
  console.log(`mkdir './info'`);
})
fs.mkdir('./vid',{}, function () {
    console.log(`mkdir './vid'`);
})
fs.mkdir('./tag', {}, function(){
  console.log(`mkdir './tag'`);
})

console.log(`Starting bot...`);


client.on('ready', () => {
  console.log(`Discord bot is ready!`);
  console.log(`Login by ${client.user.tag}`);
  var game = Math.floor(client.uptime) + 'ms'
  client.user.setActivity(game, { type: 'PLAYING' })
});






client.on('message', msg => {

  var game = 'ping : ' + Math.floor(client.uptime) + 'ms'
  client.user.setActivity(game, { type: 'PLAYING' })

  var command = msg.content

  var myname = client.user.tag.split('#')


  
  if (msg.author.username !== myname[0]) {


    if(msg.channel.type == 'dm') return;


    if (msg.content.startsWith('!add ')) {
    var code = msg.content.split(' ') //coed =array
    var sentence = ''
    var i = 2
                             //!add code style title
                             // 0     1    2     3
    var sentence = `
${code[2]}
${code[3]}
${msg.author.username}`
    fs.writeFile(`info/${code[1]}`,sentence,function(e){
       if (e === null) {

       console.log('writeFile is success!');
       msg.channel.send(`<@${msg.author.id}>,\nYour level is submitted!

Level code : ${code[1]}
Level name : ${code[3]}
Level style : ${code[2]}`)
      fs.writeFileSync(`vid/${code[1]}`,'')
      fs.writeFileSync(`tag/${code[1]}`,'')

        } else {

        console.log('fail');
        msg.channel.send(`<@${msg.author.id}>,\nfailed sudmitted level code`)
        msg.channel.send(`\nError is \n${e}`)

        }
    });
  }
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
            var link = fs.readFileSync(`./vid/${code[1]}`, 'utf8')
            var links = link.split('\n')
            var tag = fs.readFileSync(`./tag/${code[1]}`, 'utf8')

            if (e !== null) {
              msg.channel.send(`${e}`)
            }else {
              msg.channel.send(embed(`made by ${data[3]}`, code[1], data[2], data[1], links[1], links[2], links[3], tag))
            }

          }
        })

      } catch (e) {
        console.error(e);
      }
    }
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


    if (command.startsWith('!removevid ')) {
      var data = command.split(' ')
      fs.unlink(`./vid/${data[1]}`, function (e) {
        if (e == null) {
          msg.channel.send(`<@${msg.author.id}>,\nDelete level ${data[1]}`)
        }else {
          msg.channel.send(`error! \n${e}`)
        }
      });
    }
    

    if (command.startsWith('!reupload ')) {
      var code = command.split(' ')
      fs.renameSync(`./info/${code[1]}`, `./info/${code[2]}` )
      fs.renameSync(`./vid/${code[1]}`, `./vid/${code[2]}` )
      msg.channel.send({embed: {
        color: 3447003,
        title: "reupload!",
        description: `${code[1]} => ${code[2]}`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL(),
          text: "© Team battle bot"
        }
      }});
    }


    if (msg.content.startsWith('!addtag ')) {
      var code = msg.content.split(' ') //coed =array
      var sentence = code[2]
      var i = 3
      while (i < code.length) {

        var sentence = sentence + ', ' + code[i]
        i++
      }
      var sentence = sentence + '\n'
      fs.writeFile(`tag/${code[1]}`,sentence,function(e){
        if (e === null) {

          console.log('writeFile is success!');
          msg.channel.send(`<@${msg.author.id}>,\nYour tag is submitted!`)

        } else {

          console.log('fail');
          msg.channel.send(`<@${msg.author.id}>,\nfailed sudmitted tags`)
          msg.channel.send(`\nError is \n${e}`)

        }
      });
    }


    if (command.startsWith('!removetag ')) {
      var data = command.split(' ')
      fs.writeFile(`./tag/${data[1]}`,'no tags' , function (e) {
        if (e == null) {
          msg.channel.send(`<@${msg.author.id}>,\nDelete tag ${data[1]}`)
        }else {
          msg.channel.send(`error! \n${e}`)
        }
      });
    }


    switch (msg.content) {

      

      case '!random':
        fs.readdir(`./info`, 'utf8', function(e, data) {

              var random = Math.random()
              var random_ = Math.floor(random * data.length)
              fs.readFile(`./info/${data[random_]}`, 'utf8', function(e, d) {
                var d = d.split('\n')
                var link = fs.readFileSync(`./vid/${data[random_]}`, 'utf8')
                var links = link.split('\n')
                var tag = fs.readFileSync(`./tag/${data[random_]}`, 'utf8')
                msg.channel.send(embed('Random level!', data[random_], d[2], d[1], links[0], links[1], links[2], tag))
              })
            })
        break;



      case '!code':
      msg.channel.send(`Team battle bot\'s source code is
https://github.com/kimsj5025/Team-battle-bot.git`)
        break;



      case '!msg':
        console.log(msg)
        break;



      case '!list':
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
          if (e === null) {
            msg.channel.send(`<@${msg.author.id}>,${dirs}`)
          }else {
            msg.channel.send(`error!\n${e}`)
          }
        }
      })



        break;



      case '!help':
      msg.channel.send(`!add - submit level

!list - Show your level

!info - Show level's info

!code - Show bot's source code`)
        break;



      case '!ping':
        msg.channel.send('Pong! `' + Math.floor(client.uptime) + ' ms`')
        break;



      case '!embed':
    msg.channel.send(embed('title', 'aaa-aaa-aaa','good_level', '3DW', 'https://naver.com', 'https://naver.com'))
        break;
    }











  }; //name =/ myname
}); //client.on


client.login(process.env.TOKEN);
//process.env.TOKEN
//config.token

function embed(title, lev_code, lev_name, style, link1, link2, link3, tag) {
return {embed: {
  color: 3447003,
  author: {
    name: title,
    icon_url: client.user.avatarURL()
  },
  title: lev_code,
  description: lev_name,
  fields: [{
    name: "style",
    value: style
  },
  {
    name: "Clear vids",
    value: `[:clapper:](${link1}) [:clapper:](${link2}) [:clapper:](${link3})`
  },
  {
    name: "tags",
    value: tag
  }
  ],
  timestamp: new Date(),
  footer: {
    icon_url: client.user.avatarURL(),
    text: "© Team battle bot"
  }
}//embed
}//return ;
}//function