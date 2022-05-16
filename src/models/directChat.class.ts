export class DirectChat {


  author:string;
  authorId:string
  userId:string
  directMessage: String;
  customIdName:string

  constructor(obj?: any) {

    this.directMessage = obj ? obj.directMessage : '';
    this.customIdName = obj ? obj.customIdName : '';
    this.author = obj ? obj.author : '';
    this.authorId = obj ? obj.authorId : '';
    this.userId = obj ? obj.userId : '';

  }

  public toJson() {
    return {
      directMessage: this.directMessage,
      author:this.author,
      authorId:this.authorId,
      userId:this.userId
    }
  }
}
