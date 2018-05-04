import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, 
  ToastController, ViewController, AlertController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable'
import { ConfirmationPage } from '../confirmation/confirmation';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { KesalahanProvider } from '../../providers/kesalahan/kesalahan';
import { HomePage } from '../home/home';
import { Media, MediaObject } from '@ionic-native/media';

declare var cordova: any;

const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  imageURI:any;
  imageFileName:any;
  myDate: String = new Date().toISOString();
  currLoc: any;
  @ViewChild('fileInput') fileInput;
  isReadyToSave: boolean;
  item: any;
  form: FormGroup;
  id: any;
  type: any;
  kesalahan: any;
  lastImage: string = null;
  videoCapture: string = null;
  lastData: any;

  location: {
    latitude: number,
    longitude: number
  };

  usr_id: any;

  submitAttempt: any;
  
  public dataToStore;

  data = { idkesalahan:"", tarikh:new Date().toISOString(), masa:new Date().toISOString(), lokasi:"", latitude:"", longitude:"",
            nokenderaan:"", catatan:"", status:"", usr_id:"" };
  
  mediaFiles = [];
  @ViewChild('myvideo') myVideo: any;
  aduan_id: any;
  aduan: any;
  
  constructor(
    public viewCtrl: ViewController, formBuilder: FormBuilder,
    public navCtrl: NavController, 
    private camera: Camera,
    public platform: Platform,
    public loadingCtrl: PreloaderProvider,
    public salahCtrl: KesalahanProvider,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private sqlite: SQLite,
    private geolocation: Geolocation,
    private file: File, private filePath: FilePath,
    private storage: Storage,
    private media: Media,
  ) {
    //this.aduanRef = afDatabase.list('/aduan');
      //this.aduan = this.aduanRef.valueChanges();
    //this.myDate = moment().
    //this.currLoc = this.geolocation.getCurrentPosition;

     this.form = formBuilder.group({
      profilePic: [''],
      tarikh: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      masa: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      lokasi: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      nokenderaan: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      catatan: [''],
    }); 

    // Watch the form for changes, and
    /* this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    }); */
    
    const data = JSON.parse(localStorage.getItem("userData"));
    this.usr_id = data[0].user_id;
    this.presentToast(this.usr_id);
    //this.getlocation();
    console.log(this.navParams.data.id);
    //console.log(this.navParams.get('id'));
    //alert(this.aduan_id);
    this.aduan_id = this.navParams.data;
    this.aduan = this.getData(this.aduan_id);
    //alert(this.aduan);
    /* this.kesalahan = this.getKesalahanById(this.navParams.data.id);
    if(this.navParams.data.img){
      this.lastImage = this.navParams.data.img;
      //alert(this.lastImage);
    }
    if(this.navParams.data.type == 'video'){
      this.videoCapture = this.navParams.data.media;
      //this.play(this.videoCapture);
      //alert(this.videoCapture);
    } */
  }

  ionViewDidLoad() {
    console.log('edit page');
    /* this.storage.get(MEDIA_FILES_KEY).then(res => {
      this.mediaFiles = JSON.parse(res) || [];
      alert(JSON.stringify(this.mediaFiles));
    }) */
  }


  getData(id) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM aduan WHERE id= '+ id +'';
      //alert(sql);
      db.executeSql(sql,{})
      .then(res => {
        this.aduan = [];
        if(res.rows.length>0) {
          this.aduan.push({
            idkesalahan:res.rows.item(0).idkesalahan,
            tarikh:res.rows.item(0).tarikh,
            masa:res.rows.item(0).masa,
            lokasi:res.rows.item(0).lokasi,
            latitude:res.rows.item(0).latitude,
            longitude:res.rows.item(0).longitude,
            nokenderaan:res.rows.item(0).nokenderaan,
            catatan:res.rows.item(0).catatan,
            type:res.rows.item(0).type,
            videoCapture:res.rows.item(0).video,
            lastImage:res.rows.item(0).img,
            status:res.rows.item(0).status,
            arkib:res.rows.item(0).arkib,
           });
        }
        alert(JSON.stringify(this.aduan));
        console.log('berjaya get data')
      })
      .catch(e => console.log('gagal get data'));
    })
  }
  
  saveData() {
    //alert('aaaaaaaaaaaaaaaaaaaa');
    const value = [this.id,this.form.value.tarikh,this.form.value.masa,this.form.value.lokasi,
      this.location.latitude, this.location.longitude, this.form.value.nokenderaan, this.form.value.catatan, this.lastImage, 
      "1", "0",this.usr_id,""];
      alert(value);
   // this.presentToast('url(' + this.form.controls['profilePic'].value + ')');
   //this.presentToast(this.form.value.lokasi);
   this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO aduan VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?)', value)
        .then(res => {
          console.log(res);
          this.presentToast('Draf aduan berjaya disimpan');
          this.navCtrl.setRoot(HomePage);
        })
        .catch(e => {
          console.log(e);
          this.presentToast('Draf aduan gagal disimpan');
        });
    }).catch(e => {[this.id,this.form.value.tarikh,this.form.value.masa,this.form.value.lokasi,
      this.location.latitude, this.location.longitude, this.form.value.nokenderaan, this.form.value.catatan, this.lastImage, 
      "1", "0",this.usr_id,""]
      console.log(e);
      this.presentToast(e);
    });
  }

  getKesalahanById(id){
    return this.salahCtrl.getKesalahan(id);
  }

  // AIzaSyD3NEHKXBvN4CHaTr5FlLVZxOd61TM-glQ 

  //ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyDAQcSQAmqhj9JXGzuqyKbEKXeVKFyFypQ" --variable API_KEY_FOR_IOS="AIzaSyBEvero1rsKgBvbTehtcH2x5B51l4PExqI"
 
  submit(){
    this.submitAttempt = true;
    if(this.form.valid){
      let data = {data: this.form.value,
      id: this.id,
      img: this.lastImage,
      loc: this.location,
      };
      //console.log(this.form.value);
      this.navCtrl.push(ConfirmationPage, data);
    }else{
      console.log('error');
    }
  }

  showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: this.imageURI,
      buttons: ['OK']
    });
    alert.present();

    // clear the previous photo data in the variable
    //this.captureDataUrl = "";
  }

  /* findUserLocation(){
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };
    
    
 
    this.geolocation.getCurrentPosition(options).then((position) => {
 
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
 
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  } */

   getlocation(){
    let val;
    let options = {
      timeout:10000,
      enableHighAccuracy:true
    };
    val = this.geolocation.getCurrentPosition(options).then((resp) => {
      console.log("inside func:",resp);
      
      
      this.location = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      };

      //alert(JSON.stringify(this.location));

    }).catch((error) => {
      alert('Error getting location'+JSON.stringify(error));
      });
  }
