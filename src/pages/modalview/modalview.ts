import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-modalview',
  templateUrl: 'modalview.html',
})
export class ModalviewPage {
  id: any;
  kesalahan: any;
  tarikh: String;
  masa: String;
  lokasi: String;
  nokenderaan: String;
  catatan: String;
  aduanRef:AngularFireList<any>;
  aduan:Observable<any[]>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    afDatabase: AngularFireDatabase
  ) {
    console.log(this.navParams.data.key);
    //this.aduanRef = afDatabase.list(`aduan/${this.navParams.data.key}`);
    /* this.aduanRef = afDatabase.list('/aduan'), {
      query: {
        orderByChild: 'id',
        equalTo: this.navParams.data.key
      }
    }; */

    this.aduanRef = afDatabase.list('/aduan', 
    ref => ref.orderByChild('id').equalTo(this.navParams.data.key));

    this.aduan = this.aduanRef.valueChanges();
    console.log(this.aduan);

    /* this.id = this.navParams.get('id');
    this.kesalahan = this.getKesalahanById(this.id);
    this.tarikh = this.navParams.get('data').tarikh;
    this.masa = this.navParams.get('data').masa;
    this.lokasi = this.navParams.get('data').lokasi;
    this.nokenderaan = this.navParams.get('data').nokenderaan;
    this.catatan = this.navParams.get('data').catatan; */

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

  public closeModal(){
    this.viewCtrl.dismiss();
}

}
