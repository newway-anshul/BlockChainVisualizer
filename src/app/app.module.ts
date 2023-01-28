import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockChainComponent } from './components/block-chain/block-chain.component';
import { SingleBlockComponent } from './components/block-chain/single-block/single-block.component';
import { HeaderComponentComponent } from './components/header-component/header-component.component';
import { ValidatorVisualizerComponent } from './components/validator-visualizer/validator-visualizer.component';
import { StepsVisulizerComponent } from './components/steps-visulizer/steps-visulizer.component';
import { SendTrasactionComponent } from './components/send-trasaction/send-trasaction.component';
import { FooterComponent } from './components/footer/footer.component';
import { AnimateLineDirective } from './directives/animateLine/animate-line.directive';
import { TypingAnimationDirective } from './directives/autoTyping/auto-typing.directive';
import { StepComponent } from './components/steps-visulizer/step/step.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockChainComponent,
    SingleBlockComponent,
    HeaderComponentComponent,
    ValidatorVisualizerComponent,
    StepsVisulizerComponent,
    SendTrasactionComponent,
    FooterComponent,
    AnimateLineDirective,
    TypingAnimationDirective,
    StepComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
