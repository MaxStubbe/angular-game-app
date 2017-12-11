import {NgModule} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './components/games/games.component';
import { GamesDetailComponent } from './components/games/games-detail/games-detail.component';
import { GameEditComponent } from './components/games/game-edit/game-edit.component';
import { CharactersComponent } from './components/characters/characters.component';
import { CharacterEditComponent } from './components/characters/character-edit/character-edit.component';
import { CharacterDetailComponent } from './components/characters/character-detail/character-detail.component';
import { GameMoreDetailsComponent } from './components/games/game-more-details/game-more-details.component';

import { DevelopersComponent } from './components/developers/developers.component';
import { DeveloperNewComponent} from './components/developers/developer-new/developer-new.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/games', pathMatch: 'full'}, 
    { path: 'games', component: GamesComponent, children: [
        { path: 'newGame' , component: GameEditComponent },
        { path: ':id' , component: GamesDetailComponent },
        { path: ':id/edit', component: GameEditComponent }
    ] },
    { path: 'games/:id/details', component: GameMoreDetailsComponent, children: [
        { path: 'newCharacter' , component: CharacterEditComponent },
        { path: 'newDeveloper' , component: DeveloperNewComponent },
        { path: ':cid', component: CharacterDetailComponent },
        { path: ':cid/edit', component: CharacterEditComponent }
    ] },
    { path: 'characters', component: CharactersComponent, children: [ 
        { path: 'newCharacter' , component: CharacterEditComponent },
        { path: ':cid', component: CharacterDetailComponent },
        { path: ':cid/edit', component: CharacterEditComponent }
    ]}
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}
