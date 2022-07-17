import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { first, firstValueFrom, map, of } from 'rxjs';
import { channel } from 'src/models/channel.class';
import { Chat } from 'src/models/chat.class';
import { DirectMessage } from 'src/models/directMessage.class';
import { User } from 'src/models/user.class';
import { AuthentificationserviceService } from '../services/authentificationservice.service';
import { Auth } from '@angular/fire/auth';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.scss'],
})
export class SideBarMenuComponent implements OnInit {
  channel = new channel();
  channels: any = [];

  user = new User();
  users: any[] = [];
  userId: any = '';

  directMessage = new DirectMessage();
  directMessages: any[] = [];

  selectedValue: any[] = []; // are the users from the selected box

  selectedUsers: any[] = [];

  userName!: string;

  constructor(
    private firestore: AngularFirestore,
    public authService: AuthentificationserviceService,
    public route: Router,
    private activatedRoute: ActivatedRoute,
    private auth: Auth,
    private toast: HotToastService
  ) {}

  async ngOnInit(): Promise<void> {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.channels = changes;
      });

    this.users = await firstValueFrom(
      this.firestore.collection('users').valueChanges()
    );

    this.removeUserFromSelectedValue();

    this.firestore
      .collection('directMessages', (ref) =>
        ref.where(
          'usersData',
          'array-contains',
          this.authService.currentUser.uid
        )
      )
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changesss: any) => {
        this.directMessages = changesss;
      });
  }

  addChannel() {
    if (this.authService.currentUser.isAnonymous) {
      this.toast.info('Only available for registered users !');
    } else {
      this.firestore
        .collection('channels')
        .add(this.channel.toJson())
        .then((result: any) => {});
    }
    this.clearChannel();
  }

  clearChannel() {
    this.channel = new channel();
  }

  addDirectMessage() {


    this.selectedValue.push({
      userId: this.authService.currentUser.uid,
      userName: this.authService.currentUser.displayName,
    });

    let authorName = this.authService.currentUser.displayName;
    this.firestore.collection('directMessages').add({
      author: authorName,
      authorId: this.authService.currentUser.uid,
      directMessageId: this.directMessage.customIdName,
      directMessageName: this.selectedValue.map((sv: any) => sv.userName),
      usersData: this.selectedValue.map((sv: any) => sv.userId),
    });
    console.log(`selectedValue:`, this.selectedValue);
    this.selectedValue = [];
  }

  getMessageId(directMessage: any) {
    this.firestore
      .collection('directMessages')
      .doc(directMessage['customIdName'])
      .update({
        directMessageId: directMessage.customIdName,
      });
  }

  removeUserFromSelectedValue() {
    // for not showing the currentUser in the selectbox
    if (this.authService.currentUser)
      this.selectedUsers = this.users.filter(
        (item: any) =>
          item.userName !== this.authService.currentUser.displayName
      );
  }
}
