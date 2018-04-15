
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http'
import 'rxjs/add/operator/map'

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  //API key
  headers = new Headers({'X-Mashape-Key': '585c39601d3c47209ba19abb0886f9b3'});
  
  //For requests for ex. get games etc
  options = new RequestOptions({ headers: this.headers });

  //limit results to 50
  limit: number = 50;
  constructor(public _http: Http) {
    console.log('Hello DataProvider Provider');
  }

  getGames(genre, offset_num){
    let genre_id = genre;
    let offset = offset_num;

    return this._http.get('https://api-endpoint.igdb.com/games/?fields=name,release_dates,screenshots&limit=' + this.limit + '&offset=' + offset + '&order=release_dates.date:desc&filter[genres][eq]=' + genre_id + '&filter[screenshots][exists]', this.options)
      .map(res => res.json());
      
  }
}
