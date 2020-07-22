import { Message } from 'discord.js';
import { Command } from './command';
import { dailyTasks } from '../tasks/dailyExp';

export class Task implements Command {

    message: Message;

    constructor(msg: Message){
        this.message = msg;
    }

    public execute() {
        
    }

    sendMsg(msg : Message){
        this.startTask(msg);
    }

    startTask(msg: Message){
        dailyTasks(msg);
    }

}
