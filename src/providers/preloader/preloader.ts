import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class PreloaderProvider {

   private loading : any;

   constructor( public http        : HttpClient,
                public loadingCtrl : LoadingController)
   {
   }

   displayPreloader() : void
   {
      this.loading = this.loadingCtrl.create({
         content: 'Please wait...'
      });

      this.loading.present();
   }

   hidePreloader() : void
   {
      this.loading.dismiss();
   }

}