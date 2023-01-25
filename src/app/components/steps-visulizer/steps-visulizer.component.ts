import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}
}
