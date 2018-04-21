import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  //The object that the homepage is going to catch. In this case the API returns
  //a array of objects of the games

  games: Object;
  genre: any;
  genreName: string = "Upcoming Games";
  favorites = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider, private _storage: Storage, public loading: LoadingController) {
    
    let loader = this.loading.create({
      content: 'Getting Games...', 
    });

    loader.present().then(() => {
      this._storage.get('genre').then((val) => {
        if(val){
          this.genre = val.id;
          this.genreName = val.name;
        } else{
          this.genre = 5;
          this.genreName = "Shooter";
          this._storage.set('genre', this.genre);
        }

        this.getGames();
      });
      
      this._storage.get('favorites').then((val) => {
        if(!val)
          this._storage.set('favorites', this.favorites);
        else
          this.favorites = val
      });
      
      setTimeout(() => {
        loader.dismiss();
      }, 1200);

    })
    }
    
    getGames() {
      this._data.getGames(this.genre, 0)
        .subscribe(res => this.games = res);
        
  }

    

    ionViewDidLoad() {
      console.log('ionViewDidLoad HomePage');
    }
}


