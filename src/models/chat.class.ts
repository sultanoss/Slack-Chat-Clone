export class Chat {


  message: String;
  chatChannelId: string;
  author: string;
  customIdName: string;
  img: string;
  schowEditContainer: boolean;

  constructor(obj?: any) {

    this.message = obj ? obj.name : '';
    this.chatChannelId = obj ? obj.channelId : '';
    this.author = obj ? obj.author : '';
    this.customIdName = obj ? obj.customIdName : '';
    this.img = obj ? obj.img : '';
    this.schowEditContainer = obj ? obj.schowEditContainer : '';

  }

  public toJson() {
    return {
      message: this.message,
      chatChannelId: this.chatChannelId,
      autor: this.author,
      img: this.img,
      schowEditContainer: this.schowEditContainer
    }
  }
}
