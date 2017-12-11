//
// Domain class
//

export class Developer {
    
        public _id
        public name: string;
        public imagePath: string;
    
        constructor(name: string, desc: string , ImagePath: string) {
            this.name = name;
            this.imagePath = ImagePath;
        }
    
    }   