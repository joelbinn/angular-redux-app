import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { Action } from 'redux';

@Injectable()
export class CounterActions {
  constructor(private readonly redux: NgRedux<IAppState>) {
  }

  increment(): void {
    this.redux.dispatch(IncrementActionDef.create());
  }

  decrement(): void {
    this.redux.dispatch(DecrementActionDef.create());
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
