import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  TransactionService,
  txState,
} from '../../services/transactionService/transaction.service';
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
  toAddresses = ['0x0', '0x1', '0x2'];
  sendTxForm = new FormGroup({
    from: new FormControl('0x'),
    to: new FormControl(this.toAddresses[0]),
    amnt: new FormControl('0'),
    gasFee: new FormControl('0'),
  });
  txState: string;
  constructor(private transactionService: TransactionService) {
    this.transactionService.$isTxCompleted.subscribe((value) => {
      this.txState = txState.WAITING;
    });
    this.transactionService.$txState.subscribe((state) => {
      this.txState = state;
    });
  }

  ngOnInit(): void {}
  sendTx(): void {
    this.transactionService.startTx();
  }
}
