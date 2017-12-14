import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Game } from '../models/game.model';
import { Character } from '../models/character.model';
import { Developer } from '../models/developer.model';
import { EventEmitter } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class GameService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/games'; // URL to web api
  private neo4jUrl = environment.neo4jUrl;
  private games: Game[] = [];
  private CurrentGameCharacters : Character[] = [];
  private CurrentGameDevelopers : Developer[] = [];

  gamesChanged = new Subject<Game[]>();

  currentGame: Game;

  changeGame(game:Game){
    if(game){
      console.log("aangeroepen met " + game.name)
    }
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

  public getGameDevelopers(_id: String):Promise<Developer[]> {
    console.log('game ophalen met id en developers terug geven');
    return this.http.get(this.serverUrl + '/' + _id + "/developers", { headers: this.headers })
      .toPromise()
      .then(response => {
          console.dir(response.json());
          this.CurrentGameDevelopers = response.json() as Developer[];
          return this.CurrentGameDevelopers;
      })
      .catch( error => {
          return this.handleError(error);
      });
}

  public getGameDeveloper(gameindex: number, developerindex: number):Promise<Developer>{
    return this.http.get(this.serverUrl + '/' + this.games[gameindex]._id + "/developers/" + this.CurrentGameDevelopers[developerindex]._id, { headers: this.headers })
    .toPromise()
    .then(response => {
        console.dir(response.json());
        return  response.json() as Developer;
    })
    .catch( error => {
        return this.handleError(error);
    });
  }

  public addGame(game: Game) {
    console.log('game toevoegen en opslaan');
    this.http.post(this.serverUrl, { name: game.name, description: game.description, imagePath: game.imagePath, genres: game.genres })
      .toPromise()
      .then( () =>{
        console.log("game toegevoegd aan mongodb")
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
      
        //voeg eerst de game toe als hij niet bestaat
        this.http.post(this.neo4jUrl, 
          {
            "query" : 
            "MERGE (game:Game{ name:'" + game.name + "'}) "
          })
          .toPromise()
          .then(() => {
            //voor elke genre in de array van de game 
            //voer een post uit die eerst de game vind en dan de relatie maakt
            for(let genre of game.genres){
              this.http.post(this.neo4jUrl,
                {
                  "query" : 
                  "MATCH (game:Game{ name:'" + game.name + "'}) " + 
                  "MATCH (genre:Genre{ genre:'" + genre + "'}) " + 
                  "MERGE (game)-[:HAS_GENRE]->(genre)"
                })
                .toPromise()
                .then(() => { 
                  console.log(game.name + " met genre " + genre + " toegevoegd aan neo4j db")
                })
                .catch(error => console.log(error))
           
            }
          })
          .catch(error => console.log(error));
      

      
      
  }

  public updateGame(index: number, newGame : Game){
    console.log("game updaten");
    var editedGame = this.games[index]._id;
    this.http.put(this.serverUrl + "/" + this.games[index]._id, { name: newGame.name, description: newGame.description, imagePath: newGame.imagePath, genres: newGame.genres})
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

    this.http.post(this.neo4jUrl,{
      "query" : 
      "OPTIONAL MATCH(game{ name:'" + editedGame.name + "'}) " + 
      "DETACH DELETE (game) " +
      "MERGE (newGame:Game{ name:'" + newGame.name + "'}) "
    })
    .toPromise()
    .then(() => {
      for(let genre of newGame.genres){
        this.http.post(this.neo4jUrl,
          {
            "query" : 
            "MATCH (game:Game{ name:'" + newGame.name + "'}) " + 
            "MATCH (genre:Genre{ genre:'" + genre + "'}) " + 
            "MERGE (game)-[:HAS_GENRE]->(genre)"
          })
          .toPromise()
          .then(() => { 
            console.log(newGame.name + " met genre " + genre + " veranderd aan neo4j db")
          })
          .catch(error => console.log(error))
     
      }
    })
    .catch(error => console.log(error));
  }

  public deleteGame(index: number){
    console.log("game deleten");
    var deletedGame = this.games[index]._id;
    this.http.delete(this.serverUrl + "/" + this.games[index]._id)
      .toPromise()
      .then( () => {
        console.log("game verwijderd")
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

      this.http.post(this.neo4jUrl,{
        "query" : 
        "MATCH(game{ name:'" + deletedGame.name + "'}) " + 
        "DETACH DELETE (game) "
      })
      .toPromise()
      .then(() => {})
      .catch(error => console.log(error))
  }

  //
  //
  //
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
