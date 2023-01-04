import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sb-single-block',
  templateUrl: './single-block.component.html',
  styleUrls: ['./single-block.component.scss'],
})
export class SingleBlockComponent implements OnInit {
  @Input('blockNumer') blockNumber: number;
  @Input('showChainIcon') showChainIcon: boolean = false;
  blockText: string = 'Block#';
  constructor() {}

  ngOnInit(): void {}
}
