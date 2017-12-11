import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { Game } from '../../models/game.model';
import { Output } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  game : Game = null

  constructor(private gameService: GameService) {}

  ngOnInit() {
      this.gameService.changeGame(null);
  }
}
