import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
enum txState {
  WAITING = 'w',
  SENT = 's',
  IN_PROGRESS = 'ip',
  COMPLETED = 'c',
}
export enum animationType {
  LINEANIMATION = 'LINEANIMATION',
  CIRCLEANIMATION = 'CIRCLEANIMATION',
  TEXTANIMATION = 'TEXTANIMATION',
  VALIDATORANIMATION = 'VALIDATORANIMATION',
}
type k = typeof animationType[keyof typeof animationType];
interface ValidatorAnimation {
  id: number;
  delay: number;
}
type AnimationState = {
  [key in k]?: boolean;
};
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  $startTx: Subject<boolean> = new Subject();
  $isTxCompleted: Subject<boolean> = new Subject();
  $txState: BehaviorSubject<string> = new BehaviorSubject<string>(
    txState.WAITING
  );
  $runValidatorAnimation: Subject<ValidatorAnimation> = new Subject();
  $animationStatus: Subject<AnimationState[]> = new Subject();
  private animationState: Map<number, AnimationState> = new Map();
  constructor() {}
  startTx(): void {
    this.$startTx.next(true);
    this.$txState.next(txState.SENT);
    this.$txState.next(txState.IN_PROGRESS);
  }
  txCompleted() {
    this.$txState.next(txState.COMPLETED);
    this.$txState.next(txState.WAITING);
  }
  setAnimation(id: number, animationName: AnimationState) {
    if (this.animationState.has(id)) {
      this.animationState.set(
        id,
        Object.assign(this.animationState.get(id) as AnimationState, {
          animationName,
        })
      );
    } else {
      this.animationState.set(id, animationName);
    }
  }
  runValidatorAnimation(id: number, delay: number = 0) {
    this.setAnimation(id, {
      VALIDATORANIMATION: false,
    });
    this.$runValidatorAnimation.next({
      id: id,
      delay: delay,
    });
  }
}
