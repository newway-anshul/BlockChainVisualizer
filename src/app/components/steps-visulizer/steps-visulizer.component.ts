import { Component, OnInit } from '@angular/core';
import { logger } from '../../utils/helper';
@Component({
  selector: 'sb-steps-visulizer',
  templateUrl: './steps-visulizer.component.html',
  styleUrls: ['./steps-visulizer.component.scss'],
})
export class StepsVisulizerComponent implements OnInit {
  heading: string = 'Steps Visualizer';
  timeLines = [
    'Chris Serrano posted a photo on your wall.',
    'Mia Redwood commented on your last post.',
    'Lucas McAlister just send you a message.',
  ];
  start: Array<boolean> = [];
  circleArry = [1];
  showLine = false;
  showCircle = false;
  timeLine: GSAPTimeline;
  logger: logger = new logger('[sb-steps-visulizer]');
  constructor() {}

  ngOnInit(): void {}
  addNewCircle(): void {
    this.start.push(true);
    console.log(this.start);
  }
  animationCompleted() {
    this.logger.log('step animation completed');
  }
}
