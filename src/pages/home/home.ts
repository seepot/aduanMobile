import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, Tabs, AlertController, Platform, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WelcomePage } from '../welcome/welcome';
import { SignupPage } from '../signup/signup';
import { AddPage } from '../add/add';
import { VideoPage } from '../video/video';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';

import { LoginPage } from '../login/login';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

declare var cordova: any;

const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  mediaFiles = [];
  @ViewChild('myvideo') myVideo: any;
  public photos : any;
  public base64Image : string;
  lastImage: string = null;
  idkesalahan: any;

  kesalahan: Array<{ id: string, title: string, icon: string}>;

  constructor(
    private toastCtrl: ToastController, private camera: Camera,
    private file: File, private filePath: FilePath,
    private mediaCapture: MediaCapture, 
    private storage: Storage, 
    private media: Media,
    public platform: Platform,  public actionsheetCtrl: ActionSheetController,
    public navCtrl: NavController, public alertCtrl: AlertController) {

      this.kesalahan = [
        { id: "1", title: "gagal mematuhi lampu isyarat merah", icon:"Trafficlight11.png"},
        { id: "2", title: "memotong garisan berkembar", icon:"diubleline.png"},
        { id: "3", title: "menggunakan telefon bimbit semasa memandu", icon:"phone.png"},
        { id: "4", title: "memandu di lorong kecemasan", icon:"emergencylane.png"},
        { id: "5", title: "tidak memakai tali pinggang keledar", icon:"seatbelt11.png"},
        { id: "6", title: "bas tiada pemandu kedua bagi perjalanan melebihi 4 jam", icon:"busdriver11.png"}
      ];
  }

  ngOnInit() {
    this.photos = [];
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }

  add(){
    this.navCtrl.push(AddPage);
  }
 /*  doPrompt() {
    let prompt = this.alertCtrl.create({
      cssClass: 'alertCustomCss',
      title: 'upload dari?',
      buttons: [
        {
          text: 'Photo',
          handler: data => {
            this.navCtrl.push(AddPage);
          }
        },
        {
          text: 'Camera',
          handler: data => {
            this.navCtrl.push(CameraPage);
          }
        },
        {
          text: 'Video',
          handler: data => {
            this.navCtrl.push(VideoPage);
          }
        }
      ]
    });
    prompt.present();
  } */

  takePhoto(type){
    //alert(sourceType);
    if(type == 'photo'){
      var options = {
        quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType:this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      correctOrientation: true
      };
    } else if(type == 'video'){
      var options = {
        quality: 50,
         destinationType: this.camera.DestinationType.FILE_URI, // <== try THIS
         sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        mediaType:this.camera.MediaType.VIDEO,
        saveToPhotoAlbum: false,
      correctOrientation: true
      }
    } else if (type == 'camera') {
      const options : CameraOptions = {
        quality: 50, // picture quality
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 1024,
        correctOrientation: true,
        saveToPhotoAlbum: true
      }
    }
    this.camera.getPicture(options) .then((imagePath) => {
        //this.base64Image = "data:image/jpeg;base64," + imagePath;
        //this.photos.push(this.base64Image);
        //this.photos.reverse();
        //console.log(this.photos);
        //this.presentToast(this.photos);
        /* if(type=="video"){
          imagePath = 'file://'+imagePath;
        } */
        alert(JSON.stringify(imagePath));
        if (this.platform.is('android') && type == 'photo') {
        //this.presentToast(this.filePath.resolveNativePath(imagePath));
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            this.presentToast(filePath);
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            //this.presentToast(currentName);
          }, (err) => {
            this.presentToast(JSON.stringify(err));
          });
        } else if (type == 'video'){
          imagePath = 'file://'+imagePath;
          let data = {
            id: this.idkesalahan,
            type: 'video_library',
            media: imagePath,
          };
          this.navCtrl.push(AddPage, data);
        } else {
          
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
         alert(currentName);
         alert(correctPath);
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
      }, (err) => {
        console.log(err);
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
   copyFileToLocalDir(namePath, currentName, newFileName) {

    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
    .then(success => {
      //this.lastImage = success.name;
      //this.presentToast(success.name);
      //this.presentToast(this.lastImage);
      //return success.name;
      //this.presentToast(success.fullPath);
      
      //this.presentToast(success);
      let data = {
        id: this.idkesalahan,
        type: 'photo',
        img: newFileName,
      };
      this.navCtrl.push(AddPage, data);

    /* , error => {
      this.presentToast(error);
      //this.presentToast('Error while storing file.');
      //return "";*/
    } , error => {
      alert(JSON.stringify(error));
    }
  );
    /* return new Promise(function(resolve, reject) {
      resolve(this.lastImage);
      reject('ss');
    });  */
    
    
  }

  captureVideo() {
    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 30
    }
    this.mediaCapture.captureVideo(options).then((res: MediaFile[]) => {
      let capturedFile = res[0];
      let fileName = capturedFile.name;
      let dir = capturedFile['localURL'].split('/');
      dir.pop();
      let fromDirectory = dir.join('/');      
      var toDirectory = this.file.dataDirectory;
     
      this.file.copyFile(fromDirectory , fileName , toDirectory , fileName).then((res) => {
        this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);

        this.presentToast('video berjaya disimpan');
        let data = {
          id: this.idkesalahan,
          type: 'video',
          media: fileName,
        };
        this.navCtrl.push(AddPage, data);
      },err => {
        console.log('err: ', err);
      });
          },
    (err: CaptureError) => console.error(err));
  }

  

   storeMediaFiles(files) {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      if (res) {
        let arr = JSON.parse(res);
        arr = arr.concat(files);
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
      } else {
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
      }
      this.mediaFiles = this.mediaFiles.concat(files);
    })
  } 

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  ionViewDidLoad() {
    
  }

  openMenu(id) {
    console.log(id);
    this.idkesalahan = id;
    let data = { id: id };
    console.log(data);
    let actionSheet = this.actionsheetCtrl.create({
      //title: 'Albums',
      
      cssClass: 'action-sheets-basic-page',
      buttons: [
          {
          text: 'Form',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.navCtrl.push(AddPage,data);
          }
        },  
         {
          text: 'Galeri Foto',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.takePhoto('photo');
          }
        }, 
        {
          text: 'Galeri Video',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.takePhoto('video');
          }
        }, 
        {
          text: 'Kamera',
          icon: !this.platform.is('ios') ? 'md-camera' : null,
          handler: () => {
            this.takePhoto('camera');
          }
        },
         {
          text: 'Video',
          icon: !this.platform.is('ios') ? 'videocam' : null,
          handler: () => {
            this.captureVideo();
            //this.navCtrl.push(VideoPage);
          }
        }, 
        {
          text: 'Batal',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,  

          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
