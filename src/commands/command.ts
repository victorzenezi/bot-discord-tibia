import { Client, Message } from "discord.js";
import { Guild } from "./guild";
import { Xp } from "./xp";
import { Task } from "./task";

export abstract class Command{
    public abstract execute(bot : Client) : any;
    public abstract sendMsg(msg : Message) : any;
}

export class BasicCommannd implements Command{
    public execute(bot: Client) {
        throw new Error("Method not implemented.");
    }
    public sendMsg(msg: Message) {
        msg.reply("Comando Inválido.");
    }
}

export class CommandFactory{

    public static Create(commandName : any, bot : Client) : Command{
        switch(commandName){
            case 'guild':
                return new Guild(bot);
            case 'xp':
                return new Xp(bot);
            case 'task':
                return new Task(bot);
            default:
                return new BasicCommannd();
        }
    }

}