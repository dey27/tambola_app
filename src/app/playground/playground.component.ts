import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message/message.service';
import { WebApiService } from '../web-api/web-api.service';
declare var require: any;
const tambola = require('tambola-generator');



@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  tickets:any = tambola.getTickets(1);
  firstRow : any = [];
  secondRow : any = [];
  thirdRow : any = [];
  idx : any = 0;
  selectedTile : any;
  dataList : any = [];
  showNumber : any;
  playerRole : any;
  gameKey : any;


  constructor(private service : WebApiService,private message : MessageService) {
    this.firstRow = this.tickets[0][0];
    this.secondRow = this.tickets[0][1];
    this.thirdRow = this.tickets[0][2];
    this.dataList = tambola.getDrawSequence();
   }

   selection(id:any){
     this.selectedTile = id != '0' ? id : null;
     if(this.selectedTile != null){
      document.getElementById(id).style.backgroundColor="skyblue";
     }
   }
   next(){
    this.showNumber = this.dataList.pop();
   }
   
 

  ngOnInit() {
    var role = this.message.getGameRole();
    console.log(role);
    if( role[0] == 'creator'){
      this.playerRole = role[0];

      this.service.getService('https://tambola-c3d12.firebaseapp.com/getRoomId').subscribe(response => {
        this.gameKey = response.roomKey;
        console.log(this.gameKey);
        
      var payload = {
        "user":{
        "key" : this.gameKey,
        "username": role[1],
        "isHost" : true
       }
     };
     console.log(payload);
     this.service.postService('https://tambola-c3d12.firebaseapp.com/createAndJoinRoom',payload).subscribe(res =>{
      console.log(res);
    });

    });
    }
    else{
      this.playerRole = role[0];
      var payload = {
             "user":{
             "key" : role[2],
             "username": role[1],
             "isHost" : false
            }
          };
          console.log(payload);
     this.service.postService('https://tambola-c3d12.firebaseapp.com/createAndJoinRoom',payload).subscribe(res =>{
       console.log(res);
     });
    }
  }

}
