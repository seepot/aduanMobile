import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { IonicStorageModule } from '@ionic/storage';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';
//import { Geolocation } from '@ionic-native/geolocation';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { PasswordPage } from '../pages/password/password';
import { VideoPage } from '../pages/video/video';
import { ConfirmationPage } from '../pages/confirmation/confirmation';
import { DrafPage } from '../pages/draf/draf';
import { ArkibPage } from '../pages/arkib/arkib';
import { InboxPage } from '../pages/inbox/inbox';
import { ProfilPage } from '../pages/profil/profil';
import { ModalviewPage } from '../pages/modalview/modalview';
import { EditPage } from '../pages/edit/edit';
import { EditprofilePage } from '../pages/editprofile/editprofile'; 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MapsProvider } from '../providers/maps/maps';
import { JsMapsProvider } from '../providers/js-maps/js-maps';
import { NativeMapsProvider } from '../providers/native-maps/native-maps';
import { PreloaderProvider } from '../providers/preloader/preloader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DatabaseProvider } from '../providers/database/database';
import { ImageProvider } from '../providers/image/image';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { FilePath } from '@ionic-native/file-path';
import { Geolocation } from '@ionic-native/geolocation';
import { KesalahanProvider } from '../providers/kesalahan/kesalahan';
import { StatusProvider } from '../providers/status/status';
import { MediaCapture } from '@ionic-native/media-capture';
import { Media } from '@ionic-native/media';
import { VideoEditor } from '@ionic-native/video-editor';

@NgModule({
  declarations: [
    MyApp,
    AddPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    AboutPage,
    HomePage,
    ListPage,
    RegisterPage,
    SigninPage,
    PasswordPage,
    VideoPage,
    ConfirmationPage,
    DrafPage,
    ArkibPage,
    InboxPage,
    ProfilPage,
    ModalviewPage,
    EditPage,
    EditprofilePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    AboutPage,
    HomePage,
    ListPage,
    RegisterPage,
    SigninPage,
    PasswordPage,
    VideoPage,
    ConfirmationPage,
    DrafPage,
    ArkibPage,
    InboxPage,
    ProfilPage,
    ModalviewPage,
    EditPage,
    EditprofilePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,
    FileTransferObject,
    File,
    FilePath,
    MapsProvider,
    JsMapsProvider,
    NativeMapsProvider,
    PreloaderProvider,
    HttpClient,
    DatabaseProvider,
    ImageProvider,
    SQLitePorter,
    SQLite,
    AuthServiceProvider,
    Geolocation,
    KesalahanProvider,
    StatusProvider,
    MediaCapture,
    Media,
    VideoEditor
  ]
})
export class AppModule {
  
}
