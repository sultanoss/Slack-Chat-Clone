import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Chat } from 'src/models/chat.class';
import { Thread } from 'src/models/thread.class';
import { AuthentificationserviceService } from '../services/authentificationservice.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent implements OnInit, OnChanges {
  constructor(
    private firestore: AngularFirestore,
    public authService: AuthentificationserviceService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.firestore
      .collection('threads', (ref) =>
        ref.where('chatId', '==', this.chat.customIdName)
      )
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.threads = changes;
        this.sortByDate();
      });
  }

  @Input() chat!: Chat;
  @Input() show!: boolean;
  @Output() hide = new EventEmitter<false>(); //Angular to way binding

  thread = new Thread();

  threads: any = [];

  threadDate = new Date();

  chatId!: string;

  ngOnInit(): void {}

  addThread() {

    this.checkUser();

    let userName = this.authService.currentUser.displayName;
    this.firestore.collection('threads').add({
      answer: this.thread.answer,
      author: userName,
      chatId: this.chat.customIdName,
      threadDate: this.threadDate.getTime(),
    });
    this.clearAnswerInput();
  }

  clearAnswerInput() {
    this.thread.answer = '';
  }

  hideThread() {
    this.show = false;
    this.hide.emit(this.show);
  }

  openImg(chat: any) {
    window.open(chat.img);
  }

  sortByDate() {
    this.threads.sort(function (a: any, b: any) {
      return b.threadDate - a.threadDate;
    });
  }

  checkUser() {
    if (this.authService.currentUser.isAnonymous == true) {
      this.authService.currentUser.displayName = 'Guest';
    }
  }
}
