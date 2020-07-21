import cron from 'node-cron';
import { Message, Client} from 'discord.js';
import { Xp } from '../commands/xp';

export const dailyTasks = (bot: Client, msg: Message) => {
  
    var xpdiaria = new Xp(bot)

    cron.schedule("0 5 * * * *", function() {
      msg.channel.send("Bom dia Tibianos, bora rushar! CHAMA CHAMA")
    });

    cron.schedule("0 5 * * * *", function() {
      xpdiaria.sendMsg(msg);
    });

}