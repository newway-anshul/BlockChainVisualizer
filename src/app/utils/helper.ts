export class logger {
  lable: string = '';
  constructor(private _label: string) {
    this.lable = _label;
  }
  log(msg: any) {
    let flame = String.fromCodePoint(0x1f916);
    console.log(`${flame} ${this.lable}::${msg}`);
  }
}
