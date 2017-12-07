import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../../../models/game.model';
import { GameService } from '../../../../services/game.service';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit {
  @Input() game: Game;
  @Input() index: number;
  
  constructor() { }

  ngOnInit() {
    
  }

}
