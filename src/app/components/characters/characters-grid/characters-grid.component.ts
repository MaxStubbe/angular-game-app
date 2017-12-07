import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params, ParamMap} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Game } from '../../../models/game.model';
import { Character } from '../../../models/character.model';
import { GameService } from '../../../services/game.service'; 
import { CharacterService } from '../../../services/character.service';
import { Input } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-characters-grid',
  templateUrl: './characters-grid.component.html',
  styleUrls: ['./characters-grid.component.css']
})
export class CharactersGridComponent implements OnInit {
  
  @Input() game: Game;
  characters: Character[];
  subscription : Subscription;
  
    constructor(private route: ActivatedRoute,
                private gameService: GameService,
                private characterService: CharacterService,
                private router: Router) {
    }

  ngOnInit() {
    this.gameService.getGameCharacters(this.game._id)
    .then(characters => this.characters = characters)
    .catch(error => console.log(error));
    console.log("grid component " + this.game.name)
  }

  onNewCharacter(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
  }
}
