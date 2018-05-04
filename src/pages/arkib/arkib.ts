import { Component } from '@angular/core';
import {  NavController, NavParams, ModalController, ViewController, ToastController } from 'ionic-angular';
import { ModalviewPage } from '../modalview/modalview';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { KesalahanProvider } from '../../providers/kesalahan/kesalahan';
import { StatusProvider } from '../../providers/status/status';

@Component({
  selector: 'page-arkib',
  templateUrl: 'arkib.html',
})
export class ArkibPage {

  aduan: any = [];

  constructor(public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController,
    public loadingCtrl: PreloaderProvider, 
    private sqlite: SQLite,
    public salahCtrl: KesalahanProvider,
    public statusCtrl: StatusProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams,
  ) {

    this.loadingCtrl.displayPreloader();
    this.getData();
    this.loadingCtrl.hidePreloader();
  }
  getKesalahanById(id){
    return this.salahCtrl.getKesalahan(id);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ArkibPage');
  }

  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      
      db.executeSql('SELECT * FROM aduan WHERE arkib = "1"', {})
      .then(res => {
        this.aduan = [];
        for(var i=0; i<res.rows.length; i++) {
          this.presentToast(res);
          this.aduan.push({id:res.rows.item(i).id,
            tarikh:res.rows.item(i).tarikh,
            idkesalahan:res.rows.item(i).idkesalahan,
            no_aduan:res.rows.item(i).noaduan})
        }
      })
      .catch(e => console.log(e));
  
    }).catch(e => console.log(e));
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  public openModal(key){ 
    //var modalPage = this.modalCtrl.create('ModalviewPage'); modalPage.present();
    console.log(key);
    let data = {key: key};
    let modal = this.modalCtrl.create(ModalviewPage, data);
    modal.present();
   }

   public closeModal(){
      this.viewCtrl.dismiss();
  }

  public getStatus(status_id){
    return this.statusCtrl.getStatus(status_id);
  }

}
