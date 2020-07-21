import charSchema, { Char } from '../Models/char.model'

export class CharService {

    public async updateCharacters(char: any){
        var experience = 0;
        await charSchema.exists({name: char.name})
            .then((res) => {
                if(!res){
                    charSchema.create(
                        {
                            name: char.name, 
                            level: char.level,
                            vocation: char.vocation,
                            currentExp: char.points,
                            dailyExp: 0
                        })
                }
            }   
        )

        await charSchema.findOne({name: char.name})
            .lean()
            .exec(async (err, res) => {
                if(res?.currentExp !== undefined){
                    experience = res?.currentExp;
                    await charSchema.update({name: char.name},
                         {
                            dailyExp: char.points - experience,
                            level: char.level,
                            currentExp: char.points
                        });
                }
            });
    }

    public async getCharacter(name: string){
        var char = new Char();

        await charSchema.findOne({name: name})
        .lean()
        .then((res) => {
            char.name = res?.name;
            char.currentExp = res?.currentExp;
            char.dailyExp = res?.dailyExp;
            char.level = res?.level;
            char.vocation = res?.vocation;
        });

        return char;
    }
}