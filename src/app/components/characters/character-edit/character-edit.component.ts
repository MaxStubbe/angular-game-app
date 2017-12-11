import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { ActivatedRoute, Router, Params, ParamMap} from '@angular/router';

import { CharacterService } from '../../../services/character.service';
import { GameService } from '../../../services/game.service';
import { Game } from '../../../models/game.model';
import { Character } from '../../../models/character.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.css']
})
export class CharacterEditComponent implements OnInit{
  game:Game;
  id: number;
  editMode = false;
  characterForm: FormGroup;
  currentcharacter: Character;
  gameid: number;

  constructor(
    private route: ActivatedRoute, 
    private characterService: CharacterService, 
    private gameService: GameService, 
    private router: Router) {}

  ngOnInit() {
  this.game = this.gameService.currentGame;
    this.route.params
    .subscribe(
      (params: Params) => {
          this.id = +params['cid'];  //pak de character id
          console.log("dit is de character id" + this.id);
          this.editMode = params['cid'] != null; //als de character id in de url bestaat is het een edit

          if(this.game){
            if(this.editMode){
              this.gameService.getGameCharacters(this.game._id)
              .then((characters) => {
                this.currentcharacter = characters[this.id];
                this.initForm();
              })
              .catch(error => console.log(error));
            }else{
            this.initForm();
            }
          }else{
            if(this.editMode){
              this.characterService.getCharacters()
              .then(characters => {
                this.currentcharacter = characters[this.id];
                this.initForm();
              })
              .catch(error => console.log(error));
            }else{
              this.initForm();
            }
          }
            
          }
      );
  }

  onSubmit() {
    //als alles is ingevult en alles is valid en en er is op submit geklikt
    //als het dan edit mode is moet je updaten anders gaat hij een niewe toevoegen met de current game
    
    if (this.editMode) {
      console.log("character description " + this.characterForm.value)
      this.characterService.updateCharacter(this.currentcharacter._id, this.characterForm.value);
      this.onCancel();
    } else {
      console.log("submit " + this.game.name);
        this.characterService.addCharacter(this.characterForm.value, this.game._id );
        this.onCancel();
    }
    //als alles klaar is roep cancel aan
    
  }

  onCancel() {
    //ga terug naar de vorige route
    this.router.navigate(["../details"], {relativeTo: this.route});
  }

  private initForm() {
    let characterName = '';
    let characterImagePath = '';
    let characterDescription = '';

    if (this.editMode) {
        characterName = this.currentcharacter.name;
        characterImagePath = this.currentcharacter.imagePath;
        characterDescription = this.currentcharacter.description;
    }

    this.characterForm = new FormGroup({
      'name': new FormControl(characterName, Validators.required),
      'imagePath': new FormControl(characterImagePath, Validators.required),
      'description': new FormControl(characterDescription, Validators.required)
    });
    
  }
}
