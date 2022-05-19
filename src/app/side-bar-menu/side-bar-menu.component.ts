import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs';
import { channel } from 'src/models/channel.class';
import { Chat } from 'src/models/chat.class';
import { DirectMessage } from 'src/models/directMessage.class';
import { User } from 'src/models/user.class';
import { AuthentificationserviceService } from '../services/authentificationservice.service';
import { Auth } from '@angular/fire/auth';
import { MatSelect } from '@angular/material/select';





@Component({
  selector: 'app-side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.scss']
})
export class SideBarMenuComponent implements OnInit {

  channel = new channel();
  channels: any = [];

  user = new User();
  users: any[] = [];
  userId: any;

  directMessage = new DirectMessage()
  directMessages: any[] = [];

  selectedValue:any;

  constructor(private firestore: AngularFirestore,
    public authService: AuthentificationserviceService,
    public route: Router,
    private activatedRoute: ActivatedRoute,
    private auth: Auth) { }

  ngOnInit(): void {

    this.auth.onAuthStateChanged((user) => {

      if (user)

        this.firestore.collection('channels')
          .valueChanges({ idField: 'customIdName' })
          .subscribe((changes: any) => {
            this.channels = changes;

          })

      this.firestore.collection('users')
        .valueChanges({ idField: 'customIdName' })
        .subscribe((changess: any) => {
          this.users = changess;
          console.log(this.users)
        })

      this.firestore.collection('directMessages', ref =>
        ref.where('usersData', 'array-contains', user?.uid))
        .valueChanges({ idField: 'customIdName' })
        .subscribe((changesss: any) => {
          this.directMessages = changesss;
          console.log(this.directMessages)
        })
    })
  }

  addChannel() {

    this.firestore.collection('channels').add(this.channel.toJson()).then((result: any) => {
      console.log(result)
    })

    this.clearChannel();

  }

  clearChannel() {

    this.channel = new channel();

  }

  addDirectMessage() {

    let authorName = this.authService.currentUser.displayName;
    this.firestore.collection('directMessages').add({
      author: authorName,
      authorId: this.authService.currentUser.uid,
      directMessageId: this.directMessage.customIdName,
      directMessageName:this.selectedValue,
      usersData: [
        this.authService.currentUser.uid,
      ]
    })
  }


  // getMessageId(directMessage:any){

  //   this.firestore.collection("directMessages").doc(directMessage['customIdName'])
  //   .update(
  //     { directMessageId: directMessage.customIdName ,
  //       // userId:directMessage.usersData.user.customIdName
  //           })

  // }

}
