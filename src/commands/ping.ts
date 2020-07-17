import { Message, Client } from 'discord.js';
import { Command } from './command';

export class Ping implements Command {


    constructor(){}
    
    execute(bot: Client) {
        bot.on("message", (message : Message) => {
            if(message.author.bot) return;
            message.reply("pong pong pong!");
        });
    }

    sendMsg(msg : Message){
        msg.reply("poooooooooonng");
    }

}
