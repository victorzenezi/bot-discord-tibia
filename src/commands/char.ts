import { Message, Client } from 'discord.js';
import { Command } from './command';
import { TibiaApi } from '../api/tibiaApi';
import { Level } from '../utils/level';
import { type } from 'os';

export class Char implements Command {

    world = 'Antica';
    api : TibiaApi
    bot : Client
    lvlCalculator : Level

    constructor(bot: Client){
        this.api = new TibiaApi(this.world);
        this.bot = bot;
        this.lvlCalculator = new Level();
    }
    
    execute(bot: Client) {
        bot.on("message", (message : Message) => {
            if(message.author.bot) return;
            message.reply("char char char!");
        });
    }

    sendMsg(msg : Message){
        msg.reply('teste');

        // this.getChar(msg);
        this.getRankPt(msg);
    }

    async getChar(msg : Message){

        const nome = msg.content.split(" ");

        console.log(nome[1] + nome[2]);
        const response =  await this.api.getCharacterInformation(nome[1] + ' ' + nome[2])  
        .then((response) => {
            console.log(response);
            msg.reply(response.info.name);
            msg.reply(response.info.level); 
            msg.reply(response.info.world);

            var exp = this.lvlCalculator.getExperienceByLevel(response.info.level);
            msg.reply(exp);
          })
          .catch((error) => {
            console.log(error);
          });

        console.log(response);
    }

    async getRankPt(msg : Message){

        const party = {
            Knight: "Victor Entwickler",
            Druid: "Souza da Cut",
            Paladin: "Uhttred Ragnarsson",
            Sorcerer: "Bielhound Vishur Domal"
        }
        
        const party2 = {
            Knight: "Laharu",
            Druid: "Mixsoul",
            Paladin: "Daamiiano",
            Sorcerer: "Dahlin"
        }

        await this.api.getHighscoreByChar(party2.Sorcerer, 'Sorcerer')
            .then((response) => {
                msg.reply(response.char[0].points);
                msg.reply(response.char[0].name); 
            })
            .catch((error) => {
                console.log(error);
            });

        await this.api.getHighscoreByChar(party2.Knight, 'Knight')
            .then((response) => {
                msg.reply(response.char[0].points);
                msg.reply(response.char[0].name); 
            })
            .catch((error) => {
                console.log(error);
            });
            
        await this.api.getHighscoreByChar(party2.Druid, 'Druid')
            .then((response) => {
                msg.reply(response.char[0].points);
                msg.reply(response.char[0].name); 
            })
            .catch((error) => {
                console.log(error);
            });

        await this.api.getHighscoreByChar(party2.Paladin, 'Paladin')
            .then((response) => {
                msg.reply(response.char[0].points);
                msg.reply(response.char[0].name); 
            })
            .catch((error) => {
                console.log(error);
            });
    }
}