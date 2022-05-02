import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { channel } from 'src/models/channel.class';
import { chat } from 'src/models/chat.class';
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
        console.log('recieved new  changes from DB', changes);
        this.channels = changes;
        console.log('channels:', this.channels);
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



}
