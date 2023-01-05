import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-block-chain',
  templateUrl: './block-chain.component.html',
  styleUrls: ['./block-chain.component.scss'],
})
export class BlockChainComponent implements OnInit {
  heading = 'Running Block Chain';
  blockChain = Array.from({ length: 14 }, () => Math.floor(Math.random() * 9));
  constructor() {}

  ngOnInit(): void {}
}
