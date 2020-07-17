import { config } from 'dotenv';
import { Client, Message, Collection } from 'discord.js';
import { prefix } from './utils/config.json';
import { CommandFactory, BasicCommannd } from './commands/command';
import { type } from 'os';

config();
const bot = new Client();
bot.login(process.env.DISCORD_TOKEN);

bot.on("ready", () => {
    console.log("Bot foi iniciado.");
})

bot.on("message", (message : Message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift();

    console.log(cmd);

    const command = CommandFactory.Create(cmd, bot);

    if(typeof(command) !== typeof(BasicCommannd))
        command.sendMsg(message);
    else
        message.reply("Comando inválido");

});