import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
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
  userId: any = '';

  directMessage = new DirectMessage()
  directMessages: any[] = [];

  selectedValue: any;

  userName!:string;

  constructor(private firestore: AngularFirestore,
    public authService: AuthentificationserviceService,
    public route: Router,
    private activatedRoute: ActivatedRoute,
    private auth: Auth) { }

  ngOnInit(): void {

    this.firestore.collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.channels = changes;

      })

    this.firestore.collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changess: any) => {
        this.users = changess;
      })

    this.firestore.collection('directMessages',
      ref => ref.where('directMessageName', 'array-contains',
        this.authService.currentUser.displayName))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changesss: any) => {
        this.directMessages = changesss;
      })
  }

  addChannel() {

    this.firestore.collection('channels').add(this.channel.toJson()).then((result: any) => {
    })

    this.clearChannel();

  }

  clearChannel() {

    this.channel = new channel();

  }

  addDirectMessage() {

    this.selectedValue.push({
      userEmail: this.authService.currentUser.email,
      userName: this.authService.currentUser.displayName,
    });

    let authorName = this.authService.currentUser.displayName;
    this.firestore.collection('directMessages').add({
      author: authorName,
      authorId: this.authService.currentUser.uid,
      directMessageId: this.directMessage.customIdName,
      directMessageName: this.selectedValue.map((sv: any) =>(sv.userName)),
      usersData: this.selectedValue.map((sv: any) => sv.userEmail),
    })

  }


  getMessageId(directMessage: any) {

    this.firestore.collection("directMessages").doc(directMessage['customIdName'])
      .update(
        {
          directMessageId: directMessage.customIdName,

        })
  }

 stringToHTML(str :string) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  };

   createElementFromHTML(htmlString:any) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
  }

}
