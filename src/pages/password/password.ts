import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
  providers: [AngularFireAuth]
})
export class PasswordPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

  async reset (user: User){

    try{
        const result = this.afAuth.auth.sendPasswordResetEmail(user.email);
        console.log(result);

        this.navCtrl.setRoot(WelcomePage);
    }
    catch (e){
      console.error(e);
    }
  }

}
