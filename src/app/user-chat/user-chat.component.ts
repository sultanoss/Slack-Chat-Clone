import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationserviceService } from '../services/authentificationservice.service';
import { first } from 'rxjs';
import { Auth } from '@angular/fire/auth';




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

  constructor(private firestore: AngularFirestore,
    public authService: AuthentificationserviceService,
    private activatedRoute: ActivatedRoute,
    private auth: Auth) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((param) => {
      this.directMessageId = param.get('id');

      this.getUserName();
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

}


