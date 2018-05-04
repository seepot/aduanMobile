import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class KesalahanProvider {

  constructor(public http: HttpClient) {
    console.log('Hello KesalahanProvider Provider');
  }

  getKesalahan(id){
    if (id == "1"){
      return "gagal mematuhi lampu isyarat merah";
    } else if (id == "2"){
      return "memotong garisan berkembar";
    } else if (id == "3"){
      return "menggunakan telefon bimbit semasa memandu";
    }  else if (id == "4"){
      return "memandu di lorong kecemasan";
    }  else if (id == "5"){
      return "tidak memakai tali pinggang keledar";
    } else if (id == "6"){
      return "bas tiada pemandu kedua bagi perjalanan melebihi 4 jam";
    } else {
      return "error";
    }
  }

}
