import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StatusProvider {

  constructor(public http: HttpClient) {
    console.log('Hello StatusProvider Provider');
  }

  getStatus(status_id){
    if(status_id == "2"){
      return "Hantar";
    } else if (status_id == "3"){
      return "Diterima";
    } else if (status_id == "4"){
      return "Ditolak";
    } else {
      console.log("Error");
    }
  }
}
