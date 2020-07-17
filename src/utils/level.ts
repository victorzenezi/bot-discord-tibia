export class Level {

    public getExperienceByLevel(level: number) : any{
        var lvl = level - 1;
        return (50 * lvl * lvl * lvl - 150 * lvl * lvl + 400 * lvl) / 3
    }
}