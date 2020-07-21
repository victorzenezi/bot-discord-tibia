import { Message, Client, MessageEmbed } from 'discord.js';
import { Command } from './command';
import { GuildApi } from '../api/tibia/guild.api';

export class Guild implements Command {

    world = 'Relembra';
    guildApi : GuildApi
    bot : Client


    constructor(bot: Client){
        this.bot = bot;
        this.guildApi = new GuildApi();
    }

    public execute(bot: Client) {
        throw new Error("Method not implemented.");
    }

    public async sendMsg(msg: Message) {
        // var guild = await this.guildApi.getGuildInformation("Breaking Away");
        var members = await this.guildApi.getMembersGuild("Breaking Away");
        
        // msg.channel.send(guild.name);
        members.forEach(member => {
            msg.channel.send(member.name + " | " + member.level);
        });
    }

}