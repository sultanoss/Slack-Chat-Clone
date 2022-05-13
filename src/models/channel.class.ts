export class channel {



  name: String;
  customIdName:string

  constructor(obj?: any) {

    this.name = obj ? obj.name : '';
    this.customIdName = obj ? obj.customIdName : '';

  }

  public toJson() {
    return {
      name: this.name,
    }
  }
}
