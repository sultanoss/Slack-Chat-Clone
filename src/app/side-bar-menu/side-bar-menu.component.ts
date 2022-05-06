import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { channel } from 'src/models/channel.class';
import { Chat } from 'src/models/chat.class';
import { AuthentificationserviceService } from '../services/authentificationservice.service';




@Component({
  selector: 'app-side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.scss']
})
export class SideBarMenuComponent implements OnInit {


  channel = new channel();
  channels: any = [];

  constructor(private firestore: AngularFirestore,
    public authService: AuthentificationserviceService,
    public route: Router) { }

  ngOnInit(): void {

    this.firestore.collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.channels = changes;

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



}
