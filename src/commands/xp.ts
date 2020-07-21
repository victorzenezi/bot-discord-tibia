import { Message, Client, MessageEmbed } from 'discord.js';
import { Command } from './command';
import { TibiaApi } from '../api/tibiaApi';
import { Level } from '../utils/level';
import { CharService } from '../services/charService';
import { Char } from '../Models/char.model';

export class Xp implements Command {

    world = 'Relembra';
    api : TibiaApi
    bot : Client
    lvlCalculator : Level
    charService: CharService

    constructor(bot: Client){
        this.api = new TibiaApi(this.world);
        this.charService = new CharService();

        this.bot = bot;
        this.lvlCalculator = new Level();
    }

    party = {
        Knight: "Victor Entwickler",
        Druid: "Souza da Cut",
        Paladin: "Uhttred Ragnarsson",
        Sorcerer: "Bielhound Vishur Domal"
    }
    
    execute(bot: Client) {
        bot.on("message", (message : Message) => {
            if(message.author.bot) return;
            message.channel.send("command default");
        });
    }

    async sendMsg(msg : Message){

        // await this.updateCharactersParty();

        var ek = await this.charService.getCharacter(this.party.Knight);
        var ed = await this.charService.getCharacter(this.party.Druid);
        var ms = await this.charService.getCharacter(this.party.Sorcerer);
        var rp = await this.charService.getCharacter(this.party.Paladin);

        var bestOfTheDay = this.getBestDailyXp([ek, ed, ms, rp]);

        var card = new MessageEmbed();

        card.setColor('#d62828');
        card.setAuthor('Tibia Data', 'https://i.imgur.com/LOH4eAn.png')
        card.addField('Experiencia diária da Party', 'relembrinha tictac');
        card.addField('Resultado Diário', '\u200B');
        card.addField('MELHOR XP: ', bestOfTheDay.nick + " " + bestOfTheDay.xp + " xp");
        card.addField('-----------------------------------------------------------', '\u200B');
        card.addFields(
            { name: 'Nick', value: ek.name, inline: true },
            { name: 'Level', value: ek.level, inline: true },
            { name: 'Xp Gained', value: this.formatExp(ek.dailyExp), inline: true },
        );
        card.addFields(
            { name: 'Nick', value: ed.name, inline: true },
            { name: 'Level', value: ed.level, inline: true },
            { name: 'Xp Gained', value: this.formatExp(ed.dailyExp), inline: true },
        );
        card.addFields(
            { name: 'Nick', value: ms.name, inline: true },
            { name: 'Level', value: ms.level, inline: true },
            { name: 'Xp Gained', value: this.formatExp(ms.dailyExp), inline: true },
        );
        card.addFields(
            { name: 'Nick', value: rp.name, inline: true },
            { name: 'Level', value: rp.level, inline: true },
            { name: 'Xp Gained', value: this.formatExp(rp.dailyExp), inline: true },
        );
        card.addField('\u200B', '\u200B');
        card.setTimestamp();
        card.setFooter('powered by TibiaData ( tibiadata.com )');


        msg.channel.send("Os dados da sua pt foram atualizados com sucesso! :thumbsup:", card);

    }

    async updateCharactersParty(){

        await this.api.getHighscoreByChar(this.party.Sorcerer, 'Sorcerer')
            .then( async (response) => {
                this.charService.updateCharacters(response.char[0]);
            })
            .catch((error) => {
                console.log(error);
            });

        await this.api.getHighscoreByChar(this.party.Knight, 'Knight')
            .then((response) => {
                this.charService.updateCharacters(response.char[0]);
            })
            .catch((error) => {
                console.log(error);
            });
            
        await this.api.getHighscoreByChar(this.party.Druid, 'Druid')
            .then((response) => {
                this.charService.updateCharacters(response.char[0]);
            })
            .catch((error) => {
                console.log(error);
            });

        await this.api.getHighscoreByChar(this.party.Paladin, 'Paladin')
            .then((response) => {
                this.charService.updateCharacters(response.char[0]); 
            })
            .catch((error) => {
                console.log(error);
            });
    }

    private formatExp(exp: any): string{
        if(exp !== undefined){
            return   exp > 0 ? ':green_circle: ' +  exp  : ':red_circle: ' +  exp
        }
        return '0';
    }

    private getBestDailyXp(chars: Char[]) : any{
        var best = {
            xp: 0,
            nick: ''
        }

        chars.forEach(char => {
            if(char.dailyExp !== undefined && char.name !== undefined)
            {
                if(char.dailyExp > best.xp)
                    best.xp = char.dailyExp;
                    best.nick = char.name
            }
        });

        return best;
    }

}