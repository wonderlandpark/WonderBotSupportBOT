const Discord = require('discord.js');  //디스코드
var client = new Discord.Client()
client.on("ready", function() {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('DM(개인메세지)', { type: 'WATCHING' })
    
  });
  


client.on("message", function(message) {
    Hook = new Discord.WebhookClient("웹훅아이디", "웹훅토큰");
    server = client.guilds.find((x => x.id === '470028725287780352'))
ch = server.channels.find((x => x.id === '498078831614230548'))
if (message.author.equals(client.user)) return;
if (message.content.startsWith('#reply')){
  if (message.channel.type == "dm") return;
var args = message.content.substring(1).split(" ");
if(message.member.hasPermission('ADMINISTRATOR')){
  if (args[1]||args[2]){
  var all = message.content.slice(8 + args[1].length)
  user = client.users.find((x => x.id === args[1]))
  console.log(user.tag+ ' SENDED ' + all)
}
  

if (!all||!user){
  message.reply('`#reply (ID) [TEXT]`')
}
else
user.send(all)
.then(message.reply('SENDING MSG'))
.catch(error => message.reply('NO PERMISSION TO SEND MESSAGE TO USER'))



}
}
if(message.content.startsWith('#script')){
  if (message.author.id !== '285185716240252929') return
  const request = message.content.slice(7+1)
  const result = new Promise((resolve, reject) => resolve(eval(request)))

  return result.then(output => {
    if (typeof output !== 'string') output = require('util').inspect(output, {
      depth: 0
    })
    if (output.includes(client.token)) output = output.replace(client.token, '(accesstoken was hidden)')
    if (output.length > 1990) console.log(output), output = 'Too long to be printed (content got console logged)'

    return message.channel.send(output, {code: 'JavaScript'})
  }).catch(error => {
    console.error(error)
    error = error.toString()

    if (error.includes(client.token)) error = error.replace(client.token, '(accesstoken was hidden)')

    return message.channel.send(error, {code: 'JavaScript'})
  })
}
if(message.content.startsWith('#exec')){
  if (message.author.id !== '285185716240252929') return
  const { exec } = require('child_process')
  const request = message.content.slice(5+1)

  exec(request, (error, stdout, stderr) => {
    console.log('Attempting to exec handler: ' + request)
    if (error) {
      console.log('An error was printed: ' + error)
      error = error.toString()
      message.channel.send(error, {code: 'bash'})
      return
    }
    if (stdout.includes(client.token)) stdout = stdout.replace(client.token, '(accesstoken was hidden)')
    if (stdout.length > 1990) console.log('Attempted shell prompts: ' + stdout), stdout = 'Too long to be printed (content got console logged)'
    message.channel.send(stdout, {code: 'bash'})
    if (stderr) {
      if (stderr.includes(client.token)) stdout = stderr.replace(client.token, '(accesstoken was hidden)')
      if (stderr.length > 1990) console.log('An error was printed: ' + stderr), stderr = 'Too long to be printed (content got console logged)'
      message.channel.send(stderr, {code: 'bash'})
    }
  })

}
if (message.channel.type !== "dm") return;
console.log(`${message.author.tag}(${message.author.id})\n${message.content}\n${message.createdAt}`)

return Hook.send(`${message.author.tag}(${message.author.id})\n${message.content}\n${message.createdAt}\n #reply ${message.author.id} (답변) 으로 답변해주세요!`)


    

})
client.login('봇토큰');