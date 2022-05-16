import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationserviceService } from '../services/authentificationservice.service';
import { first } from 'rxjs';
import { DirectChat } from 'src/models/directChat.class';
import { Auth } from '@angular/fire/auth';




@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit {

  userId: any = '';
  userName!: string;
  users: any = [];

  directChat = new DirectChat();
  directChats: any = [];

  constructor(private firestore: AngularFirestore,
    public authService: AuthentificationserviceService,
    private activatedRoute: ActivatedRoute,
    private auth: Auth) { }

  ngOnInit(): void {

    this.auth.onAuthStateChanged((user) => {

      if (user)

        this.activatedRoute.paramMap.subscribe((param) => {
          this.userId = param.get('id');
          this.getUserName();

          this.firestore.collection('directMessages', ref => ref.where('authorId', '==', user.uid)
          .where('userId' ,'==',this.userId))
           .valueChanges({ idField: 'customIdName' }).subscribe((changes: any) => {
            this.directChats = changes;
            console.log(this.directChats)
            console.log(user.uid)
          })

        })
    })
  }

  getUserName() {
    this.firestore.collection<any>('users').doc(this.userId) // for geting the doc with id = channelId and the name
      .get()
      .pipe(first())
      .subscribe(res => {
        this.users = res.data()
        console.log(this.users.userName);
        this.userName = this.users.userName
      })
  }

  addDirectMessage() {

    let authorName = this.authService.currentUser.displayName;
    this.firestore.collection('directMessages').add({
      directMessage: this.directChat.directMessage,
      author: authorName,
      authorId: this.authService.currentUser.uid,
      userId: this.userId
    })

    this.clearInput();
    console.log(this.authService.currentUser.uid)
  }

  clearInput() {
    this.directChat.directMessage = '';
  }

}


