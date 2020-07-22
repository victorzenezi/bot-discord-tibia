import cron from 'node-cron';
import { Message, Client} from 'discord.js';
import { Xp } from '../commands/xp';

export const dailyTasks = (msg: Message) => {
  
    var xpdiaria = new Xp(msg)
    console.log("As tasks foram iniciadas.");

    cron.schedule("0 8 * * * ", function() {
      msg.channel.send("Bom dia Tibianos, bora rushar! CHAMA CHAMA")
    });

    cron.schedule("0 8 * * * ", function() {
      xpdiaria.execute();
    });
}