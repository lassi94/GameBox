import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';


/**
 * Generated class for the GenresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-genres',
  templateUrl: 'genres.html',
})
export class GenresPage {

  genres: Array<Object>
  currentGenre: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _storage: Storage, public viewControl: ViewController, private _data: DataProvider) {
  
    this._data.getGenres()
      .subscribe(res => this.genres = res);
  }

  ionViewDidEnter(){

    this._storage.get('genre').then((val)=>{

      if(val){

        this.currentGenre = val.id;

      } else{

        this.currentGenre = 5;

      }
    });
  }

  genreSelect(genre){
    this._storage.set('genre', genre);
    this.viewControl.dismiss(genre);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenresPage');
  }

}
