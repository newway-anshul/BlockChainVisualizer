import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockChainComponent } from './block-chain/block-chain.component';
import { SingleBlockComponent } from './block-chain/single-block/single-block.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { ValidatorVisualizerComponent } from './validator-visualizer/validator-visualizer.component';
import { StepsVisulizerComponent } from './steps-visulizer/steps-visulizer.component';
import { SendTrasactionComponent } from './send-trasaction/send-trasaction.component';

@NgModule({
  declarations: [AppComponent, BlockChainComponent, SingleBlockComponent, HeaderComponentComponent, ValidatorVisualizerComponent, StepsVisulizerComponent, SendTrasactionComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
