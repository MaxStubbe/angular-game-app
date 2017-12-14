import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

import { GameService } from '../../../services/game.service';
import { Game } from '../../../models/game.model';
import { Developer } from '../../../models/developer.model';
import { Input } from '@angular/core';
import { DeveloperService } from '../../../services/developer.service';

@Component({
  selector: 'app-developer-new',
  templateUrl: './developer-new.component.html',
  styleUrls: ['./developer-new.component.css']
})
export class DeveloperNewComponent implements OnInit {
  game: Game;
  id: number;
  developerForm: FormGroup;
  gameid: number;

  constructor(
    private route: ActivatedRoute,
    private developerService: DeveloperService,
    private gameService: GameService, 
    private router: Router) {}

  ngOnInit() {
    this.game = this.gameService.currentGame;
    this.initForm();
  }

  onSubmit() {
      console.log("submit " + this.game.name);
        this.developerService.addDeveloper(this.developerForm.value, this.game._id );
        this.onCancel();
  }

  onCancel() {
    //ga terug naar de vorige route
    this.router.navigate(["../../../details"], {relativeTo: this.route});
  }

  private initForm() {
    let developerName = '';
    let developerImagePath = '';

    this.developerForm = new FormGroup({
      'name': new FormControl(developerName, Validators.required),
      'imagePath': new FormControl(developerImagePath, Validators.required)
    });
  }

}
