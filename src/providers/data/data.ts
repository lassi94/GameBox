
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DataProvider {

  //API key
  headers = new Headers({'user-key': 'c75362fdc828b2777df55045c4b55368', 'Accept': 'application/json'});
  
  //For requests for ex. get games etc
  options = new RequestOptions({ headers: this.headers });

  apiURL = 'https://api-endpoint.igdb.com';
  
  //limit results to 50
  limit:number = 50;

  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }

  getGames(genre, offset_num){
    let genre_id = genre;
    let offset = offset_num;

    return this.http.get(this.apiURL + '/games/?fields=name,release_dates,screenshots&limit=' + this.limit + '&offset=' + offset + '&order=release_dates.date:desc&filter[genres][eq]=' + genre_id + '&filter[screenshots][exists]', this.options)
      .map(response => response.json());

    
      
  }
}
