import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GameService } from '../../../services/game.service';
import { Game } from '../../../models/game.model';

@Component({
  selector: 'app-games-detail',
  templateUrl: './games-detail.component.html',
  styleUrls: ['./games-detail.component.css']
})
export class GamesDetailComponent implements OnInit {
  game : Game;
  id : number;

  constructor(
    private gameservice: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.gameservice.getGame(this.id)
          .then(game => this.game = game)
          .catch(error => console.log(error));
      }
    );
  }

  onShowDetails(){
    this.router.navigate(['details'],{relativeTo: this.route})
  }

  onEditGame(){
    this.router.navigate(['edit'],{relativeTo: this.route})
  }

  onDeleteGame(){
    this.gameservice.deleteGame(this.id);
    this.router.navigate(['/games']);
  }

}
