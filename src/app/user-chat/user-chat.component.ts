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

  constructor(private firestore: AngularFirestore,
    public authService: AuthentificationserviceService,
    private activatedRoute: ActivatedRoute,
    private auth: Auth) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((param) => {
      this.directMessageId = param.get('id');

      this.getUserName();

      this.firestore.collection('directChats',
      ref => ref.where('directMessageId', '==', this.directMessageId))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes:any) => {

        this.directChats = changes
        console.log('directChats',this.directChats)

      })
    })

  }

  getUserName() {
    this.firestore.collection<any>('directMessages').doc(this.directMessageId) // for geting the doc with id = channelId and the name
      .get()
      .pipe(first())
      .subscribe(res => {
        this.directMessagesData = res.data()
        this.userName = this.directMessagesData.userName;
        console.log(this.directMessagesData.userName)
      })
  }

  sendDirectMessage(){

    this.firestore.collection('directChats').add({

      directChatMessage:this.directChat.directChatMessage,
      directMessageId:this.directMessageId
    })

  }

}



