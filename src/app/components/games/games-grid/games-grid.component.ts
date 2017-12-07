import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GameService } from '../../../services/game.service';
import { Game } from '../../../models/game.model';

@Component({
  selector: 'app-games-grid',
  templateUrl: './games-grid.component.html',
  styleUrls: ['./games-grid.component.css']
})
export class GamesGridComponent implements OnInit, OnDestroy {
  games : Game[];
  subscription : Subscription;

  constructor(
    private gameservice: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.gameservice.gamesChanged
    .subscribe(
      (games: Game[]) => {
        this.games = games;
      }
    );
    this.gameservice.getGames()
      .then(games => this.games = games)
      .catch(error => console.log(error));
  }

  onNewGame(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
