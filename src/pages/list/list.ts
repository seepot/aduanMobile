import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, ToastController} from 'ionic-angular';
import { ModalviewPage } from '../modalview/modalview';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { StatusProvider } from '../../providers/status/status';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  aduan: any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    private sqlite: SQLite,
    public toastCtrl: ToastController,
    public statusCtrl: StatusProvider,
    public loadingCtrl: PreloaderProvider, 
  ) {
    this.loadingCtrl.displayPreloader();
    this.getData();
    this.loadingCtrl.hidePreloader();
  }

  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      
      db.executeSql('SELECT * FROM aduan WHERE status <> "1"', {})
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
  /* ionViewDidEnter()
   {
      this._LOADER.displayPreloader();
      this.platform.ready().then(() => {
       // this.loadAduan();
      }

      );
   }

   loadAduan(){
    this.aduanRef = this.afDatabase.list('/aduan');
    this.aduan = this.aduanRef.valueChanges();
    this._LOADER.hidePreloader();
   } */

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  getKesalahanById(id){
    if (id == "1"){
      return "gagal mematuhi lampu isyarat merah";
    } else if (id == "2"){
      return "memotong garisan berkembar";
    } else if (id == "3"){
      return "menggunakan telefon bimbit semasa memandu";
    }  else if (id == "4"){
      return "memandu di lorong kecemasan";
    }  else if (id == "5"){
      return "tidak memakai tali pinggang keledar";
    } else if (id == "6"){
      return "bas tiada pemandu kedua bagi perjalanan melebihi 4 jam";
    } else {
      return "error";
    }
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

  public arkib(id){
    console.log(id);
    /* this.aduanRef.update(id, {
      arkib: "2"
    }); */

    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      
      db.executeSql('UPDATE aduan SET arkib = "1" WHERE id ="'+ id +'"', {})
      .then(res => {
        this.presentToast("Arkib Berjaya");
      })
      .catch(e => console.log(e));
  
    }).catch(e => console.log(e));
  }
  
  public getStatus(status_id){
    return this.statusCtrl.getStatus(status_id);
  }
 
}
