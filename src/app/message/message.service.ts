import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators'
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http : Http) { }
  gameRole : any;
  username : any;
  gameKey : any;

  setGameRole(value:any,username:any,key:any){
    this.gameRole = value;
    this.username = username;
    this.gameKey = key;
  }
  getGameRole(){
    let tempdata = [this.gameRole,this.username ,this.gameKey];
    return tempdata;
  }
}
