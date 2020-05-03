import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../web-api/web-api.service';
import {startWith, switchMap} from "rxjs/operators";
import { interval } from 'rxjs';
import { MessageService } from '../message/message.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private service: WebApiService,private message : MessageService) { }

  players : any = [];
  parsedData : any ;

  ngOnInit() {
    var role = this.message.getGameRole();
    if( role[0] == 'creator'){
      var payload = {
        "user":{
              "key" : this.message.gameKey,
        }
      };
    }
    else {
      var payload = {
        "user":{
              "key" : role[2],
        }
      };
    }
    console.log(payload);
    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.service.postService('https://tambola-c3d12.firebaseapp.com/getAllUsernamesFromRoom',payload))
      ).subscribe(res =>{
        // console.log(res['_body']);
        console.log(Object.keys(res['_body']));
        this.parsedData = JSON.parse(res['_body']);
        let len = Object.keys(JSON.parse(res['_body'])).length;
        this.players = [];
        for(let i =0 ; i<len;i++){
            var key = Object.keys(JSON.parse(res['_body']))[i];
            this.players.push(this.parsedData[key]['username']);
        }
      });

    // this.service.postService('https://tambola-c3d12.firebaseapp.com/getAllUsernamesFromRoom',payload).subscribe(res =>{
    //   this.parsedData = JSON.parse(res['_body']);
    //   let len = Object.keys(JSON.parse(res['_body'])).length;
    //   for(let i =0 ; i<len;i++){
    //       var key = Object.keys(JSON.parse(res['_body']))[i];
    //       this.players.push(this.parsedData[key]['username']);
    //   }
    //   });
  }

}
