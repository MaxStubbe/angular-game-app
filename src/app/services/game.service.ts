import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Game } from '../models/game.model';
import { Character } from '../models/character.model';
import { EventEmitter } from '@angular/core';

@Injectable()
export class GameService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/games'; // URL to web api
  private games: Game[] = [];
  private CurrentGameCharacters : Character[] = [];

  gamesChanged = new Subject<Game[]>();

  currentGame: Game;

  changeGame(game:Game){
    console.log("aangeroepen met " + game.name)
    this.currentGame = game ;
  }

  //
  //
  //
  constructor(private http: Http) { }

  //
  //
  //
  public getGames(): Promise<Game[]> {
    console.log('items ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        this.games = response.json() as Game[];
        return this.games;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getGame(index: number):Promise<Game> {
      console.log('game ophalen met id');
      return this.http.get(this.serverUrl + '/' + this.games[index]._id, { headers: this.headers })
        .toPromise()
        .then(response => {
            console.dir(response.json());
            return response.json() as Game;
        })
        .catch( error => {
            return this.handleError(error);
        });
  }

  public getGameCharacters(_id: String):Promise<Character[]> {
    console.log('game ophalen met id en characters terug geven');
    return this.http.get(this.serverUrl + '/' + _id + "/characters", { headers: this.headers })
      .toPromise()
      .then(response => {
          console.dir(response.json());
          this.CurrentGameCharacters = response.json() as Character[];
          return this.CurrentGameCharacters;
      })
      .catch( error => {
          return this.handleError(error);
      });
}

  public getGameCharacter(gameindex: number, characterindex: number):Promise<Character>{
    return this.http.get(this.serverUrl + '/' + this.games[gameindex]._id + "/characters/" + this.CurrentGameCharacters[characterindex]._id, { headers: this.headers })
    .toPromise()
    .then(response => {
        console.dir(response.json());
        return  response.json() as Character;
    })
    .catch( error => {
        return this.handleError(error);
    });
  }

  public addGame(game: Game) {
    console.log('game toevoegen en opslaan');
    this.http.post(this.serverUrl, { name: game.name, description: game.description, imagePath: game.imagePath })
      .toPromise()
      .then( () =>{
        console.log("game toegevoegd")
        this.getGames()
        .then(
          games => {
            this.games = games
            this.gamesChanged.next(this.games.slice());
          }
        )
        .catch(error => console.log(error));
      }
      )
      .catch( error => { return this.handleError(error) } );
      
      
  }

  public updateGame(index: number, newGame : Game){
    console.log("game updaten");
    
    this.http.put(this.serverUrl + "/" + this.games[index]._id, { name: newGame.name, description: newGame.description, imagePath: newGame.imagePath})
      .toPromise()
      .then( () => {
        console.log("game veranderd")
        this.getGames()
        .then(
          games => {
            this.games = games
            this.gamesChanged.next(this.games.slice());
          }
        )
        .catch(error => console.log(error));
    })
      .catch( error => { return this.handleError(error) } );
  }

  public deleteGame(index: number){
    console.log("game deleten");
    
    this.http.delete(this.serverUrl + "/" + this.games[index]._id)
      .toPromise()
      .then( () => {
        console.log("recipe verwijderd")
        this.getGames()
        .then(
          games => {
            this.games = games
            this.gamesChanged.next(this.games.slice());
          }
        )
        .catch(error => console.log(error));
    })
      .catch( error => { return this.handleError(error) } );
  }

  //
  //
  //
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
