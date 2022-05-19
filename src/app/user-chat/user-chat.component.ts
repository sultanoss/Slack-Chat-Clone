import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationserviceService } from '../services/authentificationservice.service';
import { first } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { DirectChat } from 'src/models/directChat.class';




@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit {

  userName:string = ''

  directMessageId: any = '';
  directMessagesData: any = [];

  directMessages: any = []

  directChat = new DirectChat();
  directChats:any = [];

  users:any;

  constructor(private firestore: AngularFirestore,
    public authService: AuthentificationserviceService,
    private activatedRoute: ActivatedRoute,
    private auth: Auth) { }

  ngOnInit(): void {

    this.auth.onAuthStateChanged((user) => {

      if (user)

    this.activatedRoute.paramMap.subscribe((param) => {
      this.directMessageId = param.get('id');

      this.getUserName();

      // this.getUserId();
      // console.log(this.directMessageId);

      this.firestore.collection('directChats',
      ref => ref.where('directMessageId', '==', this.directMessageId))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes:any) => {

        this.directChats = changes
        console.log('directChats',this.directChats)

      })
    })

  })

  }

  getUserName() {
    this.firestore.collection<any>('directMessages').doc(this.directMessageId) // for geting the doc with id = channelId and the name
      .get()
      .pipe(first())
      .subscribe(res => {
        this.directMessagesData = res.data()
        this.userName = this.directMessagesData.directMessageName;
        console.log(this.directMessagesData.directMessageName)
      })
  }

  // getUserId(){

  //   this.firestore.collection<any>('directMessages').doc(this.directMessageId) // for geting the doc with id = channelId and the name
  //   .get()
  //   .pipe(first())
  //   .subscribe(res => {
  //     this.directMessagesData = res.data()
  //     this.users = this.directMessagesData.usersData;
  //     console.log('users',this.directMessagesData.usersData)
  //   })

  // }

  sendDirectMessage(){

    this.firestore.collection('directChats').add({

      directChatMessage:this.directChat.directChatMessage,
      directMessageId:this.directMessageId
    })

  }

}



