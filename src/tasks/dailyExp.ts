import cron from 'node-cron';
import { Message } from 'discord.js';

export const startTask = (bot: Message) => {

    cron.schedule("*/10 * * * * *", function() {
        console.log("running a task every 10 second ");
      });

}