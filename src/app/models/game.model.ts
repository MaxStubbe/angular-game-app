//
// Domain class
//

import { Character } from './character.model';

export class Game {

    public _id
    public name: string;
    public description: string;
    public imagePath: string;
    public characters: Character[];

    constructor(name: string, desc: string , ImagePath: string, characters: Character[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = ImagePath;
        this.characters = characters;
    }

}   