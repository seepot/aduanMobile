import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { LoginPage } from '../login/login';
//import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireAuth } from "angularfire2/auth";
//import * as firebase from 'firebase';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AngularFireAuth]
})
export class RegisterPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

   async register(user: User){
    try {
      const result = this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);

      this.afAuth.auth.currentUser.sendEmailVerification();
      //var auth = firebase.auth();
      //this.afAuth.auth.
      this.navCtrl.setRoot(LoginPage);

    }
    catch (e) {
      console.error(e);
    }
  } 

}
