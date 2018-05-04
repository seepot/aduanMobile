import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DrafPage } from '../draf/draf';
import { ListPage } from '../list/list';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Media, MediaObject } from '@ionic-native/media';

declare var cordova: any;

@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {
  id: any;
  kesalahan: any;
  tarikh: String;
  masa: String;
  lokasi: String;
  nokenderaan: String;
  catatan: String;
  lastImage: string = null;
  usr_id: String;
  videoCapture: string = null;
  type: any;
  resposeData : any;

  location: {
    latitude: number,
    longitude: number
  };

  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public navParams: NavParams, 
    public authService: AuthServiceProvider, 
    private sqlite: SQLite,
    private media: Media,
  ) {
      const data = JSON.parse(localStorage.getItem("userData"));
      this.usr_id = data[0].user_id;
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmationPage');
    console.log(this.navParams.data);
    console.log(this.navParams.get('id'));
    console.log(this.navParams.get('loc'));
    //this.lastImage = this.navParams.get('img');
    //this.presentToast(this.navParams.get('img'));
   // let data = { data: this.navParams.get('data')};
    this.id = this.navParams.get('id');
    this.kesalahan = this.getKesalahanById(this.id);
    this.tarikh = this.navParams.get('data').tarikh;
    this.masa = this.navParams.get('data').masa;
    this.lokasi = this.navParams.get('data').lokasi;
    this.nokenderaan = this.navParams.get('data').nokenderaan;
    this.catatan = this.navParams.get('data').catatan;
    this.location = {
      latitude: this.navParams.get('loc').latitude,
      longitude: this.navParams.get('loc').longitude
    };
    if(this.navParams.data.type == 'photo'){
      this.type = this.navParams.data.type;
      this.lastImage = this.navParams.data.img;
      //alert(this.lastImage);
    }
    if(this.navParams.data.type == 'video'){
      this.type = this.navParams.data.type;
      this.videoCapture = this.navParams.data.media;
      //this.play(this.videoCapture);
      //alert(this.videoCapture);
    } else if(this.navParams.data.type == 'video_library'){
      this.type = this.navParams.data.type;
      this.videoCapture = this.navParams.data.media;
      //this.play(this.videoCapture);
    }
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

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  save(){
    this.navCtrl.setRoot(DrafPage);
  }

  submit(){
    
    const aduan = {
      idkesalahan: this.id,
      tarikh: this.tarikh,
      masa: this.masa,
      lokasi: this.lokasi,
      latitude: this.location.latitude,
      longlitude: this.location.longitude,
      nokenderaan: this.nokenderaan,
      catatan: this.catatan,
      nama_fail: "",
      gambar: "",
      status: "1",
      userId: this.usr_id
    };
    //console.log(aduan);
    if (this.id && this.lokasi && this.nokenderaan){
        //this.authService.postData
        console.log('a1111');
        this.authService.postData(aduan, "aduan/simpan_aduan").then((result) =>{
          this.resposeData = result;
          this.presentToast(this.resposeData.no_aduan);
          console.log(this.resposeData);
          console.log('ok');
          console.log(this.resposeData.no_aduan);
          this.saveData(this.resposeData.no_aduan);
          }, (err) => {
            //Connection failed message
            this.presentToast('aaaaaa');
            console.log('ko');
          });
    }
  }

  saveData(no_aduan) {
    // this.presentToast('url(' + this.form.controls['profilePic'].value + ')');
    //this.presentToast(this.form.value.lokasi);
    //let file_img = 'data:image/jpeg;base64,' + this.lastImage;
    //this.presentToast(file_img);
    //console.log(file_img);
     this.sqlite.create({
       name: 'ionicdb.db',
       location: 'default'
     }).then((db: SQLiteObject) => {
       db.executeSql('INSERT INTO aduan VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?)',
         [this.id,this.tarikh,this.masa,this.lokasi,
        this.location.latitude, this.location.longitude, this.nokenderaan, this.catatan, this.lastImage, 
         2,0,this.usr_id,no_aduan])
         .then(res => {
           console.log(res);
           this.presentToast('Data saved to db lokal');
           this.navCtrl.setRoot(ListPage);
         })
         .catch(e => {
           console.log(e);
           this.presentToast('gagal gagal');
         });
     }).catch(e => {
       console.log(e);
       this.presentToast('Gagal simpan ke db lokal');
     }); 
   }
  /* submit(){
    const newAduan = this.aduanRef.push({});
 
    newAduan.set({
      id: newAduan.key,
      idkesalahan: this.id,
      tarikh: this.tarikh,
      masa: this.masa,
      lokasi: this.lokasi,
      nokenderaan: this.nokenderaan,
      catatan: this.catatan,
      status: "Hantar",
      arkib: "1"
    });

    this.navCtrl.setRoot(ListPage);
  } */

}
