import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  providers: [ GameService ]
})
export class GamesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
