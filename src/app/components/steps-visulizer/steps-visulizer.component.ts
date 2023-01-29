import { Component, OnInit } from '@angular/core';
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
  circleArry = [1];
  timeLine: GSAPTimeline;
  logger: logger = new logger('[sb-steps-visulizer]');
  constructor(private txService: TransactionService) {
    this.txService.$startTx.subscribe((value) => {
      this.start.push(value);
    });
  }

  ngOnInit(): void {}
  addNewCircle(): void {}
  animationCompleted() {
    this.start.push(true);
  }
}
