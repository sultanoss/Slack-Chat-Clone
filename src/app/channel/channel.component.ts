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

  channelId: string = 'JaytdBC6CTwSlleE9d0A'

  chat = new chat()

  chats: any = [];

  constructor(private firestore: AngularFirestore,
    public authService: AuthentificationserviceService) { }

  ngOnInit(): void {

    // this.firestore.collection('chats', ref => ref.where('channelId', '==', 'J5eEmNKKQULi1wNz6V32'))
      this.firestore.collection('chats')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        console.log('recieved new  changes from DB', changes);
        this.chats = changes;
        console.log('chats:', this.chats);
      })
  }

  sendMessage() {

    this.firestore.collection('chats').add(this.chat.toJson()).then((result: any) => {

    })

    this.clearChannel();

  }

  clearChannel() {

    this.chat = new chat();

  }

}
