import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'sb-send-trasaction',
  templateUrl: './send-trasaction.component.html',
  styleUrls: ['./send-trasaction.component.scss'],
})
export class SendTrasactionComponent implements OnInit {
  heading: string = 'Send Trasaction';
  //heading variables
  network = 'Test Network';
  knowMore = '(know more)';
  sendTxForm = new FormGroup({
    from: new FormControl('0x'),
    to: new FormControl('0x'),
    amnt: new FormControl('0'),
    gasFee: new FormControl('0'),
  });
  constructor() {}

  ngOnInit(): void {}
  sendTx(): void {}
}
