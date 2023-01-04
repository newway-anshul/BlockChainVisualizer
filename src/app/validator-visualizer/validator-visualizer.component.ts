import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-validator-visualizer',
  templateUrl: './validator-visualizer.component.html',
  styleUrls: ['./validator-visualizer.component.scss'],
})
export class ValidatorVisualizerComponent implements OnInit {
  heading: string = 'Validator Nodes/ P2P Network';
  tempMapLocation = 'your location(temporary)';
  connectingLine = 'virtual connection';
  validatorNode = 'validator node';
  nodeColor = '#5b9bd2';
  nodeOuterStrokeColor = 'white';
  nodeRadius = '30';
  lineColor = '#5b9bd2';
  l2N = '#5b9bd2'; //location icon to node line color
  locationIconColor = '#e82327';
  locationIconBaseColor = '#e3e2e1';
  constructor() {}

  ngOnInit(): void {}
  sendTransaction(): void {}
}
