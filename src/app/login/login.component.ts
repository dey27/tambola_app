import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../web-api/web-api.service';
import { MessageService } from '../message/message.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hideButtons : string = '';
  hide : boolean = false;
  constructor(private service : WebApiService,private message : MessageService) { }

  createGame(){
    this.hideButtons = 'created';
    this.hide = true;
  }
  joinGame(){
    this.hideButtons = 'joined';
    this.hide = true;
  }
  backFunc(){
    this.hideButtons = '*';
    this.hide = false;
  }
  setRole(value:any,username:any,key:any){
    console.log(value,username,key);
    this.message.setGameRole(value,username,key);
  }

  ngOnInit() {
  }

}
