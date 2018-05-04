import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { EditprofilePage } from '../editprofile/editprofile';
import { PreloaderProvider } from '../../providers/preloader/preloader';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  public userDetails: any;
  public resposeData: any;
  public dataSet: any;
  public noRecords: boolean;
  userPostData = {
    user_id: "",nama: "", nokp: ""
  };

  constructor(public navCtrl: NavController, 
    public platform: Platform,
    public loadingCtrl: PreloaderProvider, 
    public navParams: NavParams) {
      //console.log(this.user);
      //this.userRef = afDatabase.list('/user');
      //this.user1 = this.userRef.valueChanges();
      //console.log(this.user1);\
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
      this.userPostData.user_id = this.userDetails.user_id;
      this.userPostData.nama = this.userDetails.nama;
      this.userPostData.nokp = this.userDetails.nokp;
      this.noRecords = false
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  edit(){
    this.navCtrl.push(EditprofilePage);
    //console.log('aaa');
  }
}
