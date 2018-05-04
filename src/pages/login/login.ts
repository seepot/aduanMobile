import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from "angularfire2/auth";
import { HomePage } from '../home/home';
import { PasswordPage } from '../password/password';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(user: User){
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result) {
        this.navCtrl.setRoot(HomePage);
      }
    }
    catch (e) {
      console.error(e);
    }
  }
  log2(){
    this.navCtrl.setRoot(WelcomePage);
  }
  
  register(){
    this.navCtrl.push(RegisterPage);
  }

  password(){
    this.navCtrl.push(PasswordPage);
  }
}
