module.exports = {
  
  name: 'k',
  aliases: [ 'к', 'календарь' ],
  execute: (message, arguments) => {
    let lol = arguments[0];
    switch (lol) {
      case '1':
        message.channel.send("понедeльник");
        break;
      case '2':
        message.channel.send("вторник");
        break;
      default:
        message.channel.send("больше дней недели я не знаю");
  
    }
  }
};