/* 
 ngOnInit(){
   this.getlocation().then(val => {
      console.log(val)
    })
  }  */

  getPicture() {
   // this.fileInput.nativeElement.click();
     if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 96,
        targetHeight: 96
      }).then((imagePath) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + imagePath });
        //this.imageURI = 'data:image/jpeg;base64,' + data;
        //this.presentToast('aaaaaaa');
        //console.log(this.imageURI);
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.presentToast('Error while selecting image.');
    }
    
  }

  public takePicture() {
    // Create options for the Camera Dialog
    var options = {
      quality: 50,
      //destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
     // targetWidth: 1024,
      correctOrientation: true
    };
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + imagePath });
      //this.imageURI = "data:image/jpeg;base64," + imagePath;
      // Special handling for Android library
      if (this.platform.is('android')) {
        //this.presentToast(this.filePath.resolveNativePath(imagePath));
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            this.presentToast('oooooooooooooooooo');
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            this.presentToast(currentName);
          }, (err) => {
            this.presentToast("ggggggggggggggggggg");
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

   private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
   
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.presentToast('berjaya stor gambar');
    }, error => {
      this.presentToast('Error while storing file.');
    });
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
     //alert(cordova.file.dataDirectory);
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  } 

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  play(myFile) {
    //alert(myFile);
    
    if(this.aduan.type == 'video'){
      let path = this.file.dataDirectory + myFile;
      let url = path.replace(/^file:\/\//, '');
      let video = this.myVideo.nativeElement;
      alert(path);
      video.src = url;
      video.play();
    } else {
      let url = myFile;
      let video = this.myVideo.nativeElement;
      alert(url);
      video.src = url;
      video.play();
    }
    
}

}