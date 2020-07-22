import { Message } from "discord.js";
import { Guild } from "./guild";
import { Xp } from "./xp";
import { Task } from "./task";

export abstract class Command{
    public abstract execute() : any;
    public abstract sendMsg(msg : Message) : any;
}

export class BasicCommannd implements Command{
    public execute() {
        throw new Error("Method not implemented.");
    }
    public sendMsg(msg: Message) {
        
    }
}

export class CommandFactory{

    public static Create(commandName : any, msg : Message) : Command{
        switch(commandName){
            case 'guild':
                return new Guild(msg);
            case 'task':
                return new Task(msg);
            case 'xp':
                return new Xp(msg);
            default:
                return new BasicCommannd();
        }
    }

}