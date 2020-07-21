import { Message, Client } from 'discord.js';
import { Command } from './command';
import cron from 'node-cron';
import { Xp } from '../commands/xp';

export class Task implements Command {

    bot: Client;

    constructor(bot: Client){
        this.bot = new Client();
    }

    public execute(bot: Client) {
        throw new Error("Method not implemented.");
    }

    sendMsg(msg : Message){
        this.startTask(msg);
    }

    startTask(msg: Message){
        var xpdiaria = new Xp(this.bot)

        console.log("task iniciada");

        cron.schedule("0 5 * * * ", function() {
          msg.channel.send("Bom dia Tibianos, bora rushar! CHAMA CHAMA")
        });

        cron.schedule("5 23 * * * ", function() {
            msg.channel.send("teste do teste para testar")
          });

        // cron.schedule("*/10 * * * * *", function() {
        // msg.channel.send("teste do teste para testar")
        // });

        cron.schedule("0 5 * * * ", function() {
          xpdiaria.sendMsg(msg);
        });
    }

}
