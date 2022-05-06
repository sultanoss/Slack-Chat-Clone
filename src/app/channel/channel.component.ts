import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chat } from 'src/models/chat.class';
import { AuthentificationserviceService } from '../services/authentificationservice.service';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {


  @Input() show: boolean = false;

  chat = new Chat()

  chats: any = [];

  @Input() currentChat!: Chat;

  channelId: any = '';

  channelName: any;

  constructor(private firestore: AngularFirestore,
    public authService: AuthentificationserviceService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((param) => {
      this.channelId = param.get('id');
      this.firestore.doc('/channels/' + this.channelId).get().subscribe(snap => {
        console.log(snap.id);
        console.log(snap.data());
      })

      this.firestore.collection('chats', ref => ref.where('chatChannelId', '==', this.channelId))
        .valueChanges({ idField: 'customIdName' })
        .subscribe((changes: any) => {
          this.chats = changes;
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
    this.currentChat = chat;
    console.log(this.currentChat);

    // this.firestore.doc('/chats/' + this.channelId).get().subscribe(snap => {
    //   console.log(snap.id);
    //   console.log(snap.data());
    // })

    this.show = true;
    console.log(this.show)
  }

}
