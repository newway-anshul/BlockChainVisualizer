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
  @Input('stepText') stepText: string = '';
  @Input('showLine') showLine: boolean = false;
  @Input() set startAnimation(value: boolean) {
    if (value) {
      this.start();
    }
  }
  @Output('animationCompleted') animationCompleted = new EventEmitter<void>();
  @ViewChild('line') line: ElementRef;
  @ViewChild('circle') circle: ElementRef;
  startTyping: boolean = false;
  gsapTimeLine: GSAPTimeline;
  logger: logger = new logger('[sb-step]');
  constructor(private _ngZone: NgZone) {}

  ngOnInit(): void {
    this.gsapTimeLine = gsap.timeline();
  }
  start() {
    if (this.showLine) {
      this.gsapTimeLine.to(this.line.nativeElement, {
        duration: 0.5,
        height: '100px',
      });
    }
    this.gsapTimeLine.to(this.circle.nativeElement, {
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
