import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { GenresPage } from '../genres/genres';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider, private _storage: Storage, public loading: LoadingController, public modalController: ModalController) {
    
    let loader = this.loading.create({
      content: 'Getting Games...', 
    });

    loader.present().then(() => {
      this._storage.get('genre').then((val) => {
        if(val){
          this.genre = val.id;
          this.genreName = val.name;
          
        } else{
          this.genre = 2;
          this.genreName = "Shooter";
          this._storage.set('genre', this.genre);
        }

        this.getGames(this.genre);
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
    
    getGames(genre) {
      this._data.getGames(genre, 0)
        .subscribe(res => this.games = res);
  }

  favorite(game){
    this.favorites.push(game);
    this.favorites = this.favorites.filter(function(item, i, ar){
      return ar.indexOf(item == i);
    });
    this._storage.set('favorites', this.favorites);
    console.log(this.favorites);
  }

  removeFavorite(game){
    this.favorites = this.favorites.filter(function(item){
      return item != game;
    });
    this._storage.set('favorites', this.favorites);
  }

  openFavorites(){

    this._storage.get('favorites').then((val)=>{

      this.genreName = 'Favorites';

      if(val.length != 0){
        this._data.getFavorites(val)
          .subscribe(res=> this.games = res);
        
      }else{
        //this.games.length = 0;
      }
    })
  }

  openGenres(){

    let myModal = this.modalController.create(GenresPage);

    myModal.onDidDismiss(genre => {
      let loader = this.loading.create({
        content: 'Getting Genres',
      });

      if(genre){
        loader.present().then(() => {
          this._storage.get('genre').then((val) => {
            this.genre = val.id;
            this.genreName = val.name;

            this._data.getGames(this.genre, 0)
            .subscribe(res => this.games = res);
          });
        });
      }

      loader.dismiss();
    });

    myModal.present();
  }

    ionViewDidLoad() {
      console.log('ionViewDidLoad HomePage');
    }
}


