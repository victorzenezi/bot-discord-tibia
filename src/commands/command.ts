import { Client, Message } from "discord.js";
import { Ping } from "./ping";
import { Char } from "./char";

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
            case 'ping':
                return new Ping();
            case 'char':
                return new Char(bot);
            default:
                return new BasicCommannd();
        }
    }

}