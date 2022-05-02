import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { chat } from 'src/models/chat.class';
import { AuthentificationserviceService } from '../services/authentificationservice.service';
import { channel } from 'src/models/channel.class';



@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  text: string = '';

  chat = new chat()

  chats: any = [];

  constructor(private firestore: AngularFirestore,
    public authService: AuthentificationserviceService,
  ) { }

  ngOnInit(): void {
    this.firestore.collection('chats', ref => ref.where('messageId', '==', 'Wh5f56lISU9bk1pAZYEO'))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        console.log('recieved new  changes from DB', changes);
        this.chats = changes;
        console.log('chats:', this.chats);
      })

    this.clearChannel();
  }

  sendMessage() {

    this.firestore.collection('chats').add({
      message: this.chat.message,
      author: '',
      messageId: 'Wh5f56lISU9bk1pAZYEO'
    })
  }

  clearChannel() {

    this.chat = new chat();

  }

}
