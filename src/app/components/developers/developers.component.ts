import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core';

import { Game } from '../../models/game.model';
import { Output } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {
  @Input() game: Game;
  
  constructor(private gameService: GameService) {}
  

  ngOnInit() {
  }

}
