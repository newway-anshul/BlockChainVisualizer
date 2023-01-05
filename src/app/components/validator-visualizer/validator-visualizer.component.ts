import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/src/all';
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
  //nodes data
  nodes = [
    {
      id: 1,
      cx: '459.0909118652344',
      cy: '251.81817626953125',
    },
    {
      id: 2,
      cx: '1720.9090270996094',
      cy: '662.7272644042969',
    },
    {
      id: 3,
      cx: '1424.5454406738281',
      cy: '360.90909576416016',
    },
    {
      id: 4,
      cx: '1124.5454406738281',
      cy: '520.9091033935547',
    },
    {
      id: 5,
      cx: '1228.1818237304688',
      cy: '140.9091033935547',
    },
    {
      id: 6,
      cx: '690.0000305175781',
      cy: '560.9091033935547',
    },
  ];
  nodeColor = '#5b9bd2';
  nodeOuterStrokeColor = 'white';
  nodeRadius = '30';
  lineColor = '#d2616185';
  l2N = '#d2616185'; //location icon to node line color
  locationIconColor = '#e82327';
  locationIconBaseColor = '#e3e2e1';
  //animation related
  showTransaction = false;
  sendTransactionDuration = 2;
  trasactionCircleRadius = 15;
  constructor() {
    gsap.registerPlugin(MotionPathPlugin);
  }

  ngOnInit(): void {}
  sendTransaction(): void {
    this.showTransaction = true;
    gsap.to('#tNode', {
      duration: this.sendTransactionDuration,
      motionPath: '#wire',
      ease: 'none.none',
      onComplete: () => {},
    });
  }
  broadCast() {}
}
