global.__main = __dirname;

require('dotenv').config();
const config = require(`${__main}/config/config.json`);
const { Client, Intents } = require('discord.js');


global.bot = new Client({ intents: new Intents(config.intents) });

bot.on('ready', () => {
  console.log("Привет хозяйка, я проснулся.");
});

/*bot.on('messageCreate', (message) => {
  if (message.author.bot) return;
  console.log(message.content)
  message.channel.send(`${message.author} написал: ${message.content}`);
});*/

bot.on('messageReactionAdd', (react) => {
  react.message.channel.send(`жабайка тыкает реакции.${react}`);
});

bot.on('messageCreate', (message) => {

  const prefix = '.';
  const content = message.content.trim();

  if (message.author.bot) return;
  if (!content.startsWith(prefix)) return;

  let splittedContent = content.replace(/\s+/g, ' ').split(' ');

  let commandName;
  let commandArguments;
  if (splittedContent[0] == prefix) {
    commandName = splittedContent[1];
    commandArguments = splittedContent.slice(2);
  }
  else {
    commandName = splittedContent[0].slice(prefix.length);
    commandArguments = splittedContent.slice(1);
  }

  const fs = require('fs');
  const commands = fs.readdirSync(`${__main}/commands/`).filter(f => f.endsWith(".js"));

  for (let command of commands) {
    command = require(`${__main}/commands/${command}`);
    if (commandName == command.name) return command.execute(message, commandArguments);
    if (command.aliases.includes(commandName)) return command.execute(message, commandArguments);
  }

});



bot.login(process.env.TOKEN);

