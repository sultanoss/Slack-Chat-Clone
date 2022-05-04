import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { chat } from 'src/models/chat.class';
import { AuthentificationserviceService } from '../services/authentificationservice.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  // text: string = '';

  chat = new chat()

  chats: any = [];

  // channel!: channel;

  channelId: any = '';

  constructor(private firestore: AngularFirestore,
    public authService: AuthentificationserviceService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((param) => {
      this.channelId = param.get('id');

      this.firestore.collection('chats', ref => ref.where('chatChannelId', '==', this.channelId))
        .valueChanges({ idField: 'customIdName' })
        .subscribe((changes: any) => {
          console.log('recieved new  changes from DB', changes);
          this.chats = changes;
          console.log('chats:', this.chats);
        })

    })

  }

  sendMessage() {
    let userName = this.authService.currentUser.displayName;
    this.firestore.collection('chats').add({
      message: this.chat.message,
      author: userName,
      chatChannelId: this.channelId,
    })

    this.clearInput();
  }

  clearInput() {

    this.chat.message = '';

  }

  showThread(chat: any) {

    this.firestore.collection('threads').add({
      chatMessage: chat.message,
      author: chat.author,
      chatId: chat.customIdName,

    })

  }

}
