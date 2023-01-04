import { Component, OnInit } from '@angular/core';
import { Account } from '../blockChain/address';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SampleBlockChain';
  constructor() {}
  ngOnInit(): void {}
}
