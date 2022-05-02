import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  constructor(private firestore: AngularFirestore) { }

  threads:any = [];

  ngOnInit(): void {

    this.firestore.collection('chats')
    .valueChanges({ idField: 'customIdName' })
    .subscribe((changes: any) => {
      console.log('recieved new  changes from DB', changes);
      this.threads = changes;
      console.log('channels:',this.threads);
    })
  }

}
