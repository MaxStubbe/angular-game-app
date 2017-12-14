import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GenreService } from '../../services/genre.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  providers: [ GameService ]
})
export class GamesComponent implements OnInit {

  constructor(private genreService: GenreService) { }

  ngOnInit() {
  }

}
