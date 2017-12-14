import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DropdownDirective } from './components/shared/dropdown.directive';

import { AppRoutingModule } from './app-routes.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { GamesComponent } from './components/games/games.component';
import { GamesGridComponent } from './components/games/games-grid/games-grid.component';
import { GameItemComponent } from './components/games/games-grid/game-item/game-item.component';
import { GameService } from './services/game.service';
import { GamesDetailComponent } from './components/games/games-detail/games-detail.component';
import { GameEditComponent } from './components/games/game-edit/game-edit.component';

import { CharactersComponent } from './components/characters/characters.component';
import { CharactersGridComponent } from './components/characters/characters-grid/characters-grid.component';
import { CharacterItemComponent } from './components/characters/characters-grid/character-item/character-item.component';
import { CharacterEditComponent } from './components/characters/character-edit/character-edit.component';
import { CharacterDetailComponent } from './components/characters/character-detail/character-detail.component';
import { CharacterService } from './services/character.service';
import { GameMoreDetailsComponent } from './components/games/game-more-details/game-more-details.component';
import { DevelopersComponent } from './components/developers/developers.component';
import { DevelopersGridComponent } from './components/developers/developers-grid/developers-grid.component';
import { DeveloperItemComponent } from './components/developers/developers-grid/developer-item/developer-item.component';
import { DeveloperNewComponent } from './components/developers/developer-new/developer-new.component';
import { DeveloperService } from './services/developer.service';
import { GenreService } from './services/genre.service';



@NgModule({
  declarations: [
    AppComponent,
//header component
    HeaderComponent,
//game components
    GamesComponent,
    GamesGridComponent,
    GameItemComponent,
    GamesDetailComponent,
    GameEditComponent,
    GameMoreDetailsComponent,
//character components
    CharactersComponent,
    CharactersGridComponent,
    CharacterItemComponent,
    CharacterDetailComponent,
    CharacterEditComponent,
//game developers components
   DevelopersComponent,
   DevelopersGridComponent,
   DeveloperItemComponent,
   DeveloperNewComponent,
//directives
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ 
    GameService, 
    CharacterService,
    DeveloperService,
    GenreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
