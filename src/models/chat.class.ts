export class chat {

  message: String;
  messageId: string;
  author: string;

  constructor(obj?: any) {

    this.message = obj ? obj.name : '';
    this.messageId = obj ? obj.channelId : '';
    this.author = obj ? obj.author : '';

  }

  public toJson() {
    return {
      message: this.message,
      messageId: this.messageId,
      autor: this.author,
    }
  }
}
