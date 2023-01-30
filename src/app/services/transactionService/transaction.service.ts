import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { logger } from '../../utils/helper';
export enum txState {
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
  $animationCompleted: Subject<boolean> = new Subject();
  currentAnimationID: number;
  private animationState: Map<number, AnimationState> = new Map();
  logger: logger = new logger('[TransactionService]');
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
  setAnimationState(id: number) {
    if (!this.animationState.has(id)) {
      this.animationState.set(id, {
        LINEANIMATION: false,
        CIRCLEANIMATION: false,
        VALIDATORANIMATION: false,
        TEXTANIMATION: false,
      });
    } else {
      alert(`animaiton for id ${id} is already available`);
      return;
    }
    this.currentAnimationID = id;
    this.logger.log([...this.animationState.entries()]);
  }
  textAnimationCompleted(id: number) {
    if (!this.animationState.has(id)) {
      this.animationState.set(id, {
        LINEANIMATION: true,
        CIRCLEANIMATION: true,
        TEXTANIMATION: true,
      });
    } else {
      this.animationState.set(
        id,
        Object.assign(this.animationState.get(id) as AnimationState, {
          LINEANIMATION: true,
          CIRCLEANIMATION: true,
          TEXTANIMATION: true,
        })
      );
    }
    this.checkAnimationStatusnEmit(id);
  }
  valiDatorAnimationCompleted(id: number) {
    if (!this.animationState.has(id)) {
      this.animationState.set(id, {
        VALIDATORANIMATION: true,
      });
    } else {
      this.animationState.set(
        id,
        Object.assign(this.animationState.get(id) as AnimationState, {
          VALIDATORANIMATION: true,
        })
      );
    }
    this.checkAnimationStatusnEmit(id);
  }
  runValidatorAnimation(id: number, delay: number = 0) {
    this.$runValidatorAnimation.next({
      id: id,
      delay: delay,
    });
  }
  checkAnimationStatusnEmit(id: number) {
    let state: AnimationState | undefined = this.animationState.get(id);
    if (state == undefined) {
      alert(`no animation for id ${id} is available`);
      return;
    }
    if (
      state.CIRCLEANIMATION &&
      state.LINEANIMATION &&
      state.TEXTANIMATION &&
      state.VALIDATORANIMATION
    ) {
      this.logger.log(`animation for id ${id} completed`);
      this.$animationCompleted.next(true);
    }
  }
  completeTxCompleted() {
    this.$isTxCompleted.next(true);
  }
}
