
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DataProvider {

  result: any;
  //API key
  createAutHeaders(){
    var headers = new HttpHeaders()
      .set('user-key', 'c75362fdc828b2777df55045c4b55368')
      .set('Accept', 'application/json');

      return headers
  }
  
  //For requests for ex. get games etc
  apiURL:string = 'https://api-endpoint.igdb.com';
  
  //limit results to 50
  limit:number = 50;

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  public getGames(genre, offset_num){
    let genre_id = genre;
    let offset = offset_num;

    var options = {
      headers: this.createAutHeaders()
    };

    return this.http.get(this.apiURL + '/games/?fields=name,release_dates,screenshots&limit=' + this.limit + '&offset=' + offset + '&order=release_dates.date:desc&filter[genres][eq]=' + genre_id + '&filter[screenshots][exists]', options)
      .map(result => this.result = result);
  }
}
