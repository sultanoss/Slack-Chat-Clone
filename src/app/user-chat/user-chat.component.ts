import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationserviceService } from '../services/authentificationservice.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit {

  userId: any = '';
  userName!: string;
  users: any = [];

  constructor(private firestore: AngularFirestore,
    public authService: AuthentificationserviceService,
    private activatedRoute: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((param) => {
      this.userId = param.get('id');
        this.getUserName();
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

  sendMessage(){

  }

}
