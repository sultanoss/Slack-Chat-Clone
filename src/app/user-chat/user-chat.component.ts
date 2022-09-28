import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationserviceService } from '../services/authentificationservice.service';
import { first } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { DirectChat } from 'src/models/directChat.class';
import { serverTimestamp } from 'firebase/firestore';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss'],
})
export class UserChatComponent implements OnInit {
  usersName: any = '';

  directMessageId: any = '';
  directMessagesData: any = [];

  directMessages: any = [];

  directChat = new DirectChat();
  directChats: any = [];

  users: any;

  directChateDate = new Date();

  constructor(
    private firestore: AngularFirestore,
    public authService: AuthentificationserviceService,
    private activatedRoute: ActivatedRoute,
    private auth: Auth,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.directMessageId = param.get('id');

      this.firestore
        .collection('directChats', (ref) =>
          ref.where('directMessageId', '==', this.directMessageId)
        )
        .valueChanges({ idField: 'customIdName' })
        .subscribe((changes: any) => {
          this.directChats = changes;
          this.sortByDate();
        });
      this.getUserName();
    });
  }

  async getUserName() {
    this.firestore
      .collection<any>('directMessages')
      .doc(this.directMessageId) // for geting the doc with id = channelId and the name
      .get()
      .pipe(first())
      .subscribe((res) => {
        this.directMessagesData = res.data();
        this.usersName =  this.directMessagesData.directMessageName;
      });
  }

  sendDirectMessage() {
    if (this.directChat.directChatMessage == '') {
      this.toast.info('Please enter a message !');
      return;
    }
    this.firestore.collection('directChats').add({
      directChatMessage: this.directChat.directChatMessage,
      directMessageId: this.directMessageId,
      directChatAuthor: this.authService.currentUser.displayName,
      directChatDate: serverTimestamp(),
    });
    this.directChat.directChatMessage = '';
  }

  sortByDate() {
    this.directChats.sort(function (a: any, b: any) {
      return b.directChatDate - a.directChatDate;
    });
  }
}
