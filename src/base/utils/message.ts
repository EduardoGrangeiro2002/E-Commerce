export class Message {
  public readonly msg: string;
  public readonly obj: any;
  constructor(msg: string, obj = {}) {
    this.msg = msg;
    this.obj = obj;
  }
}
