import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PasswordPage } from '../password/password';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  loginError: string;
  resposeData : any;
  userData = {"mykad_no":"", "password":""};

  constructor(public navCtrl: NavController, 
    public authService: AuthServiceProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  /* login(user: User){

		this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
			.then(
				() => this.navCtrl.setRoot(HomePage),
				error => this.loginError = error.message
      );
  } */

  login(){
    if(this.userData.mykad_no && this.userData.password){
      console.log('sssss');
     this.authService.postData(this.userData, "login/processlogin").then((result) =>{
     this.resposeData = result;
     console.log(this.resposeData);
     if(this.resposeData.sql){
      localStorage.setItem('userData', JSON.stringify(this.resposeData.sql) )
     this.navCtrl.setRoot(HomePage);
    }
    else{
      this.presentToast("Please give valid username and password");
    }
     
 
     }, (err) => {
       //Connection failed message
     });
    }
    else{
     this.presentToast("Give username and password");
    }
   
 }

 presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}

  forgotpswd(){
    this.navCtrl.push(PasswordPage);
  }


}
