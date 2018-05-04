import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { EditPage } from '../edit/edit';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { KesalahanProvider } from '../../providers/kesalahan/kesalahan';

@Component({
  selector: 'page-draf',
  templateUrl: 'draf.html',
})
export class DrafPage {

  kesalahan: Array<{ tarikh: string, title: string}>;
 aduan: any = [];
  //loading: any;

  constructor(public navCtrl: NavController,
    public loadingCtrl: PreloaderProvider, 
    public navParams: NavParams, 
    private sqlite: SQLite,
    public salahCtrl: KesalahanProvider,
    public toastCtrl: ToastController) {


    this.loadingCtrl.displayPreloader();
    this.getData();
    this.loadingCtrl.hidePreloader();

  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      
      db.executeSql('SELECT * FROM aduan WHERE status="1"', {})
      .then(res => {
        this.aduan = [];
        for(var i=0; i<res.rows.length; i++) {
          //this.presentToast(res);
          //alert(JSON.stringify(res));
          this.aduan.push({id:res.rows.item(i).id,
            tarikh:res.rows.item(i).tarikh,
            idkesalahan:res.rows.item(i).idkesalahan,
            no_aduan:res.rows.item(i).noaduan})
        }
      })
      .catch(e => console.log(e));
  
    }).catch(e => console.log(e));
}

getKesalahanById(id){
  return this.salahCtrl.getKesalahan(id);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad DrafPage');
  }

  edit(id){
    console.log(id);
    this.navCtrl.push(EditPage, id);
  }

}
