import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Chat } from 'src/models/chat.class';
import { Thread } from 'src/models/thread.class';
import { AuthentificationserviceService } from '../services/authentificationservice.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit, OnChanges {

  constructor(private firestore: AngularFirestore, public authService: AuthentificationserviceService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes :", changes);

    this.firestore.collection('threads', ref => ref.where('chatId', '==', this.chat.customIdName))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.threads = changes;
        console.log('threads', this.threads)
      })
  }

  @Input() chat!: Chat;
  @Input() show!:boolean;

  thread = new Thread();

  threads: any = [];


  chatId!: string;

  ngOnInit(): void {


  }

  addThread() {

    // this.firestore.collection("chats").doc('gNCVxIaYEKGO7xytPTB4') // hier um eine feld zu updaten bzw editieren
    // .update({answer : this.thread.answer})
    // this.firestore.collection("chats").doc('gNCVxIaYEKGO7xytPTB4')// hier um eine feld zu adden und wenn das feld existiert dann tut es updaten
    // .set({answer : this.thread.answer}, {merge : true})

    let userName = this.authService.currentUser.displayName;
    this.firestore.collection('threads').add({
      answer: this.thread.answer,
      author: userName,
      chatId: this.chat.customIdName,
    })
    this.clearAnswerInput();

  }

  clearAnswerInput() {
    this.thread.answer = ''
  }

  hideThread(){
    this.show = false;
    console.log(this.show);
  }

}


