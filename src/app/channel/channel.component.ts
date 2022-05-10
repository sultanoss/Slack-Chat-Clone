import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chat } from 'src/models/chat.class';
import { AuthentificationserviceService } from '../services/authentificationservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';





@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {


  @Input() show: boolean = false;

  chat = new Chat()

  chats: any = [];

  @Input() currentChat!: Chat;

  channelId: any = '';

  channelName: any;

  public file: any = {};

  imgUrl: string = '';

  editedMessage: string = '';

  schowEditContainer: boolean = false;


  constructor(private firestore: AngularFirestore,
    public authService: AuthentificationserviceService,
    private activatedRoute: ActivatedRoute,
    public storage: Storage,
    private route: Router) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((param) => {
      this.channelId = param.get('id');
      this.firestore.doc('/channels/' + this.channelId).get().subscribe(snap => {
        console.log(snap.id);
        console.log(snap.data());
      })

      this.firestore.collection('chats', ref => ref.where('chatChannelId', '==', this.channelId))
        .valueChanges({ idField: 'customIdName' })
        .subscribe((changes: any) => {
          this.chats = changes;
        })

    })

  }

  sendMessage() {

    let userName = this.authService.currentUser.displayName;
    this.firestore.collection('chats').add({
      message: this.chat.message,
      author: userName,
      chatChannelId: this.channelId,
      img: this.imgUrl,
    })

    this.clearInput();
  }

  clearInput() {

    this.chat.message = '';
  }

  deleteChat(chat: any) {

    this.firestore.collection('chats').doc(chat['customIdName']).delete();

  }

  showEditContainer(chat: any) {
    chat.schowEditContainer = true;
  }

  editChat(chat: any) {
    this.firestore.collection("chats").doc(chat['customIdName']) // hier um eine feld zu updaten bzw editieren
      .update({ message: this.editedMessage })
    this.editedMessage = '';
  }

  deleteImg(chat:any){
     this.firestore.collection("chats").doc(chat['customIdName']) // hier um eine feld zu updaten bzw editieren
    .update({img : ''})
  }

  CloseEditChat(chat: any) {
    chat.schowEditContainer = false;
  }

  showThread(chat: any) {
    this.currentChat = chat;
    console.log(this.currentChat);

    this.show = true;
    console.log(this.show)
  }

  chooseFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file)
  }

  addData() {
    const storageRef = ref(this.storage, this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },

      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },

      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.imgUrl = downloadURL;
          console.log(this.imgUrl);
        });
      }
    )
  }

  openImg(chat: any) {
    window.open(chat.img)
  }

}
