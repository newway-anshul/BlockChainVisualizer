import { Component, OnInit, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/src/all';
import { skip, Subject } from 'rxjs';
import { TransactionService } from 'src/app/services/transactionService/transaction.service';
import { logger } from '../../utils/helper';
import { NodeData, IntersectingPath, Nodes, Path } from './mainData';

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
  nodes: Nodes = NodeData;
  nodeColor = '#5b9bd2';
  nodeOuterStrokeColor = 'white';
  nodeRadius = '30';
  lineColor = '#d2616185';
  l2N = '#d2616185'; //location icon to node line color
  locationIconColor = '#e82327';
  locationIconBaseColor = '#e3e2e1';
  //animation related
  showTransaction = false;
  broadCastTx = false;
  showBroadCastTxgrp = false;
  selectedValidator: number = 0;
  sendTransactionDuration = 2;
  trasactionCircleRadius = 15;
  broadCastElePath = [
    '.connectingLine.line1',
    '.connectingLine.line6',
    '.connectingLine.line11',
    '.connectingLine.line5',
    '.connectingLine.line4',
  ];
  //observables
  $broadCastCompleted = new Subject();
  $txValidationCompleted = new Subject();

  logger: logger = new logger('[sb-validator-visualizer]');
  constructor(
    private txSerivce: TransactionService,
    private _elRef: ElementRef
  ) {
    gsap.registerPlugin(MotionPathPlugin);
  }

  ngOnInit(): void {
    this.txSerivce.$runValidatorAnimation.subscribe((data) => {
      switch (true) {
        case data.id == 0:
          this.sendTransaction().then(() => {
            this.txSerivce.valiDatorAnimationCompleted(data.id);
          });
          break;
        case data.id == 1:
          this.$broadCastCompleted.pipe(skip(4)).subscribe(() => {
            this.txSerivce.valiDatorAnimationCompleted(data.id);
          });
          this.broadCast();
          break;
        case data.id == 2:
          this.validateTx();
          this.$txValidationCompleted.pipe(skip(5)).subscribe(() => {
            this.txSerivce.valiDatorAnimationCompleted(data.id);
          });
          break;
        case data.id == 3:
          this.selectRandomValidator().then(() => {
            this.txSerivce.valiDatorAnimationCompleted(data.id);
          });
          break;
        case data.id == 4:
          this.executeTx();
          break;
        default:
          this.logger.log(`id ${data.id} is not matching with any animation`);
          this.txSerivce.valiDatorAnimationCompleted(data.id);
      }
    });
  }
  isInsideCircle(x1: number, x2: number, y1: number, y2: number, r: number) {
    let xdif = Math.pow(x1 - x2, 2);
    let ydif = Math.pow(y1 - y2, 2);
    return Math.sqrt(xdif + ydif) <= r;
  }
  correctPath(pathString: string): string {
    let matchedPattern = pathString!
      .replace(' ', '')
      .match(/M(\d+.\d+),(\d+.\d+)L(\d+.\d+),(\d+.\d+)/);
    let x1 = parseFloat(matchedPattern![1]);
    let y1 = parseFloat(matchedPattern![2]);
    let x2 = parseFloat(matchedPattern![3]);
    let y2 = parseFloat(matchedPattern![4]);
    return `M${x2},${y2}L${x1},${y1}`;
  }
  getLinesFromCircle(selector: string): IntersectingPath {
    let paths: Path[] = [];
    let circle: HTMLElement = this._elRef.nativeElement.querySelector(selector);
    let r = parseFloat(circle.getAttribute('r') as string);
    let cx = parseFloat(circle.getAttribute('cx') as string);
    let cy = parseFloat(circle.getAttribute('cy') as string);
    let allPaths: HTMLElement[] = this._elRef.nativeElement.querySelectorAll(
      'path.connectingLine:not(.locationToNode)'
    );
    allPaths.forEach((path) => {
      let pathString = path.getAttribute('d');
      let matchedPattern = pathString!
        .replace(' ', '')
        .match(/M(\d+.\d+),(\d+.\d+)L(\d+.\d+),(\d+.\d+)/);
      let x1 = parseFloat(matchedPattern![1]);
      let y1 = parseFloat(matchedPattern![2]);
      let x2 = parseFloat(matchedPattern![3]);
      let y2 = parseFloat(matchedPattern![4]);
      let isMPointInside = this.isInsideCircle(x1, cx, y1, cy, r);
      let isLPointInside = this.isInsideCircle(x2, cx, y2, cy, r);
      if (isLPointInside || isMPointInside) {
        paths.push({
          path: pathString as string,
          direction: isLPointInside ? 'R' : 'F',
        });
      }
    });
    return {
      paths: paths,
      isAvailable: paths.length > 0,
    };
  }
  sendTransaction(): Promise<void> {
    this.showTransaction = true;
    return new Promise((resolve, reject) => {
      gsap.to('#tNode', {
        duration: this.sendTransactionDuration,
        motionPath: '#wire',
        ease: 'none.none',
        onComplete: () => {
          resolve();
        },
      });
    });
  }
  broadCast() {
    this.broadCastTx = true;
    this.broadCastElePath.forEach((item: string, index) => {
      gsap.to(`#bNode${index}`, {
        duration: this.sendTransactionDuration,
        motionPath: item,
        ease: 'none.none',
        delay: item.includes('4') ? this.sendTransactionDuration : 0,
        onComplete: () => {
          this.$broadCastCompleted.next('done');
        },
      });
    });
  }
  validateTx() {
    let allNodes = this._elRef.nativeElement.querySelectorAll(
      'circle.bnode,circle#tNode'
    );
    allNodes.forEach((node: any) => {
      gsap.to(node, {
        duration: 0.5,
        repeat: 5,
        r: 20,
        onComplete: () => {
          gsap.to(node, {
            r: 15,
            onComplete: () => {
              this.$txValidationCompleted.next('done');
            },
          });
        },
      });
    });
  }
  selectRandomValidator(): Promise<void> {
    return new Promise((resolve, reject) => {
      let nodes = Object.keys(this.nodes);
      let randomNode = Math.floor(Math.random() * nodes.length - 1) + 1;
      this.logger.log(`random validator is ${randomNode}`);
      let timeLine = gsap.timeline({
        paused: true,
        repeat: 5,
        onComplete: () => {
          gsap.to(`circle#node${randomNode}`, {
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 3,
            r: 30,
            onComplete: () => {
              this.selectedValidator = randomNode;
              document
                .querySelector(`circle#node${randomNode}`)
                ?.classList.add('selectedNode');
              resolve();
            },
          });
        },
      });
      nodes.forEach((node) => {
        timeLine.to(`circle#node${node}`, {
          fill: 'green',
          r: 35,
          duration: 0.2,
          onComplete: () => {
            gsap.to(`circle#node${node}`, {
              duration: 0.1,
              fill: '#5b9bd2',
              r: 30,
            });
          },
        });
      });
      timeLine.play();
    });
  }
  executeTx() {
    let node = this._elRef.nativeElement.querySelector('circle.selectedNode');
    gsap.to(node, {
      r: 40,
      yoyo: true,
      duration: 0.5,
      repeat: 8,
      onComplete: () => {
        gsap.set(node, {
          r: 30,
        });
      },
    });
  }
  broadCastExecutedTx() {
    this.showBroadCastTxgrp = true;
    let allTxNodes = this._elRef.nativeElement.querySelectorAll(
      'g.broadCastTxGrp circle'
    );
    allTxNodes.forEach((node: HTMLElement, index: number) => {
      let pathString =
        this.nodes[this.selectedValidator].originatingLines?.paths[index].path;
      let direction =
        this.nodes[this.selectedValidator].originatingLines?.paths[index]
          .direction;
      let delay =
        !!this.nodes[this.selectedValidator].originatingLines?.paths[index]
          .delay;
      gsap.to(node, {
        motionPath: () => {
          if (direction == 'R') {
            return this.correctPath(pathString as string);
          }
          return pathString as string;
        },
        delay: delay ? 1 : 0,
        duration: 1,
      });
    });
  }
}
