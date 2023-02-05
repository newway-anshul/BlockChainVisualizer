import {
  Component,
  Input,
  OnInit,
  NgZone,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { gsap, Power1 } from 'gsap';
import { TransactionService } from 'src/app/services/transactionService/transaction.service';
import { logger } from 'src/app/utils/helper';
@Component({
  selector: 'sb-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent implements OnInit {
  @Input('msgIndex') msgIndex: number;
  @Input('stepText') stepText: string = '';
  @Input('showLine') showLine: boolean;
  @Input('startAnimation') set startAnimation(value: boolean) {
    if (value) {
      this.showCircle();
    }
  }
  @Output('animationCompleted') animationCompleted = new EventEmitter<void>();
  @Output('typingStarted') typingStarted = new EventEmitter<void>();
  @ViewChild('step') step: ElementRef;
  startTyping: boolean = false;
  gsapTimeLine: GSAPTimeline;
  logger: logger = new logger('[sb-step]');
  showReplay = false;
  constructor(
    private _ngZone: NgZone,
    private _txService: TransactionService
  ) {}

  ngOnInit(): void {
    this.gsapTimeLine = gsap.timeline();
  }
  showCircle() {
    this.gsapTimeLine.to(this.step.nativeElement, {
      display: 'flex',
      duration: 0,
    });
    this.gsapTimeLine.to(this.step.nativeElement.querySelector('div.circle'), {
      display: 'block',
      clipPath: 'circle(40%)',
      duration: 0.5,
      ease: Power1.easeOut,
      onComplete: () => {
        this._ngZone.run(() => {
          this.startTyping = true;
          this._txService.runValidatorAnimation(this.msgIndex, 0);
        });
      },
    });
  }
  onTypingAnimationComplete() {
    this.logger.log('Typing animation completed');
    this.showReplay = true;
    if (!this.showLine) {
      this._txService.textAnimationCompleted(this.msgIndex);
      return;
    }
    this.gsapTimeLine.to(this.step.nativeElement.querySelector('div.line'), {
      duration: 0.5,
      height: '50px',
      onComplete: () => {
        this._ngZone.run(() => {
          this.logger.log(`animation for id ${this.msgIndex} completed`);
          this._txService.textAnimationCompleted(this.msgIndex);
        });
      },
    });
  }
  replayValidatorNodeAnimation() {
    this._txService.runValidatorAnimation(this.msgIndex);
  }
}
