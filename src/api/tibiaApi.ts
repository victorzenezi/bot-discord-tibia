import axios from 'axios';

export class TibiaApi {
    worldName: string;
    TIBIA_DATA_API_URL: string = 'https://api.tibiadata.com/v2/';
    constructor(worldName : string) {
        this.worldName = worldName;
      }
      
      public async getCharacterInformation(characterName : string) {
        const {
          data: {
            characters: {
              data: characterData,
              deaths: kills,
              other_characters: characters,
            }
          }
        } = await axios.get(`${this.TIBIA_DATA_API_URL}characters/${encodeURIComponent(characterName)}.json`);
        return {
          info: characterData,
          kills,
          characters,
        };
      }

      public async getHighscoreByChar(characterName : string, vocation: string) {
        const {
          data: {
            highscores: {
              data: characteres
            }
          }
        } = await axios.get(`${this.TIBIA_DATA_API_URL}highscores/${this.worldName}/Experience/${encodeURIComponent(vocation)}.json`);
        return {
          char: characteres.filter((char: { name: string; }) => char.name === characterName)
        }
      }
    
      public async getGuildInformation(guildUrl : string) {
        const { data: { guild: { members } } } = await axios.get(`${this.TIBIA_DATA_API_URL}guild/${encodeURIComponent(guildUrl)}.json`);
        const response: any[] = [];
        members.forEach(({ characters } : any) => {
          response.push(...characters);
        });
    
        return response;
      }
}

