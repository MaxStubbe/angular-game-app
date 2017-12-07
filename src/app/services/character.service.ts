import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Game } from '../models/game.model';
import { Character } from '../models/character.model';
import { CharactersComponent } from '../components/characters/characters.component';

@Injectable()
export class CharacterService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/characters'; // URL to web api
  private characters: Character[] = [];

  charactersChanged = new Subject<Character[]>();

  //
  //
  //
  constructor(private http: Http) { }

  //
  //
  //
  public getCharacters(): Promise<Character[]> {
    console.log('items ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        this.characters = response.json() as Character[];
        return this.characters;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getCharacter(_id: String):Promise<Character> {
      console.log('character ophalen met id');
      return this.http.get(this.serverUrl + '/' + _id, { headers: this.headers })
        .toPromise()
        .then(response => {
            console.dir(response.json());
            return response.json() as Character;
        })
        .catch( error => {
            return this.handleError(error);
        });
  }

  public addCharacter(character: Character, gameid: String ) {
    console.log('character toevoegen en opslaan');
    this.http.post(this.serverUrl, { name: character.name, description: character.description, imagePath: character.imagePath, gameid: gameid })
      .toPromise()
      .then( () =>{
        console.log("character toegevoegd")
        this.getCharacters()
        .then(
          characters => {
            this.characters = characters
            this.charactersChanged.next(this.characters.slice());
          }
        )
        .catch(error => console.log(error));
      }
      )
      .catch( error => { return this.handleError(error) } );
      
      
  }

  public updateCharacter(_id: string, newCharacter : Character){
    console.log("game updaten");
    
    this.http.put(this.serverUrl + "/" + _id, { name: newCharacter.name, description: newCharacter.description, imagePath: newCharacter.imagePath})
      .toPromise()
      .then( () => {
        console.log("game veranderd")
        this.getCharacters()
        .then(
          games => {
            this.characters = games
            this.charactersChanged.next(this.characters.slice());
          }
        )
        .catch(error => console.log(error));
    })
      .catch( error => { return this.handleError(error) } );
  }

  public deleteCharacter(_id: string){
    console.log("character deleten");
    
    this.http.delete(this.serverUrl + "/" + _id)
      .toPromise()
      .then( () => {
        console.log("recipe verwijderd")
        this.getCharacters()
        .then(
          games => {
            this.characters = games
            this.charactersChanged.next(this.characters.slice());
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
