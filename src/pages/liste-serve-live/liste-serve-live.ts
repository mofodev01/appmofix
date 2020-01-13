import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,MenuController} from 'ionic-angular';

import { JsonDataProvider } from '../../providers/json-data/json-data';

import { DetailFreeLivePage } from '../detail-free-live/detail-free-live'

import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'page-liste-serve-live',
  templateUrl: 'liste-serve-live.html',
})
export class ListeServeLivePage {

  title:any;
  categorie:any;
  countries: any;
  data_storage:any; 
  errorMessage: string;

  limit = 100;

  constructor(
    public http:  HttpClient,
    public storage: Storage ,
    public navCtrl: NavController, public navParams: NavParams
    , public JsonDataProvider: JsonDataProvider, public loadingCtrl: LoadingController 
    ,public menuCtrl:MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeServeLivePage');

    this.categorie = this.navParams.get('categorie');
    console.log(this.categorie);
    this.title = this.navParams.get('title'); 
    console.log(this.title);
    
  }
  ionViewWillEnter(){
    this.getLiveserver();
             }

  getLiveserver() {

    this.storage.get("session_storage").then((res)=>{
      this.data_storage=res;
      
      console.log(this.data_storage);
   /**----------------------------------------- */
   let httpHeaders = new HttpHeaders({
   'Content-Type' : 'application/json',
   'Cache-Control': 'no-cache'
      });    
      let options = {
   headers: httpHeaders
      };
   /**----------------------------------------- */    
   
   this.http.get('http://space.iptvmedia.me/api/liste_free_server.php?username='+this.data_storage,options)
   
    .subscribe(res => {
    
    
    this.countries=res;
    
    console.log(this.countries);
    });
   
   
   
   ///-----
   })
   ///-----
}
 
   

  push_data_country_and_server(id: Number){

    this.categorie = this.navParams.get('categorie');
    this.title = this.navParams.get('title'); 

    this.navCtrl.push(DetailFreeLivePage,{categorie: this.categorie,title: this.title,id: id});
  }


}
