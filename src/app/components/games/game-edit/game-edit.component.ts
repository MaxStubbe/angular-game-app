import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { GameService } from '../../../services/game.service';
import { Game } from '../../../models/game.model';


@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  id: number;
  editMode = false;
  gameForm: FormGroup;
  currentgame: Game;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
    if(this.editMode){
      this.gameService.getGame(this.id)
        .then(game => this.currentgame = game)
        .catch(error => console.log(error));
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.gameService.updateGame(this.id, this.gameForm.value);
    } else {
      this.gameService.addGame(this.gameForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let gameName = '';
    let gameImagePath = '';
    let gameDescription = '';
    let currentgame;

    if (this.editMode) {
      this.gameService.getGame(this.id)
      .then(
        game => {
        currentgame = game;
        gameName = currentgame.name;
        gameImagePath = currentgame.imagePath;
        gameDescription = currentgame.description;
        }
      )
      .catch(error => console.log(error));
      
    }

    this.gameForm = new FormGroup({
      'name': new FormControl(gameName, Validators.required),
      'imagePath': new FormControl(gameImagePath, Validators.required),
      'description': new FormControl(gameDescription, Validators.required)
    });
  }
}
