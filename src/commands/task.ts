import { Message } from 'discord.js';
import { Command } from './command';
import { dailyTasks } from '../tasks/dailyExp';
import { Xp } from '../commands/xp';

export class Task implements Command {

    message: Message;
    dailyXp: Xp;

    constructor(msg: Message){
        this.message = msg;
        this.dailyXp = new Xp(msg);
    }

    public execute() {
        
    }

    async sendMsg(msg : Message){
        await this.dailyXp.updateCharactersParty();
        this.startTask(msg);
    }

    startTask(msg: Message){
        dailyTasks(msg);
    }

}
