import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GameService } from '../../../services/game.service';
import { Game } from '../../../models/game.model';
import { Character } from '../../../models/character.model';
import { CharacterService } from '../../../services/character.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  game: Game;
  character : Character;
  id : number;

  constructor(
    private gameservice: GameService,
    private characterservice: CharacterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.game = this.gameservice.currentGame;
    this.route.params
      .subscribe(
        (params: Params) => {
          //lees de parameters in de url
          this.id = +params['cid'];
          this.gameservice.getGameCharacters(this.game._id)
          .then((characters) => {
            this.character = characters[this.id];
            console.log( "description : " + this.character.description)
          })
          .catch(error => console.log(error));
        }
      );
  }

  onEditCharacter(){
    this.router.navigate(['edit'],{relativeTo: this.route})
  }

  onDeleteCharacter(){
    this.characterservice.deleteCharacter(this.character._id);
    this.router.navigate(['../']);
  }
}
