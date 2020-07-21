import { Client, Message } from 'discord.js';
import { config } from 'dotenv';
import { prefix } from './utils/config.json';
import { CommandFactory, BasicCommannd } from './commands/command';
import connect from './utils/Connections/Database/connect'

config();

const bot = new Client();
bot.login(process.env.DISCORD_TOKEN);

bot.on("ready", () => {
    console.log("Bot foi iniciado.");

    const uri = process.env.CONNECTION_STRING;

    connect(uri as string);

    // var service = new GuildService();
    // service.setupGuild("Breaking Away");
})

bot.on("message", (message : Message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift();
    const command = CommandFactory.Create(cmd, bot);

    if(typeof(command) !== typeof(BasicCommannd))
        command.sendMsg(message);
    else
        message.reply("Comando inválido");
});