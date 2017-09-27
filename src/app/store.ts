import { Action } from 'redux';
import {
  DecrementActionDef,
  IncrementActionDef
} from './app.actions';
import { Injectable } from '@angular/core';
import { UserData } from './load-users-epic';

export interface IAppState {
  count: number;
  users: UserData;
}

export const INITIAL_STATE: IAppState = {
  count: 0,
  users: {
    data: []
  }
};

@Injectable()
export class CountReducer {
  readonly body = (lastState: number = 0, action: Action) => {
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
