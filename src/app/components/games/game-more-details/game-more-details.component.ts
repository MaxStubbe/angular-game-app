import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Game } from '../../../models/game.model';
import { GenreService } from '../../../services/genre.service';

@Component({
  selector: 'app-game-more-details',
  templateUrl: './game-more-details.component.html',
  styleUrls: ['./game-more-details.component.css']
})
export class GameMoreDetailsComponent implements OnInit {
  game : Game;
  id : number;
  Loaded: Boolean = false;
  suggestions : String[];

  constructor(
    private gameService: GameService,
    private genreService: GenreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.gameService.getGames()
    .then(() => { 
      this.route.params
      .subscribe(
        (params : Params) => {
          this.id = +params["id"]
          this.gameService.getGame(this.id)
          .then(game => 
            {
              this.game = game;
              this.Loaded = true;
              this.gameService.changeGame(game);
              console.log("dit is de game more details: " + this.gameService.currentGame.name);
              this.genreService.getSugestions(this.game)
              .then(suggestions => this.suggestions = suggestions)
              .catch(error => console.log(error));
            }            
          )
          .catch(error => console.log(error));
        }
      )
    })
    .catch(error => console.log(error));
  }

  onDeleteGame(){
    this.gameService.deleteGame(this.id);
    this.router.navigate(['/games']);
  }

}
