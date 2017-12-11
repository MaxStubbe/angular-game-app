import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params, ParamMap} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Game } from '../../../models/game.model';
import { Developer } from '../../../models/developer.model';
import { GameService } from '../../../services/game.service'; 
import { DeveloperService } from '../../../services/developer.service';
import { Input } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-developers-grid',
  templateUrl: './developers-grid.component.html',
  styleUrls: ['./developers-grid.component.css']
})
export class DevelopersGridComponent implements OnInit {

  @Input() game: Game;
  developers: Developer[];
  subscription : Subscription;
  
    constructor(private route: ActivatedRoute,
                private gameService: GameService,
                private developerService: DeveloperService,
                private router: Router) {}

  ngOnInit() {
    if(this.game){
      this.gameService.getGameDevelopers(this.game._id)
      .then(developers => this.developers = developers)
      .catch(error => console.log(error));
      console.log("developer grid component " + this.game.name)
    }else{
      this.developerService.getDevelopers()
      .then(developers => this.developers = developers)
      .catch(error => console.log(error))
    }
  }

  onNewDeveloper(){
    this.router.navigate(['newDeveloper'], { relativeTo: this.route });
  }
}
