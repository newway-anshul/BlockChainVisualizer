import { Directive, AfterViewInit, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
@Directive({
  selector: '[sbAnimateLine]',
})
export class AnimateLineDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}
  ngAfterViewInit(): void {
    gsap.to(this.el.nativeElement, {
      height: '100px',
      duration: 1,
    });
  }
}
