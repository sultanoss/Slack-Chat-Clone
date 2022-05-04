import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { chat } from 'src/models/chat.class';
import { Thread } from 'src/models/thread.class';


@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  constructor(private firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute) { }

  thread = new Thread();

  threads: any = [];

  chatId: any;

  answer = ''

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((param) => {
      this.chatId = param.get('id');

      console.log(this.chatId);

      this.firestore.collection('threads', ref => ref.where('chatId', '==', this.chatId))
        .valueChanges({ idField: 'customIdName' })
        .subscribe((changes: any) => {
          console.log('recieved new  changes from DB', changes);
          this.threads = changes;
          console.log('threads:', this.threads);
        })

    })
  }

  addThread() {

  }

}


