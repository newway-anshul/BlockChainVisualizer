import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
enum txState {
  WAITING = 'w',
  SENT = 's',
  IN_PROGRESS = 'ip',
  COMPLETED = 'c',
}
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  $startTx: Subject<boolean> = new Subject();
  $isTxCompleted: Subject<boolean> = new Subject();
  $txState: BehaviorSubject<string> = new BehaviorSubject<string>(
    txState.WAITING
  );
  constructor() {}
  startTx(): void {
    this.$startTx.next(true);
    this.$txState.next(txState.SENT);
    this.$txState.next(txState.IN_PROGRESS);
  }
  txCompleted() {
    this.$txState.next(txState.COMPLETED);
    this.$txState.next(txState.WAITING);
  }
}
