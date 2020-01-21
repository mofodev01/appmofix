import { Component } from '@angular/core';
import { NavController, NavParams,Platform,LoadingController,MenuController , ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { JsonDataProvider } from '../../providers/json-data/json-data';


import { DatabaseProvider } from '../../providers/database/database';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { Toast } from '@ionic-native/toast';




@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
 
  playType: string = "RTMP";
  urls: string[] = [
    'rtmp://live.hkstv.hk.lxdns.com/live/hks',
    'http://fms.cntv.lxdns.com/live/flv/channel179.flv',
    '',
    'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
    'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    'rtmp://live.hkstv.hk.lxdns.com/live/hks',
    'file://'
  ];
  url: string;
  //----------------------------

  
  title:any;
  categorie:any;
  countries: any;
  data_storage:any;
  errorMessage: string;

  limit = 100;


  descending: boolean = false;
order: number;
column: string = 'tvname';
placeholder = "https://image.prntscr.com/image/40007xNYQNKMcy68bEChwQ.png";

/*----------------------------*/

  ListUser = [];

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public JsonDataProvider: JsonDataProvider, public loadingCtrl: LoadingController
    ,public storage: Storage,private database: DatabaseProvider,
    public platform: Platform,private toast: Toast,private streamingMedia: StreamingMedia
    ,
    private modal: ModalController
    ,public menuCtrl:MenuController
    ) {
      this.menuCtrl.enable(true)
  
      this.categorie = this.navParams.get('categorie');
      this.title = this.navParams.get('title'); 
      
     

  }

  goToPlayerPage(media) {
    if (media) {
      let modal = this.modal.create('player', {
        url: media,
        playType: this.playType
      });
      modal.present();
    }
  }


  ionViewDidLoad() {
    /**-----------------test user and cat-------------------- */
    this.categorie = this.navParams.get('categorie');
    console.log(this.categorie);
    this.title = this.navParams.get('title'); 
    console.log(this.title);

    this.storage.get("session_storage").then((res)=>{
      this.data_storage=res;
      
      console.log(this.data_storage);
    });
    /**-----------------test user and cat-------------------- */
  }

  ngOnInit() {
    this.getLiveCountry();
             }

  getLiveCountry() {

     
    let loading = this.loadingCtrl.create({
      content: 'Wait...'
    });
  
    loading.present();

   /**----------------------------------------- */
  
      this.storage.get("session_storage").then((res)=>{
       this.data_storage=res;
       
       console.log(this.data_storage);
 /**----------------------------------------- */

    this.categorie = this.navParams.get('categorie');
    console.log(this.categorie);
    
  /**----------------------------------------- */

    this.JsonDataProvider.getLive(this.data_storage,this.categorie)
             .subscribe(
               countries =>{
                 this.countries = countries 
                     loading.dismiss();
                           } ,
               error => {
                 this.errorMessage = <any>error
                    loading.dismiss();
                        });

         ///-----
              })
         ///-----
  
   }

   doInfinite(infiniteScrollEvent) {
    this.limit += 20;
    infiniteScrollEvent.complete();
    infiniteScrollEvent.disabled = true;
}

startVideo(url) {
  
  let options: StreamingVideoOptions = {
    successCallback: () => { console.log('Finished Video') },
    errorCallback: (e) => { console.log('Error: ', e) },
    //orientation: 'portrait'
    //orientation: 'landscape'
  };
  
  // http://www.sample-videos.com
  this.streamingMedia.playVideo(''+url+'', options);
  
  
  
  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

             
             CreateUser(
               id: Number,
                title: String,
                Url : String,
                logo: String,
                name: String,
                group: String){
              
           
              this.database.Createfavorate( id, title, Url, name,logo,group )
              .then( (data) => {
                console.log(data);
               
              }, (error) => {
                console.log(error);
              })


              this.toast.show('successfully added', '5000', 'center').subscribe(
                toast => {
                  console.log(toast);
                }
              );


            }
            
            GetAllUser(){
              this.database.GetAllfavorates().then((data: any) => {
                console.log(data);
                this.ListUser = data;
              }, (error) => {
                console.log(error);
              })
            }
            
            DeleteUser(idfavorate){
              console.log(idfavorate);
            
            }

            doRefresh(refresher) {


              setTimeout(() => {
              refresher.complete();
             }, 2000);
         }

}
