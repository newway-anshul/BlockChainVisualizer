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
import { logger } from 'src/app/utils/helper';
@Component({
  selector: 'sb-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent implements OnInit {
  @Input('index') index: number;
  @Input('stepText') stepText: string = '';
  @Input('showLine') set showLine(value: boolean) {
    if (value) {
      this.gsapTimeLine.to(this.step.nativeElement.querySelector('div.line'), {
        duration: 0.5,
        height: '100px',
      });
    }
  }
  @Input('startAnimation') set startAnimation(value: boolean) {
    if (value) {
      this.start();
    }
  }
  @Output('animationCompleted') animationCompleted = new EventEmitter<void>();
  @ViewChild('step') step: ElementRef;
  startTyping: boolean = false;
  gsapTimeLine: GSAPTimeline;
  logger: logger = new logger('[sb-step]');
  constructor(private _ngZone: NgZone) {}

  ngOnInit(): void {
    this.gsapTimeLine = gsap.timeline();
  }
  start() {
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
        });
      },
    });
  }
  onTypingAnimationComplete() {
    this.logger.log('Typing animation completed');
    this.animationCompleted.emit();
  }
}
