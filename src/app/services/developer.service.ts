import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Game } from '../models/game.model';
import { Developer } from '../models/developer.model';

@Injectable()
export class DeveloperService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/developers'; // URL to web api
  private developers: Developer[] = [];

  developersChanged = new Subject<Developer[]>();

  //
  //
  //
  constructor(private http: Http) { }

  //
  //
  //
  public getDevelopers(): Promise<Developer[]> {
    console.log('items ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        this.developers = response.json() as Developer[];
        return this.developers;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getDeveloper(index: number):Promise<Developer> {
      console.log('Developer ophalen met id');
      return this.http.get(this.serverUrl + '/' + this.developers[index]._id, { headers: this.headers })
        .toPromise()
        .then(response => {
            console.dir(response.json());
            return response.json() as Developer;
        })
        .catch( error => {
            return this.handleError(error);
        });
  }

  public getDeveloperbyId(_id: String):Promise<Developer> {
    console.log('Developer ophalen met id');
    return this.http.get(this.serverUrl + '/' + _id, { headers: this.headers })
      .toPromise()
      .then(response => {
          console.dir(response.json());
          return response.json() as Developer;
      })
      .catch( error => {
          return this.handleError(error);
      });
}

  public addDeveloper(Developer: Developer, gameid: String ) {
    console.log('Developer toevoegen en opslaan');
    this.http.post(this.serverUrl, { name: Developer.name, imagePath: Developer.imagePath, gameid: gameid })
      .toPromise()
      .then( () =>{
        console.log("Developer toegevoegd")
        this.getDevelopers()
        .then(
          developers => {
            this.developers = developers
            this.developersChanged.next(this.developers.slice());
          }
        )
        .catch(error => console.log(error));
      }
      )
      .catch( error => { return this.handleError(error) } );
      
      
  }

  public updateDeveloper(_id: string, newDeveloper : Developer){
    console.log("game updaten");
    
    this.http.put(this.serverUrl + "/" + _id, { name: newDeveloper.name, imagePath: newDeveloper.imagePath})
      .toPromise()
      .then( () => {
        console.log("game veranderd")
        this.getDevelopers()
        .then(
          games => {
            this.developers = games
            this.developersChanged.next(this.developers.slice());
          }
        )
        .catch(error => console.log(error));
    })
      .catch( error => { return this.handleError(error) } );
  }

  public deleteDeveloper(_id: string){
    console.log("Developer deleten");
    
    this.http.delete(this.serverUrl + "/" + _id)
      .toPromise()
      .then( () => {
    	console.log("developer verwijderd")
        this.getDevelopers()
        .then(
          developers => {
            this.developers = developers
            this.developersChanged.next(this.developers.slice());
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
