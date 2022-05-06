export class Chat {


  message: String;
  chatChannelId: string;
  author: string;
  customIdName: string;

  constructor(obj?: any) {

    this.message = obj ? obj.name : '';
    this.chatChannelId = obj ? obj.channelId : '';
    this.author = obj ? obj.author : '';
    this.customIdName = obj ? obj.customIdName : '';

  }

  public toJson() {
    return {
      message: this.message,
      chatChannelId: this.chatChannelId,
      autor: this.author,
    }
  }
}
