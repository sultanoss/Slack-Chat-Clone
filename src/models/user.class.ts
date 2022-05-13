export class User {



  userName: String;
  userId:string

  constructor(obj?: any) {

    this.userName = obj ? obj.name : '';
    this.userId = obj ? obj.userId : '';

  }

  public toJson() {
    return {
      userName: this.userName,
      userId:this.userId
    }
  }
}
