import guildSchema from '../Models/guild.model'
import { GuildApi } from '../api/tibia/guild.api'

export class GuildService {

    api = new GuildApi();

    public async setupGuild(guildName: any){

        var guild = await this.api.getGuildInformation(guildName);
        console.log(guild.name)
        await guildSchema.exists({name: guildName})
        .then((res) => {
            if(!res){
                guildSchema.create(
                    {
                        name: guild.name,
                        description: guild.description,
                        founded: guild.founded,
                        totalmembers: guild.totalmembers,
                        world: guild.world,
                        war: guild.war,
                        active: guild.active,
                        guildlogo: guild.guildlogo,
                        members: guild.members
                    })
                }
            }
        )   
    }

    
}