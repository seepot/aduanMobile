import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { ProfilPage } from '../profil/profil';

@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  public userDetails: any;
  public noRecords: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: PreloaderProvider,
    public platform: Platform,
  ) {
    this.loadingCtrl.displayPreloader();
      this.initializeApp();
      this.loadingCtrl.hidePreloader();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    //Statusbar.styleDefault();
    });

    const data = JSON.parse(localStorage.getItem("userData"));
    
    if(data){
      this.userDetails = data[0];
      console.log(this.userDetails);
      this.noRecords = false
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  edit(){
    this.navCtrl.setRoot(ProfilPage);
  }

}
