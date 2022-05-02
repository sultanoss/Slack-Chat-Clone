export class channel {



  name: String;

  constructor(obj?: any) {

    this.name = obj ? obj.name : '';

  }

  public toJson() {
    return {
      name: this.name,
    }
  }
}
