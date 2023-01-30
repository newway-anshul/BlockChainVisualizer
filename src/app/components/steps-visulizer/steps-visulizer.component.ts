import { Component, OnInit } from '@angular/core';
import { take, timer } from 'rxjs';
import { TransactionService } from '../../services/transactionService/transaction.service';
import { logger } from '../../utils/helper';
@Component({
  selector: 'sb-steps-visulizer',
  templateUrl: './steps-visulizer.component.html',
  styleUrls: ['./steps-visulizer.component.scss'],
})
export class StepsVisulizerComponent implements OnInit {
  heading: string = 'Steps Visualizer';
  timeLines = [
    'Transaction sent to one of the node',
    'Transaction broadcasted to all the nodes',
    'Validating trasaction',
  ];
  start: Array<boolean> = [];
  animationState: Array<boolean> = [];
  timeLine: GSAPTimeline;
  logger: logger = new logger('[sb-steps-visulizer]');
  constructor(private txService: TransactionService) {
    this.txService.$startTx.subscribe((value) => {
      this.start.push(value);
      this.txService.setAnimationState(this.start.length - 1);
    });
  }

  ngOnInit(): void {
    this.txService.$animationCompleted.subscribe((value) => {
      if (this.start.length == this.timeLines.length) {
        this.logger.log('all msgs are shown');
        this.txService.completeTxCompleted();
      }
      timer(1000)
        .pipe(take(1))
        .subscribe(() => {
          this.start.push(true);
          this.txService.setAnimationState(this.start.length - 1);
        });
    });
  }
}
