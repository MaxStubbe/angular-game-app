//
// Domain class
//

import { Character } from './character.model';
import { Developer } from './developer.model';

export class Game {

    public _id
    public name: string;
    public description: string;
    public imagePath: string;
    public genres: string[];
    public characters: Character[];
    public developers: Developer[];

    constructor(name: string, desc: string , ImagePath: string, characters: Character[], developers: Developer[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = ImagePath;
        this.characters = characters;
        this.developers = developers;
    }

}   