export class DirectChat {


  author:string;
  directMessageId: String;
  directChatMessage:string;
  customIdName:string

  constructor(obj?: any) {

    this.directMessageId = obj ? obj.directMessage : '';
    this.customIdName = obj ? obj.customIdName : '';
    this.author = obj ? obj.author : '';
    this.directChatMessage = obj ? obj.directChatMessage : '';


  }

  public toJson() {
    return {
      directMessageId: this.directMessageId,
      author:this.author,
      customIdName:this.customIdName,
      directChatMessage:this.directChatMessage
    }
  }
}
