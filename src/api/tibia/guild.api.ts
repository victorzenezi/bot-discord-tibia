import axios from 'axios';

export class GuildApi {
    
    TIBIA_DATA_API_URL: string = 'https://api.tibiadata.com/v2/';

    public async getMembersGuild(guildName : string) {
        const { data: { guild: { members } } } = await axios.get(`${this.TIBIA_DATA_API_URL}guild/${encodeURIComponent(guildName)}.json`);
        const response: any[] = [];
        members.forEach(({ characters } : any) => {
          response.push(...characters);
        });
    
        console.log(response);
        return response;
      }

      public async getGuildInformation(guildName : string) {
        const { data: { guild } } = await axios.get(`${this.TIBIA_DATA_API_URL}guild/${encodeURIComponent(guildName)}.json`);
        return guild;
      }
}