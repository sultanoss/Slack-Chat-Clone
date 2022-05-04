export class Thread {


  answer: String;
  chatMessage:string
  chatId: string;
  author: string;

  constructor(obj?: any) {

    this.answer = obj ? obj.answer : '';
    this.chatId = obj ? obj.channelId : '';
    this.author = obj ? obj.author : '';
    this.chatMessage = obj ? obj.chatMessage : '';

  }

  public toJson() {
    return {
      answer: this.answer,
      chatId: this.chatId,
      autor: this.author,
      chatMessage: this.chatMessage
    }
  }
}
