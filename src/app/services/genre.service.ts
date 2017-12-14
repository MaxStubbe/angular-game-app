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
export class GenreService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/games'; // URL to web api
  private neo4jUrl = environment.neo4jUrl;
  private genreArray = []

  constructor(private http:Http){}

public getGenres(){
    console.log('items ophalen van server');
    this.http.post(this.neo4jUrl, { 
        "query" : "MATCH (n:Genre) RETURN n"
     })
      .toPromise()
      .then(response => {
        for(var genre of response.json().data){
            console.log(genre[0].data.genre);
        }
        console.dir(response.json().data);
        return response.json() as String;
      })
      .catch(error => {
        return this.handleError(error);
    });
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }


public getSugestions(game:Game):Promise<String[]>{
    console.log('items ophalen van server');
    
    if(game.genres != null){
        var query:String = "";
        for(var genre of game.genres)
        {
            if(query == ""){
                query = "OPTIONAL MATCH (g:Genre{genre:'" + genre + "'})<-[:HAS_GENRE]-(game:Game) " 
                + "WHERE NOT game.name = '" + game.name + "'"
                + "RETURN game";
            }
            query = query 
            + " UNION OPTIONAL MATCH (g:Genre{genre:'" + genre + "'})<-[:HAS_GENRE]-(game:Game) " 
            + "WHERE NOT game.name = '" + game.name + "'"
            + "RETURN game";
        }
        console.log(query);
            return this.http.post(this.neo4jUrl, { 
                "query" : query + " LIMIT 5"
            })
            .toPromise()
            .then(response => {
                var suggestions = []
                for(var game of response.json().data){
                    console.log(game[0].data.name);
                    suggestions.push(game[0].data.name);
                }
                console.log(suggestions)
                return suggestions as String[];
            })
            .catch(error => {
                return this.handleError(error);
            });
        }else{
            return null;
        }
    }
}