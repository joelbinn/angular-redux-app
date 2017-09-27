import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { Action } from 'redux';

@Injectable()
export class CounterActions {
  readonly StateSliceName = 'count';

  readonly stateSlice = this.redux.select<number>('count');

  constructor(private readonly redux: NgRedux<IAppState>) {
  }

  increment(): void {
    this.redux.dispatch(IncrementActionDef.create());
  }

  decrement(): void {
    this.redux.dispatch(DecrementActionDef.create());
  }

  readonly reducer = (lastState: number = 0, action: Action) => {
    switch (action.type) {
      case IncrementActionDef.TYPE:
        return lastState + 1;
      case DecrementActionDef.TYPE:
        return lastState - 1;
      default:
        return lastState
    }
  }
}

export abstract class IncrementActionDef {
  static readonly TYPE = 'INCREMENT';
  static create(): Action {
    return {
      type: IncrementActionDef.TYPE
    };
  }
}

export abstract class DecrementActionDef {
  static readonly TYPE = 'DECREMENT';

  static create(): Action {
    return {
      type: DecrementActionDef.TYPE
    };
  }
}
