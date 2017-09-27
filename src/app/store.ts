import { Action } from 'redux';
import {
  DecrementActionDef,
  FetchUsersSuccessActionDef,
  IncrementActionDef,
  UsersAction,
} from './app.actions';
import { Injectable } from '@angular/core';
import { LoadUsersEpic } from './load-users-epic';

export interface IAppState {
  count: number;
  users: any[];
}

export const INITIAL_STATE: IAppState = {
  count: 0,
  users: []
};

@Injectable()
export class RootReducer {
  constructor(private readonly loadUsersEpic: LoadUsersEpic) {}

  readonly body = (lastState: IAppState, action: Action) => {
    switch (action.type) {
      case IncrementActionDef.TYPE:
        return {...lastState, count: lastState.count + 1};
      case DecrementActionDef.TYPE:
        return {...lastState, count: lastState.count - 1};
      case this.loadUsersEpic.type:
        return this.loadUsersEpic.reduce(lastState, action);
      default:
        return lastState
    }
  }

}
