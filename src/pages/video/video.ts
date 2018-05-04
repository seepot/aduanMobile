import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { VideoEditor } from '@ionic-native/video-editor';
 
const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  mediaFiles = [];
  @ViewChild('myvideo') myVideo: any;
  
  constructor(
    public navCtrl: NavController, 
    private mediaCapture: MediaCapture, 
    public toastCtrl: ToastController,
    private storage: Storage, 
    private file: File, private media: Media,
    private videoEditor: VideoEditor
  ) {}
 
  ionViewDidLoad() {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      this.mediaFiles = JSON.parse(res) || [];
    })
  }
 
  captureAudio() {
    this.mediaCapture.captureAudio().then(res => {
      this.storeMediaFiles(res);
    }, (err: CaptureError) => console.error(err));
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

      /* this.videoEditor.transcodeVideo({
        fileUri: fromDirectory+fileName,
        outputFileName: 'output.mp4',
        //outputFileType: VideoEditor.OutputFileType.MPEG4
      })
      .then((fileUri: string) => this.presentToast('video transcode success'+ fileUri))
      .catch((error: any) => this.presentToast('video transcode error' + error));
       */
      
      this.file.copyFile(fromDirectory , fileName , toDirectory , fileName).then((res) => {
        this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);
      },err => {
        console.log('err: ', err);
      });
          },
    (err: CaptureError) => console.error(err));
  }
 
  play(myFile) {
    if (myFile.name.indexOf('.wav') > -1) {
      const audioFile: MediaObject = this.media.create(myFile.localURL);
      audioFile.play();
    } else {
      let path = this.file.dataDirectory + myFile.name;
      let url = path.replace(/^file:\/\//, '');
      let video = this.myVideo.nativeElement;
      video.src = url;
      video.play();
    }
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
}
