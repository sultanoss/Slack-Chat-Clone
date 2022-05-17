export class DirectMessage {


  author:String;
  userName:string
  usersData: [];
  customIdName:string
  directMessageId:string

  constructor(obj?: any) {

    this.usersData = obj ? obj.usersData : '';
    this.userName = obj ? obj.userName : '';
    this.customIdName = obj ? obj.customIdName : '';
    this.author = obj ? obj.author : '';
    this.directMessageId = obj ? obj.directMessageId : '';

  }

  public toJson() {
    return {
      users: this.usersData,
      customIdName:this.customIdName,
      author:this.author,
      directMessageId:this.directMessageId,
      userName:this.userName
    }
  }
}
