export class chat {


  message: String;
  chatChannelId: string;
  author: string;

  constructor(obj?: any) {

    this.message = obj ? obj.name : '';
    this.chatChannelId = obj ? obj.channelId : '';
    this.author = obj ? obj.author : '';

  }

  public toJson() {
    return {
      message: this.message,
      chatChannelId: this.chatChannelId,
      autor: this.author,
    }
  }
}
